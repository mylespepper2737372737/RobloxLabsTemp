import filestream from 'fs';
import path from 'path';
export const walk = (directory: string, arr?: string[]) => {
	const f = filestream.readdirSync(directory);
	arr = arr || [];

	f.forEach((v) => {
		const d = directory + '\\' + v;
		if (filestream.statSync(d).isDirectory()) {
			arr = walk(d, arr);
		} else {
			arr.push(path.join(directory, '\\', v));
		}
	});

	return arr;
};
