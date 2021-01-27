import filestream from 'fs';
import { _dirname } from '../../../constants/directories';
export = (universe: number, storeName: string, scopeName: string, isSorted: boolean = false): Promise<boolean> => {
	return new Promise<boolean>((resumefunction) => {
		const path = _dirname + '\\manifest\\persistence\\' + universe;
		let time = new Date(Date.now()).toISOString();
		if (scopeName.length === 0) scopeName = '_';
		if (!filestream.existsSync(path)) return resumefunction(false);
		if (isSorted) storeName = 'sorted_' + storeName;
		const storePath = path + '\\stores\\' + storeName;
		let storeExists = false;
		const scopePath = storePath + '\\scopes\\' + scopeName;
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
				storeName: storeName,
				type: isSorted ? 'Sorted' : 'Standard',
				universe: universe,
				scopes: 0,
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
						name: storeName,
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
				storeName: storeName,
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
			scopeName: scopeName,
			store: storeName,
			universe: universe,
			keys: 0,
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
					name: scopeName,
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
			scopeName: scopeName,
			created: time,
			purged: null,
		});
		filestream.writeFileSync(storePath + '\\scopes\\RECORD.json', JSON.stringify(record2, undefined, 4), {
			encoding: 'utf-8',
		});
		return resumefunction(true);
	});
};
