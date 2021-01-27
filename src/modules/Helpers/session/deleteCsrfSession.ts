import filestream from 'fs';
import { _dirname } from '../../constants/directories';

export = (authId: string) => {
	try {
		filestream.unlinkSync(_dirname + `\\manifest\\csrf\\${authId}.json`);
	} catch (e) {
		console.log(e);
	}
};
