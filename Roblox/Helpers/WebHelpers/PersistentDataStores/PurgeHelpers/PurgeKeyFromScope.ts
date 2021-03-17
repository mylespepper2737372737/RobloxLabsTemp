import { _dirname } from '../../../Constants/Directories';
import { WriteUniverse } from '../SetHelpers/PushUniverseToDB';
import { GetScopeForPersistentStore } from '../GetHelpers/GetScopeForPersistentStore';
import filestream from 'fs';

export const PurgeKeyFromScope = (
	universeId: number,
	storeName: string,
	scopeName: string,
	keyName: string,
	isSorted: boolean = false,
): Promise<boolean> => {
	return new Promise<boolean>(async (resumefunction) => {
		const dir = _dirname + '\\DataBase\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			WriteUniverse(universeId);
			return resumefunction(false);
		}
		const [success, scope] = await GetScopeForPersistentStore(universeId, storeName.replace('sorted_', ''), scopeName, isSorted);
		let root = null;
		const scoperoot = scope.root;
		let created = '';
		if (success && scope !== null) {
			scope.keys.forEach((k) => {
				if (k.keyName === keyName) {
					root = k.root;
					created = k.created;
				}
			});
		}
		if (root === null && success) {
			return resumefunction(false);
		} else if (success === false && root === null) {
			return resumefunction(false);
		}
		filestream.rmdirSync(root, { recursive: true });
		const record = <unknown[]>JSON.parse(filestream.readFileSync(scoperoot + 'RECORD.json', { encoding: 'utf-8' }));
		record.push({
			action: 'KeyRemoved',
			data: [
				{
					name: keyName,
					created: false,
					purged: true,
					value: null,
				},
			],
			date: new Date(Date.now()).toISOString(),
		});
		filestream.writeFileSync(scoperoot + 'RECORD.json', JSON.stringify(record, undefined, 4));
		const record2 = <unknown[]>(
			JSON.parse(filestream.readFileSync(scoperoot + (isSorted ? 'entries\\' : 'keys\\') + 'RECORD.json', { encoding: 'utf-8' }))
		);
		record2.push({
			keyName: keyName,
			created: created,
			updated: new Date(Date.now()).toISOString(),
			purged: new Date(Date.now()).toISOString(),
		});
		filestream.writeFileSync(scoperoot + (isSorted ? 'entries\\' : 'keys\\') + 'RECORD.json', JSON.stringify(record2, undefined, 4));
		const record3 = <Record<string, unknown>>JSON.parse(filestream.readFileSync(scoperoot + 'SCOPE.json', { encoding: 'utf-8' }));
		(<number>record3['keys'])--;
		filestream.writeFileSync(scoperoot + 'SCOPE.json', JSON.stringify(record3, undefined, 4));
		return resumefunction(true);
	});
};
