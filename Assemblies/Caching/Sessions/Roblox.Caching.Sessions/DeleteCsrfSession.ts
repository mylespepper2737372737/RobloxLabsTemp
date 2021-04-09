import filestream from 'fs';
import { __baseDirName } from '../../../Util/Directories';

export const DeleteCsrfSession = (AuthToken: string) => {
	try {
		filestream.unlinkSync(__baseDirName + `\\DataBase\\csrf\\${AuthToken}.json`);
	} catch (e) {}
};
