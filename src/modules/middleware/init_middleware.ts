/*
	FileName: init_middleware.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Global middleware that is executed before each request, changes to this will affect all servers

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

	***

	Copyright 2015-2020 MFD

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

import crypto from 'crypto';
import headers from '../constants/headers';
import { RequestHandler } from 'express-serve-static-core';

export = ((
	req: { headers: { cookie: string }; hostname: string; method: string; header: (arg0: string) => any },
	res: {
		cookie: (arg0: string, arg1: string, arg2: { maxAge: number; domain: string }) => void;
		header: (arg0: string | typeof headers, arg1?: string) => void;
	},
	next: () => void,
) => {
	if (!req.headers.cookie || (!req.headers.cookie.match(/__tid/) && req.hostname === 'www.sitetest1.mfdlabs.com'))
		res.cookie('__tid', crypto.createHash('sha256').update(crypto.randomBytes(1000)).digest('hex'), {
			maxAge: 3.154e14,
			domain: '.sitetest1.mfdlabs.com',
		});
	if (req.method !== 'GET') {
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.header('Access-Control-Allow-Origin', req.header('Origin') || req.header('Host'));
		res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, OPTIONS');
		res.header('Access-Control-Allow-Credentials', 'true');
	}
	res.header(headers);
	next();
}) as RequestHandler;
