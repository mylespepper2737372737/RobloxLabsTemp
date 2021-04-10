import filestream from 'fs';
import { __baseDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';

export const DeleteCsrfSession = (AuthToken: string) => {
	try {
		filestream.unlinkSync(__baseDirName + `\\DataBase\\csrf\\${AuthToken}.json`);
	} catch (e) {}
};
