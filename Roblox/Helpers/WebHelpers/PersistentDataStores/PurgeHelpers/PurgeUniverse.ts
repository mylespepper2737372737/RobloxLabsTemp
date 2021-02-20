import { _dirname } from '../../../Constants/Directories';
import filestream from 'fs';

export const PurgeUniverse = (universeId: number): Promise<boolean> => {
	return new Promise<boolean>(async (resumefunction) => {
		const root = _dirname + '\\Manifest\\persistence\\' + universeId;
		const dir = _dirname + '\\Manifest\\persistence';
		if (!filestream.existsSync(root)) {
			return resumefunction(true);
		}
		const universe = <Record<string, unknown>>JSON.parse(filestream.readFileSync(root + '\\UNIVERSE.json', 'utf-8'));
		filestream.rmdirSync(root, { recursive: true });
		const record = <unknown[]>JSON.parse(filestream.readFileSync(dir + '\\RECORD.json', { encoding: 'utf-8' }));
		record.push({
			universeId: universeId,
			created: universe['created'],
			purged: new Date(Date.now()).toISOString(),
		});
		filestream.writeFileSync(dir + '\\RECORD.json', JSON.stringify(record, undefined, 4));
		return resumefunction(true);
	});
};
