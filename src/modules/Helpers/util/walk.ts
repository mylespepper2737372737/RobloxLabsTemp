import filestream from 'fs';
import path from 'path';
export const walk = (directory: string, resumeFunction: (err: unknown, results: string[]) => void) => {
	let res = [];
	filestream.readdir(directory, (err, list) => {
		let i = 0;
		if (err) return resumeFunction(err, []);
		(function next() {
			let file = list[i++];
			if (!file) return resumeFunction(null, res);
			file = path.resolve(directory, file);
			filestream.stat(file, (e, s) => {
				if (e) return resumeFunction(e, []);
				if (s && s.isDirectory()) {
					walk(file, (e1, r) => {
						if (e1) return resumeFunction(e1, []);
						res = res.concat(r);
					});
				} else {
					res.push(file);
					next();
				}
			});
		})();
	});
};
