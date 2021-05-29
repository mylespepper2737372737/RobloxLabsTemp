import filestream from 'fs';
import { __baseDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';

type csrfSessionType = { sub: string; token: string; c: number };

export const GetCsrfSession = (sessionFile: string): csrfSessionType => {
	try {
		return JSON.parse(filestream.readFileSync(__baseDirName + '/DataBase/csrf/' + sessionFile, { encoding: 'utf-8' }));
	} catch {
		return { c: 0, sub: '', token: '' };
	}
};
