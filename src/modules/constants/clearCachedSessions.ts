import fs from 'fs';
import { _dirname } from './directories';
export = () => {
	return new Promise((resolve, reject) => {
		try {
			fs.rmdirSync(_dirname + '\\manifest\\sessions', { recursive: true });
			fs.mkdirSync(_dirname + '\\manifest\\sessions');
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};
