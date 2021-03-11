/*
	FileName: init_middleware.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Global middleware that is executed before each request, changes to this will affect all servers

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

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

import { RequestHandler } from 'express-serve-static-core';
import { FASTLOG5, FLog, LOGVARIABLE } from '../WebHelpers/Roblox.Util/Roblox.Util.FastLog';

LOGVARIABLE('Kestrul', 6);

export const Kestrel = ((req, res, next) => {
	// TODO Remove this from production and never log to the logfile
	FASTLOG5(
		FLog['Kestrul'],
		`[FLog::Kestrul] %s REQUEST ON %s://%s%s FROM %s`,
		req.method.toUpperCase(),
		req.protocol,
		req.hostname,
		req.url,
		req.headers['user-agent'].toUpperCase(),
	);
	res.header({ server: 'Kestrel', 'X-DNS-Prefetch-Control': 'off' });
	if (req.headers['origin'] === 'https://www.sitetest4.robloxlabs.com' || req.xhr) {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Referer, X-Requested-With, Content-Type, X-CSRF-TOKEN, Pragma, Cache-Control, expires',
		);
		res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
		res.setHeader('Access-Control-Allow-Origin', req.headers['origin'] || 'https://www.sitetest4.robloxlabs.com');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
	}

	next();
}) as RequestHandler;
