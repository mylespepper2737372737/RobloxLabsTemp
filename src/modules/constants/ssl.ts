import https2 from 'spdy';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import dotenv from 'dotenv';
import { _sslname, _dirname } from '../constants/directories';
dotenv.config({ path: _dirname + '\\.env' });
import filestream from 'fs';
export = (app: IApplicationBuilder, name: string): void => {
	try {
		https2
			.createServer(
				{
					cert: filestream.readFileSync(_sslname + '\\mfdlabs.crt', 'utf-8'),
					key: filestream.readFileSync(_sslname + '\\mfdlabsprivate.key', 'utf-8'),
					passphrase: process.env['mfdlabs_pc'],
				},
				app,
			)
			.listen(443, name, () => console.log(`https://${name}:443 started.`));
		app.listen(80, name, () => console.log(`http://${name}:80 started.`));
	} catch (err) {
		throw new Error(err);
	}
};
