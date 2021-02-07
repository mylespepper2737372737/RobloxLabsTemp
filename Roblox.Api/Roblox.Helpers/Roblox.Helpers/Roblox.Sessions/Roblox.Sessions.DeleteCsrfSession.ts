import filestream from 'fs';
import { _dirname } from '../../Roblox.Constants/Roblox.Directories';

export const DeleteCsrfSession = (AuthToken: string) => {
	try {
		filestream.unlinkSync(_dirname + `\\Roblox.Manifest\\csrf\\${AuthToken}.json`);
	} catch (e) {
		console.log(e);
	}
};
