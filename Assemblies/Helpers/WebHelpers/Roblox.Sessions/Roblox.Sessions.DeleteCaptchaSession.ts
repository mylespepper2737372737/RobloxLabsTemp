import filestream from 'fs';
import { __baseDirName } from '../../Constants/Directories';

export const DeleteCaptchaSession = (sessionId: string) => {
	try {
		filestream.unlinkSync(__baseDirName + `\\DataBase\\sessions\\${sessionId}.json`);
	} catch {
		console.warn('Session most likely destroyed');
	}
};
