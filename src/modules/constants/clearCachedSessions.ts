import fs from 'fs';
import { _dirname } from './directories';
export = () => {
	return new Promise((resolve, reject) => {
		try {
			fs.rmdirSync(_dirname + '\\manifest\\sessions', { recursive: true });
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};
