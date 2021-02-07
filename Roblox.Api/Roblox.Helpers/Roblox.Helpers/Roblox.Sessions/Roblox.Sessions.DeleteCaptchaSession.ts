import filestream from 'fs';
import { _dirname } from '../../Roblox.Constants/Roblox.Directories';

export const DeleteCaptchaSession = (sessionId: string) => {
	try {
		filestream.unlinkSync(_dirname + `\\Roblox.Manifest\\sessions\\${sessionId}.json`);
	} catch {
		console.warn('Session most likely destroyed');
	}
};
