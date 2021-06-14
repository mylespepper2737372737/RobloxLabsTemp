/*
	FileName: Roblox.SSL.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Wrapper for SSL servers and https servers, used as a helper.

	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

import https2 from 'spdy';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { Server as HttpServer } from 'http';
import https, { Server as HttpsServer } from 'https';
import dotenv from 'dotenv';
import filestream from 'fs';
import { DFFlag, FASTLOG3, SFLog } from '../../Util/Roblox.Web.Util/Logging/FastLog';
import { __baseDirName, __sslDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';
import { FastLogGlobal } from '../../Util/Roblox.Web.Util/Logging/FastLogGlobal';

dotenv.config({ path: __baseDirName + '/.env' });

FastLogGlobal.IncludeHostLogLevels();

export const ServerStarter = (
	app: IApplicationBuilder,
	name: string,
	useHttps: bool = true,
	useHttp: bool = true,
	httpPort: int = 80,
	httpsPort: int = 443,
): [HttpServer, HttpsServer] => {
	try {
		let httpsServer: HttpsServer;
		let httpServer: HttpServer;
		if (useHttps)
			httpsServer = (DFFlag('GlobalHTTP2Enabled') ? https2 : https)
				.createServer(
					{
						cert: filestream.readFileSync(__sslDirName + '/ST4.crt', 'utf-8'),
						key: filestream.readFileSync(__sslDirName + '/ST4.key', 'utf-8'),
						ca: [filestream.readFileSync(__sslDirName + '/rootCA.crt', 'utf-8')],
						passphrase: process.env['ST4_pw'],
					},
					app,
				)
				.listen(httpsPort, name, () => FASTLOG3(SFLog[name], `[SFLog::%s] https://%s:%d Started`, name, name, httpsPort));
		if (useHttp)
			httpServer = app.listen(httpPort, name, () => FASTLOG3(SFLog[name], `[SFLog::%s] http://%s:%d Started`, name, name, httpPort));
		return [httpServer, httpsServer];
	} catch (err) {
		throw new Error(err);
	}
};
