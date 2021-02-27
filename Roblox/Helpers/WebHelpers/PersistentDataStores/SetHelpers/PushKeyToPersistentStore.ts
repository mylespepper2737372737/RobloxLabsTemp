import filestream from 'fs';
import { _dirname } from '../../../Constants/Directories';
import { WriteUniverse } from './PushUniverseToDB';
import { PushPersistentStoreToUniverse } from './PushPersistentStoreToUniverse';
import Base64 from 'crypto-js/enc-base64';
import crpto from 'crypto-js';

/**
 * Push to or push a Key to the given PersistentDataStore name.
 * @param universeId The universeId where your Store is.
 * @param name The name of the DataStore.
 * @param scope The name of the DataStore's scope.
 * @param key The name of the key.
 * @param value The value to write to that key.
 * @param isSorted Is the store you're trying to push to a SortedDataStore.
 * @yields Yields until operation is complete.
 * @returns Promise<boolean>
 */
export const PushKeyToPersistentStore = (
	universeId: number,
	name: string,
	scope: string = 'global',
	key: string = '',
	value: unknown = undefined,
	isSorted: boolean = false,
	userIds = [],
	attributes = [],
): Promise<boolean> => {
	return new Promise<boolean>(async (resumefunction) => {
		const path = _dirname + '\\Manifest\\persistence\\' + universeId;
		const time = new Date(Date.now()).toISOString();
		if (scope.length === 0) scope = '_';
		if (!filestream.existsSync(path)) await WriteUniverse(universeId);
		if (isSorted) name = 'sorted_' + name;
		if (isSorted && !parseInt(value.toString())) {
			return resumefunction(false);
		}
		if (isSorted) value = parseInt(value.toString());
		const storePath = path + '\\stores\\' + name;
		const scopePath = storePath + '\\scopes\\' + scope;
		const keyPath = scopePath + (isSorted ? '\\entries\\' : '\\keys\\') + key;

		if (!filestream.existsSync(storePath)) {
			await PushPersistentStoreToUniverse(universeId, name.replace('sorted_', ''), scope, isSorted);
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
			record['md5'] = Base64.stringify(crpto.MD5(value.toString()));
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
				keyName: key,
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
						name: key,
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
			keyName: key,
			scope: scope,
			store: name,
			universe: 1,
			userIds: userIds,
			attributes: attributes,
			root: keyPath + '\\',
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
					md5: Base64.stringify(crpto.MD5(value.toString())),
				},
				undefined,
				4,
			),
			{ encoding: 'utf-8' },
		);
		const read = filestream.readFileSync(scopePath + (isSorted ? '\\entries\\RECORD.json' : '\\keys\\RECORD.json'), 'utf-8');
		const record = <unknown[]>JSON.parse(read);
		record.push({
			keyName: key,
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
					name: key,
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
