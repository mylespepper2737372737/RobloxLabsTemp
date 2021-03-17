import filestream from 'fs';
import { _dirname } from '../../../Constants/Directories';

/**
 * Create a Universe from the give UniverseId,
 * if it exists already,
 * then return true.
 * @param universeId The UniverseId to initialize.
 * @yields Yields until operation is complete.
 * @returns Promise<boolean>
 */
export const WriteUniverse = (universeId: number): Promise<boolean> => {
	return new Promise<boolean>((resumefunction) => {
		const path = _dirname + '\\DataBase\\persistence\\' + universeId;
		const time = new Date(Date.now()).toISOString();
		if (filestream.existsSync(path)) return resumefunction(true);
		filestream.mkdirSync(path);
		filestream.writeFileSync(path + '\\RECORD.json', '[]', { encoding: 'utf-8' });
		// init with no places for now, as we don't have a place manager
		const info = {
			universeId: universeId,
			places: [],
			stores: 0,
			root: path + '\\',
			created: time,
			lastUpdated: time,
		};
		filestream.writeFileSync(path + '\\UNIVERSE.json', JSON.stringify(info, undefined, 4), { encoding: 'utf-8' });
		filestream.mkdirSync(path + '\\stores');
		filestream.writeFileSync(path + '\\stores\\RECORD.json', '[]', { encoding: 'utf-8' });
		const read = filestream.readFileSync(_dirname + '\\DataBase\\persistence\\RECORD.json', 'utf-8');
		const record = <unknown[]>JSON.parse(read);
		record.push({
			universeId: universeId,
			created: time,
			purged: null,
		});
		filestream.writeFile(
			_dirname + '\\DataBase\\persistence\\RECORD.json',
			JSON.stringify(record, undefined, 4),
			{
				encoding: 'utf-8',
			},
			() => {
				return resumefunction(true);
			},
		);
	});
};
