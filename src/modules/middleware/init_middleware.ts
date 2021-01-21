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
import createOrGetXsrfSession from '../Helpers/createOrGetXsrfSession';
import whitelist from '../constants/urls';
import { FASTLOG6 } from '../Helpers/Log';

export = ((req, res, next) => {
	res.header(headers);
	if (!req.headers.cookie || (!req.headers.cookie.match(/__tid/) && req.hostname === 'www.mfdlabs.com'))
		res.cookie('__tid', crypto.createHash('sha256').update(crypto.randomBytes(1000)).digest('hex'), {
			maxAge: 3.154e14,
			domain: 'mfdlabs.com',
		});

	if (req.method !== 'GET') {
		res.header('Access-Control-Allow-Headers', 'Origin, Referer, X-Requested-With, Content-Type, X-CSRF-TOKEN');
		res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
		try {
			Object.values(whitelist).forEach((v) => {
				if (req.headers['origin'].replace(req.protocol + '://', '') === v) {
					res.setHeader('Access-Control-Allow-Origin', req.headers['origin']);
					res.setHeader('Access-Control-Allow-Credentials', 'true');
					return;
				}
			});
		} catch (e) {
			FASTLOG6('tasks', e.message);
		}
		try {
			if (
				!createOrGetXsrfSession(
					(req.headers.cookie as string)
						.split(';')
						.find((authid) => {
							return authid.startsWith(' authId') || authid.startsWith('authId');
						})
						.split('=')[1],
					req.ip,
					req.headers['x-csrf-token'],
					res,
					req.hostname === 'api.mfdlabs.com' && req.path === '/csrf/v1/get-csrf-token',
				)
			)
				return;
		} catch (e) {
			FASTLOG6('tasks', e.message);
		}
	}
	if (
		req.headers.cookie &&
		!req.headers.cookie.includes('authId') &&
		(req.hostname === 'www.mfdlabs.com' || req.hostname === 'mfdlabs.com') &&
		req.path === '/'
	) {
		return res.redirect('https://www.mfdlabs.com/Login/');
	}
	if (
		req.headers.cookie &&
		req.headers.cookie.includes('authId') &&
		req.hostname === 'www.mfdlabs.com' &&
		(req.path === '/Login' || req.path === '/Login/')
	) {
		return res.redirect('https://www.mfdlabs.com/');
	}
	next();
}) as RequestHandler;
