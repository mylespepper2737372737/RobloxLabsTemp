/*
	FileName: Roblox.SSL.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Wrapper for SSL servers and HTTP servers, used as a helper.

	All commits will be made on behalf of mfd-co to http://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2015-2020 MFD

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

// import https2 from 'spdy';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'http';
import dotenv from 'dotenv';
// import filestream from 'fs';
import { FastLog, FLog } from '../Roblox.Util/Roblox.Util.FastLog';
import { _dirname, _sslname } from '../../Roblox.Constants/Roblox.Directories';

dotenv.config({ path: _dirname + '\\.env' });
export const ROBLOX_Starter = (app: IApplicationBuilder, name: string): [HttpServer, HttpsServer] => {
	try {
		// const httpsServer = https2
		// 	.createServer(
		// 		{
		// 			cert: filestream.readFileSync(_sslname + '\\sitetest4.robloxlabs.crt', 'utf-8'),
		// 			key: filestream.readFileSync(_sslname + '\\mfdlabsprivate.key', 'utf-8'),
		// 			passphrase: process.env['mfdlabs_pc'],
		// 		},
		// 		app,
		// 	)
		// 	.listen(443, name, () => FastLog.FASTLOG1(`FLog::${name}`, FLog[name], `%s:443 Started`, name));
		const httpServer = app.listen(80, name, () => FastLog.FASTLOG1(`FLog::${name}`, FLog[name], `http://%s:80 Started`, name));
		return [httpServer, null];
	} catch (err) {
		throw new Error(err);
	}
};
