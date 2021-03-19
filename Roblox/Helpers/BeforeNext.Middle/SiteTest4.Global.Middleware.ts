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

import crypto from 'crypto';
import headers from '../Constants/Default.OutBound.Headers';
import { RequestHandler } from 'express-serve-static-core';
// import whitelist from '../constants/urls';
import { DFFlag, DFLog, DYNAMIC_LOGGROUP, FASTLOG2, FASTLOG5, FLog, LOGGROUP } from '../WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { ValidateDoesTheWorldGetToViewTheSite } from '../../Util/ValidateDoesTheWorldGetToViewTheSite';
import { StripTheTrailingSlash } from '../../Util/StripTheTrailingSlash';

LOGGROUP('Protocol77');
DYNAMIC_LOGGROUP('Tasks');

export const GlobalMiddleware = ((req, res, next) => {
	// TODO Remove this from production and never log to the logfile
	if (
		(req.path.toLowerCase() !== '/login/maintenance/' &&
			req.hostname !== 'apis.sitetest4.robloxlabs.com' &&
			req.hostname !== 'ecsv2.sitetest4.robloxlabs.com' &&
			req.hostname !== 'metrics.sitetest4.robloxlabs.com') ||
		DFFlag('NoMaintenance')
	) {
		let cookie = req.headers.cookie;
		if (cookie === undefined) cookie = '';
		cookie = (cookie as string).split(';').find((secToken) => {
			return secToken.startsWith(' RobloxSecurityToken') || secToken.startsWith('RobloxSecurityToken');
		});
		if (cookie) cookie = cookie.split('=')[1];
		if (
			!ValidateDoesTheWorldGetToViewTheSite(
				req.method,
				encodeURIComponent(`${req.protocol}://${req.hostname}${req.url}`),
				cookie || <string>req.headers['roblox-security-token'],
				res,
			)
		)
			return;
	}
	if (req.headers['user-agent'] !== null) {
	FASTLOG5(
		FLog['Protocol77'],
		`[FLog::Protocol77] %s REQUEST ON %s://%s%s FROM %s`,
		req.method.toUpperCase(),
		req.protocol,
		req.hostname,
		req.url,
		req.headers['user-agent'],
	);
	}
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
		FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Message: %s, Stack: %s`, e.message, e.stack);
	}
	if (req.method !== 'GET') {
		try {
			// let cookie = req.headers.cookie;
			// if (cookie === undefined) cookie = '';
			// cookie = (cookie as string).split(';').find((AuthToken) => {
			// 	return AuthToken.startsWith(' AuthToken') || AuthToken.startsWith('AuthToken');
			// });
			// if (
			// 	!CreateOrGetXsrfSession(
			// 		typeof cookie !== 'string' ? '' : cookie.split('=')[1],
			// 		req.ip,
			// 		req.headers['x-csrf-token'],
			// 		res,
			// 		req.hostname === 'api.sitetest4.robloxlabs.com' && req.path === '/csrf/v1/get-csrf-token',
			// 	)
			// )
			// 	return;
		} catch (e) {
			FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Message: %s, Stack: %s`, e.message, e.stack);
		}
	}

	// TODO: Validate AuthToken before we redirect, it may be hacked
	if (
		req.headers['user-agent'] &&
		req.headers['user-agent'].includes('robloxlabsStudio') &&
		req.hostname === 'www.sitetest4.robloxlabs.com' &&
		req.path.toLowerCase() === '/'
	) {
		return res.redirect('http://www.sitetest4.robloxlabs.com/roblox.html');
	}

	if (
		req.hostname === 'www.sitetest4.robloxlabs.com' &&
		StripTheTrailingSlash(req.path.toLowerCase()) === '/login/maintenance' &&
		ValidateDoesTheWorldGetToViewTheSite(
			req.method,
			encodeURIComponent(`${req.protocol}://${req.hostname}${req.url}`),
			<string>req.headers['roblox-security-token'],
			res,
			true,
		)
	) {
		return res.redirect('https://www.sitetest4.robloxlabs.com/');
	}
	if (
		req.headers.cookie &&
		!req.headers.cookie.includes('.ROBLOSECURITY') &&
		!req.headers.cookie.includes('AuthToken') &&
		(req.hostname === 'www.sitetest4.robloxlabs.com' || req.hostname === 'sitetest4.robloxlabs.com') &&
		req.path.toLocaleLowerCase() !== '/login/' &&
		req.path.toLocaleLowerCase() !== '/login' &&
		StripTheTrailingSlash(req.path).toLocaleLowerCase() !== '/login/maintenance' &&
		StripTheTrailingSlash(req.path).toLocaleLowerCase() !== '/login/twostepverification' &&
		req.path !== '/' &&
		req.path !== '/roblox.html' &&
		StripTheTrailingSlash(req.path).toLocaleLowerCase() !== '/authentication/login.ashx'
	) {
		return res.redirect('https://www.sitetest4.robloxlabs.com/Login/');
	}
	if (
		req.headers.cookie &&
		req.headers.cookie.includes('.ROBLOSECURITY') &&
		req.hostname === 'www.sitetest4.robloxlabs.com' &&
		(req.path.toLowerCase() === '/login' || req.path.toLowerCase() === '/login/' || req.path === '/')
	) {
		return res.redirect('https://www.sitetest4.robloxlabs.com/home');
	}

	next();
}) as RequestHandler;
