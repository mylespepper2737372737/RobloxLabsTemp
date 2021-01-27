import filestream from 'fs';
import { _dirname } from '../../constants/directories';

type csrfSessionType = { sub: string; token: string; c: number };

export = (sessionFile: string): csrfSessionType => {
	try {
		return JSON.parse(filestream.readFileSync(_dirname + '\\manifest\\csrf\\' + sessionFile, { encoding: 'utf-8' }));
	} catch {
		return { c: 0, sub: '', token: '' };
	}
};
