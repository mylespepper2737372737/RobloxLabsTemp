import filestream from 'fs';
import { _dirname } from '../../../Constants/Directories';

/**
 * Push a store,
 * and push to a scope,
 * if the store exists,
 * then it checks if the scope exists,
 * if the scope exists it returns true.
 * @param universeId The UniverseId to push the store to.
 * @param name The name of the Store to push.
 * @param scope The name of the scope to push.
 * @param isSorted Is the store you're trying to push a SortedDataStore.
 * @yields Yields until operation is complete.
 * @returns Promise<boolean>
 */
export const PushPersistentStoreToUniverse = (
	universeId: number,
	name: string,
	scope: string = 'global',
	isSorted: boolean = false,
): Promise<boolean> => {
	return new Promise<boolean>((resumefunction) => {
		const path = _dirname + '\\DataBase\\persistence\\' + universeId;
		let time = new Date(Date.now()).toISOString();
		if (scope.length === 0) scope = '_';
		if (!filestream.existsSync(path)) return resumefunction(false);
		if (isSorted) name = 'sorted_' + name;
		const storePath = path + '\\stores\\' + name;
		let storeExists = false;
		const scopePath = storePath + '\\scopes\\' + scope;
		if (filestream.existsSync(storePath)) {
			storeExists = true;
			if (filestream.existsSync(scopePath)) {
				return resumefunction(true);
			}
		}
		if (!storeExists) {
			filestream.mkdirSync(storePath);
			filestream.writeFileSync(storePath + '\\RECORD.json', '[]', { encoding: 'utf-8' });
			const info = {
				storeName: name,
				type: isSorted ? 'Sorted' : 'Standard',
				universe: universeId,
				scopes: 0,
				root: storePath + '\\',
				created: time,
				lastUpdated: time,
			};
			filestream.writeFileSync(storePath + '\\STORE.json', JSON.stringify(info, undefined, 4), { encoding: 'utf-8' });
			filestream.mkdirSync(storePath + '\\scopes');
			filestream.writeFileSync(storePath + '\\scopes\\RECORD.json', '[]', { encoding: 'utf-8' });
			const read = filestream.readFileSync(path + '\\RECORD.json', 'utf-8');
			const record = <unknown[]>JSON.parse(read);
			record.push({
				action: 'StoreAdded',
				data: [
					{
						name: name,
						created: true,
						purged: false,
					},
				],
				date: time,
			});
			filestream.writeFileSync(path + '\\RECORD.json', JSON.stringify(record, undefined, 4), {
				encoding: 'utf-8',
			});
			const read1 = filestream.readFileSync(path + '\\stores\\RECORD.json', 'utf-8');
			const record1 = <unknown[]>JSON.parse(read1);
			record1.push({
				storeName: name,
				created: time,
				purged: null,
			});
			filestream.writeFileSync(path + '\\stores\\RECORD.json', JSON.stringify(record1, undefined, 4), {
				encoding: 'utf-8',
			});
			const read2 = filestream.readFileSync(path + '\\UNIVERSE.json', 'utf-8');
			const record2 = <Record<string, unknown>>JSON.parse(read2);
			(<number>record2['stores'])++;
			record2['lastUpdated'] = time;
			filestream.writeFileSync(path + '\\UNIVERSE.json', JSON.stringify(record2, undefined, 4), {
				encoding: 'utf-8',
			});
		}
		const info = {
			scopeName: scope,
			store: name,
			universe: universeId,
			keys: 0,
			root: scopePath + '\\',
			created: time,
			lastUpdated: time,
		};
		time = new Date(Date.now()).toISOString();
		// we don't need to check if it's sorted, it functions the same as a standard store, this is really here for better readability
		filestream.mkdirSync(scopePath);
		filestream.writeFileSync(scopePath + '\\SCOPE.json', JSON.stringify(info, undefined, 4), { encoding: 'utf-8' });
		filestream.mkdirSync(scopePath + (isSorted ? '\\entries' : '\\keys'));
		filestream.writeFileSync(scopePath + '\\RECORD.json', '[]', { encoding: 'utf-8' });
		filestream.writeFileSync(scopePath + (isSorted ? '\\entries\\RECORD.json' : '\\keys\\RECORD.json'), '[]', { encoding: 'utf-8' });
		const read = filestream.readFileSync(storePath + '\\RECORD.json', 'utf-8');
		const record = <unknown[]>JSON.parse(read);
		record.push({
			action: 'ScopeAdded',
			data: [
				{
					name: scope,
					created: true,
					purged: false,
				},
			],
			date: time,
		});
		filestream.writeFileSync(storePath + '\\RECORD.json', JSON.stringify(record, undefined, 4), {
			encoding: 'utf-8',
		});
		const read1 = filestream.readFileSync(storePath + '\\STORE.json', 'utf-8');
		const record1 = <Record<string, unknown>>JSON.parse(read1);
		(<number>record1['scopes'])++;
		record1['lastUpdated'] = time;
		filestream.writeFileSync(storePath + '\\STORE.json', JSON.stringify(record1, undefined, 4), {
			encoding: 'utf-8',
		});
		const read2 = filestream.readFileSync(storePath + '\\scopes\\RECORD.json', 'utf-8');
		const record2 = <unknown[]>JSON.parse(read2);
		record2.push({
			scopeName: scope,
			created: time,
			purged: null,
		});
		filestream.writeFileSync(storePath + '\\scopes\\RECORD.json', JSON.stringify(record2, undefined, 4), {
			encoding: 'utf-8',
		});
		return resumefunction(true);
	});
};
