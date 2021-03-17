import filestream from 'fs';
import { _dirname } from '../../Constants/Directories';

export const DeleteCaptchaSession = (sessionId: string) => {
	try {
		filestream.unlinkSync(_dirname + `\\DataBase\\sessions\\${sessionId}.json`);
	} catch {
		console.warn('Session most likely destroyed');
	}
};
