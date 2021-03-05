import filestream from 'fs';
import { _dirname } from '../../Constants/Directories';

export const DeleteCsrfSession = (AuthToken: string) => {
	try {
		filestream.unlinkSync(_dirname + `\\Manifest\\csrf\\${AuthToken}.json`);
	} catch (e) {}
};
