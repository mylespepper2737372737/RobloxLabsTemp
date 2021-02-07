import filestream from 'fs';
import { _dirname } from '../../Roblox.Constants/Roblox.Directories';

type csrfSessionType = { sub: string; token: string; c: number };

export const GetCsrfSession = (sessionFile: string): csrfSessionType => {
	try {
		return JSON.parse(filestream.readFileSync(_dirname + '\\Roblox.Manifest\\csrf\\' + sessionFile, { encoding: 'utf-8' }));
	} catch {
		return { c: 0, sub: '', token: '' };
	}
};
