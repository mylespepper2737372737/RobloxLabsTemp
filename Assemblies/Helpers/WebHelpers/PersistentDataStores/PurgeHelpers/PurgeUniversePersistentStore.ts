import { _dirname } from '../../../Constants/Directories';
import { WriteUniverse } from '../SetHelpers/PushUniverseToDB';
import { GetPersistentStoreForUniverse } from '../GetHelpers/GetPersistentStoreForUniverse';
import filestream from 'fs';

export const PurgeUniversePersistentStore = (universeId: number, storeName: string, isSorted: boolean = false): Promise<boolean> => {
	return new Promise<boolean>(async (resumefunction) => {
		const dir = _dirname + '\\DataBase\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			WriteUniverse(universeId);
			return resumefunction(false);
		}
		const [success, store] = await GetPersistentStoreForUniverse(universeId, storeName.replace('sorted_', ''), undefined, isSorted);
		const root = store.root;
		const created = store.created;
		if (root === null && success) {
			return resumefunction(false);
		} else if (success === false && root === null) {
			return resumefunction(false);
		}
		filestream.rmdirSync(root, { recursive: true });
		const record = <unknown[]>JSON.parse(filestream.readFileSync(dir + '\\RECORD.json', { encoding: 'utf-8' }));
		record.push({
			action: 'StoreRemoved',
			data: [
				{
					name: storeName,
					created: false,
					purged: true,
				},
			],
			date: new Date(Date.now()).toISOString(),
		});
		filestream.writeFileSync(dir + '\\RECORD.json', JSON.stringify(record, undefined, 4));
		const record2 = <unknown[]>JSON.parse(filestream.readFileSync(dir + '\\stores\\RECORD.json', { encoding: 'utf-8' }));
		record2.push({
			storeName: storeName,
			created: created,
			purged: new Date(Date.now()).toISOString(),
		});
		filestream.writeFileSync(dir + '\\stores\\RECORD.json', JSON.stringify(record2, undefined, 4));
		const record3 = <Record<string, unknown>>JSON.parse(filestream.readFileSync(dir + '\\UNIVERSE.json', { encoding: 'utf-8' }));
		(<number>record3['stores'])--;
		filestream.writeFileSync(dir + '\\UNIVERSE.json', JSON.stringify(record3, undefined, 4));
		return resumefunction(true);
	});
};
