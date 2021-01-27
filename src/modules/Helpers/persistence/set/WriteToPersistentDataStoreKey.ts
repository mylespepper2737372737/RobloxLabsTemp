import filestream from 'fs';
import { _dirname } from '../../../constants/directories';
export = (
	universe: number,
	storeName: string,
	scopeName: string,
	keyName: string,
	value: unknown,
	isSorted: boolean = false,
): Promise<boolean> => {
	return new Promise<boolean>((resumefunction) => {
		const path = _dirname + '\\manifest\\persistence\\' + universe;
		const time = new Date(Date.now()).toISOString();
		if (scopeName.length === 0) scopeName = '_';
		if (!filestream.existsSync(path)) return resumefunction(false);
		if (isSorted) storeName = 'sorted_' + storeName;
		if (isSorted && !parseInt(value.toString())) {
			return resumefunction(false);
		}
		const storePath = path + '\\stores\\' + storeName;
		const scopePath = storePath + '\\scopes\\' + scopeName;
		const keyPath = scopePath + (isSorted ? '\\entries\\' : '\\keys\\') + keyName;

		if (!filestream.existsSync(storePath)) {
			return resumefunction(false);
		}
		if (!filestream.existsSync(scopePath)) {
			return resumefunction(false);
		}
		if (filestream.existsSync(keyPath)) {
			const key = <Record<string, unknown>>(
				JSON.parse(filestream.readFileSync(keyPath + (isSorted ? '\\ENTRY' : '\\KEY') + '.json', 'utf-8'))
			);
			const keyversions = <unknown[]>(
				JSON.parse(filestream.readFileSync(keyPath + (isSorted ? '\\ENTRY' : '\\KEY') + 'VERSIONS.json', 'utf-8'))
			);

			const read = filestream.readFileSync(keyPath + '\\VALUE.json', 'utf-8');

			const record = <{ value: unknown; type: string }>JSON.parse(read);
			if (value === record['value']) return resumefunction(true);
			record['value'] = value;
			record['type'] = typeof value;
			filestream.writeFileSync(keyPath + '\\VALUE.json', JSON.stringify(record, undefined, 4), {
				encoding: 'utf-8',
			});
			const read1 = filestream.readFileSync(scopePath + '\\SCOPE.json', 'utf-8');
			const record1 = <Record<string, unknown>>JSON.parse(read1);
			record1['lastUpdated'] = time;
			filestream.writeFileSync(scopePath + '\\SCOPE.json', JSON.stringify(record1, undefined, 4), {
				encoding: 'utf-8',
			});
			const read2 = filestream.readFileSync(scopePath + (isSorted ? '\\entries\\' : '\\keys\\') + 'RECORD.json', 'utf-8');
			const record2 = <unknown[]>JSON.parse(read2);
			record2.push({
				keyName: keyName,
				created: key['created'],
				updated: time,
				purged: null,
			});
			filestream.writeFileSync(
				scopePath + (isSorted ? '\\entries\\' : '\\keys\\') + 'RECORD.json',
				JSON.stringify(record2, undefined, 4),
				{
					encoding: 'utf-8',
				},
			);
			key['lastUpdated'] = time;
			(<number>key['version'])++;
			keyversions.push({
				version: key['version'],
				date: time,
			});
			filestream.writeFileSync(keyPath + (isSorted ? '\\ENTRY' : '\\KEY') + '.json', JSON.stringify(key, undefined, 4), {
				encoding: 'utf-8',
			});
			filestream.writeFileSync(
				keyPath + (isSorted ? '\\ENTRY' : '\\KEY') + 'VERSIONS.json',
				JSON.stringify(keyversions, undefined, 4),
				{
					encoding: 'utf-8',
				},
			);
			const read3 = filestream.readFileSync(scopePath + '\\RECORD.json', 'utf-8');
			const record3 = <unknown[]>JSON.parse(read3);
			record3.push({
				action: 'KeyUpdated',
				data: [
					{
						name: keyName,
						created: true,
						purged: false,
						value: {
							Raw: value,
							type: typeof value,
						},
					},
				],
				date: time,
			});
			filestream.writeFileSync(scopePath + '\\RECORD.json', JSON.stringify(record3, undefined, 4), {
				encoding: 'utf-8',
			});
			return resumefunction(true);
		}
		const info = {
			keyName: keyName,
			scope: scopeName,
			store: storeName,
			universe: 1,
			userIds: 0,
			version: 1,
			created: time,
			lastUpdated: time,
		};
		const keyversions = [
			{
				version: 1,
				date: time,
			},
		];
		// we don't need to check if it's sorted, it functions the same as a standard store, this is really here for better readability
		filestream.mkdirSync(keyPath);
		filestream.writeFileSync(keyPath + (isSorted ? '\\ENTRY' : '\\KEY') + '.json', JSON.stringify(info, undefined, 4), {
			encoding: 'utf-8',
		});
		filestream.writeFileSync(keyPath + (isSorted ? '\\ENTRY' : '\\KEY') + 'VERSIONS.json', JSON.stringify(keyversions, undefined, 4), {
			encoding: 'utf-8',
		});
		filestream.mkdirSync(keyPath + '\\userids');
		filestream.writeFileSync(keyPath + '\\RECORD.json', '[]', { encoding: 'utf-8' });
		filestream.writeFileSync(
			keyPath + '\\VALUE.json',
			JSON.stringify(
				{
					value: value,
					type: typeof value,
				},
				undefined,
				4,
			),
			{ encoding: 'utf-8' },
		);
		const read = filestream.readFileSync(scopePath + (isSorted ? '\\entries\\RECORD.json' : '\\keys\\RECORD.json'), 'utf-8');
		const record = <unknown[]>JSON.parse(read);
		record.push({
			keyName: keyName,
			created: time,
			updated: null,
			purged: null,
		});
		filestream.writeFileSync(
			scopePath + (isSorted ? '\\entries\\RECORD.json' : '\\keys\\RECORD.json'),
			JSON.stringify(record, undefined, 4),
			{
				encoding: 'utf-8',
			},
		);
		const read1 = filestream.readFileSync(scopePath + '\\SCOPE.json', 'utf-8');
		const record1 = <Record<string, unknown>>JSON.parse(read1);
		(<number>record1['keys'])++;
		record1['lastUpdated'] = time;
		filestream.writeFileSync(scopePath + '\\SCOPE.json', JSON.stringify(record1, undefined, 4), {
			encoding: 'utf-8',
		});
		const read2 = filestream.readFileSync(scopePath + '\\RECORD.json', 'utf-8');
		const record2 = <unknown[]>JSON.parse(read2);
		record2.push({
			action: 'KeyAdded',
			data: [
				{
					name: keyName,
					created: true,
					purged: false,
					value: {
						Raw: value,
						type: typeof value,
					},
				},
			],
			date: time,
		});
		filestream.writeFileSync(scopePath + '\\RECORD.json', JSON.stringify(record2, undefined, 4), {
			encoding: 'utf-8',
		});
		return resumefunction(true);
	});
};
