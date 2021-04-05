import filestream from 'fs';
import path from 'path';
export const FileWalker = (directoryName: string, paths?: string[]) => {
	const directory = filestream.readdirSync(directoryName);
	paths = paths || [];

	directory.forEach((directoryOrFile) => {
		const directoryNameV2 = directoryName + '\\' + directoryOrFile;
		if (filestream.statSync(directoryNameV2).isDirectory()) {
			paths = FileWalker(directoryNameV2, paths);
		} else {
			paths.push(path.join(directoryName, '\\', directoryOrFile));
		}
	});

	return paths;
};
