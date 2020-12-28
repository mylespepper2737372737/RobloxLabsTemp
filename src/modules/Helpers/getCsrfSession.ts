import filestream from 'fs';
import { _dirname } from '../constants/directories';

export = (sessionFile: string) => {
	try {
		return JSON.parse(filestream.readFileSync(_dirname + '\\manifest\\csrf\\' + sessionFile, { encoding: 'utf-8' }));
	} catch {
		return {};
	}
};
