/*
	FileName: init_middleware.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Global middleware that is executed before each request, changes to this will affect all servers

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

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
import headers from '../Roblox.Constants/Roblox.Default.OutBound.Headers';
import { RequestHandler } from 'express-serve-static-core';
import { CreateOrGetXsrfSession } from '../Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.CreateOrGetXsrfSession';
// import whitelist from '../constants/urls';
import { FASTLOG3, FASTLOG6, FLog } from '../Roblox.Helpers/Roblox.Util/Roblox.Util.FastLog';

export const GlobalMiddleware = ((req, res, next) => {
	// TODO Remove this from production and never log to the logfile
	FASTLOG3(FLog['Protocol77'], `${req.method.toUpperCase()} REQUEST ON ${req.protocol}://${req.hostname}${req.url}`);
	res.header(headers);
	if (!req.headers.cookie || (!req.headers.cookie.match(/__tid/) && req.hostname === 'www.sitetest4.robloxlabs.com'))
		res.cookie('__tid', crypto.createHash('sha256').update(crypto.randomBytes(1000)).digest('hex'), {
			maxAge: 3.154e14,
			domain: 'sitetest4.robloxlabs.com',
		});
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, Referer, X-Requested-With, Content-Type, X-CSRF-TOKEN, Pragma, Cache-Control, expires',
	);
	res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
	try {
		res.setHeader('Access-Control-Allow-Origin', req.headers['origin'] || 'https://www.sitetest4.robloxlabs.com');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		// Object.values(whitelist).forEach((v) => {
		// 	if (req.headers['origin'].replace(req.protocol + '://', '') === v) {
		// 		return;
		// 	}
		// });
	} catch (e) {
		FASTLOG6('tasks', `Message: ${e.message}, Stack: ${e.stack}`, true);
	}
	try {
		let cookie = req.headers.cookie;
		if (cookie === undefined) cookie = '';
		cookie = (cookie as string).split(';').find((AuthToken) => {
			return AuthToken.startsWith(' AuthToken') || AuthToken.startsWith('AuthToken');
		});
		if (
			!CreateOrGetXsrfSession(
				typeof cookie !== 'string' ? '' : cookie.split('=')[1],
				req.ip,
				req.headers['x-csrf-token'],
				res,
				req.hostname === 'api.sitetest4.robloxlabs.com' && req.path === '/csrf/v1/get-csrf-token',
			)
		)
			return;
	} catch (e) {
		FASTLOG6('tasks', `Message: ${e.message}, Stack: ${e.stack}`, true);
	}

	// TODO: Validate AuthToken before we redirect, it may be hacked
	if (
		req.headers.cookie &&
		!req.headers.cookie.includes('.ROBLOSECURITY') &&
		(req.hostname === 'www.sitetest4.robloxlabs.com' || req.hostname === 'sitetest4.robloxlabs.com') &&
		(req.path === '/home/' || req.path === '/home')
	) {
		return res.redirect('https://www.sitetest4.robloxlabs.com/Login/');
	}
	if (
		req.headers.cookie &&
		req.headers.cookie.includes('.ROBLOSECURITY') &&
		req.hostname === 'www.sitetest4.robloxlabs.com' &&
		(req.path === '/Login' || req.path === '/Login/' || req.path === '/')
	) {
		return res.redirect('https://www.sitetest4.robloxlabs.com/home');
	}
	next();
}) as RequestHandler;
