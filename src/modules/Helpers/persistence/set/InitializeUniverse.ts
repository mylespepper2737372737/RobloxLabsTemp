import filestream from 'fs';
import { _dirname } from '../../../constants/directories';
export = (universe: number): Promise<boolean> => {
	return new Promise<boolean>((resumefunction) => {
		const path = _dirname + '\\manifest\\persistence\\' + universe;
		const time = new Date(Date.now()).toISOString();
		if (filestream.existsSync(path)) return resumefunction(true);
		filestream.mkdirSync(path);
		filestream.writeFileSync(path + '\\RECORD.json', '[]', { encoding: 'utf-8' });
		// init with no places for now, as we don't have a place manager
		const info = {
			universeId: universe,
			places: [],
			stores: 0,
			created: time,
			lastUpdated: time,
		};
		filestream.writeFileSync(path + '\\UNIVERSE.json', JSON.stringify(info, undefined, 4), { encoding: 'utf-8' });
		filestream.mkdirSync(path + '\\stores');
		filestream.writeFileSync(path + '\\stores\\RECORD.json', '[]', { encoding: 'utf-8' });
		const read = filestream.readFileSync(_dirname + '\\manifest\\persistence\\RECORD.json', 'utf-8');
		const record = <unknown[]>JSON.parse(read);
		record.push({
			universeId: universe,
			created: time,
			purged: null,
		});
		filestream.writeFile(
			_dirname + '\\manifest\\persistence\\RECORD.json',
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
