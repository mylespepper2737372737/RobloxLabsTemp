import { _dirname } from '../../../Constants/Directories';
import { WriteUniverse } from '../SetHelpers/PushUniverseToDB';
import { GetPersistentStoreForUniverse } from '../GetHelpers/GetPersistentStoreForUniverse';
import filestream from 'fs';

export const PurgeScopeFromPersistentStore = (
	universeId: number,
	storeName: string,
	scopeName: string,
	isSorted: boolean = false,
): Promise<boolean> => {
	return new Promise<boolean>(async (resumefunction) => {
		const dir = _dirname + '\\DataBase\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			WriteUniverse(universeId);
			return resumefunction(false);
		}
		const [success, store] = await GetPersistentStoreForUniverse(universeId, storeName.replace('sorted_', ''), scopeName, isSorted);
		let root = null;
		const storeroot = store.root;
		let created = '';
		if (success && store !== null) {
			store.scopes.forEach((s) => {
				if (s.scopeName === scopeName) {
					root = s.root;
					created = s.created;
				}
			});
		}
		if (root === null && success) {
			return resumefunction(false);
		} else if (success === false && root === null) {
			return resumefunction(false);
		}
		filestream.rmdirSync(root, { recursive: true });
		const record = <unknown[]>JSON.parse(filestream.readFileSync(storeroot + '\\RECORD.json', { encoding: 'utf-8' }));
		record.push({
			action: 'ScopeRemoved',
			data: [
				{
					name: scopeName,
					created: false,
					purged: true,
				},
			],
			date: new Date(Date.now()).toISOString(),
		});
		filestream.writeFileSync(storeroot + '\\RECORD.json', JSON.stringify(record, undefined, 4));
		const record2 = <unknown[]>JSON.parse(filestream.readFileSync(storeroot + '\\scopes\\RECORD.json', { encoding: 'utf-8' }));
		record2.push({
			scopeName: scopeName,
			created: created,
			purged: new Date(Date.now()).toISOString(),
		});
		filestream.writeFileSync(storeroot + '\\scopes\\RECORD.json', JSON.stringify(record2, undefined, 4));
		const record3 = <Record<string, unknown>>JSON.parse(filestream.readFileSync(storeroot + '\\STORE.json', { encoding: 'utf-8' }));
		(<number>record3['scopes'])--;
		filestream.writeFileSync(storeroot + '\\STORE.json', JSON.stringify(record3, undefined, 4));
		return resumefunction(true);
	});
};
