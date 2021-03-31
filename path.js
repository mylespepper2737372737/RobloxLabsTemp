/**
 * This file will automatically set the path in the Assemblies\Helpers\Constants\Directories.ts, to disable this, add this to the top of the file Assemblies\Helpers\Constants\Directories.ts
 * '// !DISABLE-AUTO-SELECT-DIR'
 * It should instert this automatically the first time.
 */

const fs = require('fs');

(function () {
	try {
		const fileName = `${__dirname}\\Assemblies\\Helpers\\Constants\\Directories.ts`;
		if (!fs.existsSync(fileName)) {
			return process.exit(1);
		}
		let contents = fs.readFileSync(fileName, { encoding: 'utf-8' });
		if (contents.includes('// !DISABLE-AUTO-SELECT-DIR')) return;
		const data = contents.match(/(["'])(?:(?=(\\?))\2.)*?\1/i);
		contents = contents.replace(data[0], `'${__dirname.split('\\').join('\\\\')}'`);
		contents = `// THIS FILE WAS AUTOMATICALLY GENERATED, DO NOT EDIT\r\n// !DISABLE-AUTO-SELECT-DIR\r\n${contents}`;
		fs.writeFileSync(fileName, contents);
	} catch {}
})();
