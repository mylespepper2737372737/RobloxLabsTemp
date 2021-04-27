/*
	FileName: Login.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: The current Login function.
			
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

/* 
POST https://www.sitetest4.robloxlabs.com/Authentication/Login.ashx https/2.0
X-CSRF-TOKEN: token123
Content-Type: application/x-www-form-urlencoded
Connection: close

&cvalue=username
&password=password
&captchaToken=sessionId+gameId+correctAnswers[].toString()|locale-info

*/

import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import filestream from 'fs';
import Crypto from 'crypto';
import { GetManifests } from '../../../../Assemblies/Caching/Database/Roblox.Caching.Database/DEPRECATED_GetManifest';
import { GetRegisteredUsers } from '../../../../Assemblies/Caching/Database/Roblox.Caching.Database/DEPRECATED_GetRegisteredUsers';
import { GetSessions } from '../../../../Assemblies/Caching/Database/Roblox.Caching.Database/DEPRECATED_GetSessions';
import { WriteToManifest } from '../../../../Assemblies/Caching/Database/Roblox.Caching.Database/DEPRECATED_WriteToManifest';
import { CreateCaptchaBlobSessionAfter403 } from '../../../../Assemblies/Caching/Sessions/Roblox.Caching.Sessions/CreateCaptchaBlobSessionAfter403';
import { DeleteCaptchaSession } from '../../../../Assemblies/Caching/Sessions/Roblox.Caching.Sessions/DeleteCaptchaSession';
import { CreateCsrfSessionFile } from '../../../../Assemblies/Caching/Sessions/Roblox.Caching.Sessions/CreateCsrfSessionFile';
import { CreateCaptchaSessionBlob } from '../../../../Assemblies/Caching/Sessions/Roblox.Caching.Sessions/CreateCaptchaSessionBlob';
import {
	DFFlag,
	DFInt,
	DYNAMIC_FASTFLAG,
	DYNAMIC_FASTINT,
	FASTFLAG,
	FFlag,
} from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { __baseDirName } from '../../../../Assemblies/Common/Constants/Roblox.Common.Constants/Directories';

dotenv.config({ path: __baseDirName + '\\.env' });

FASTFLAG('RequireGlobalHTTPS');
DYNAMIC_FASTFLAG('IsWWWAuthV1Enabled');
DYNAMIC_FASTINT('WWWAuthV1MaxAuthTokenAge');

export default {
	method: 'All',
	func: (request: Request, response: Response): Response<unknown> | void => {
		const Manifest = GetManifests();
		if (!DFFlag('IsWWWAuthV1Enabled'))
			return response.status(503).send({
				code: 503,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});
		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });
		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
			return response.status(403).send({ success: false, message: 'HTTPS Required.' });

		if (request.method !== 'POST' && !DFFlag('WWWAuthV1AllowAllMethods'))
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support http method '${request.method}'.`,
			});

		const registeredUsers = GetRegisteredUsers();

		const sessions = filestream.readdirSync(__baseDirName + '\\DataBase\\sessions');
		if (JSON.stringify(request.body) === '{}') return response.status(400).send({ success: false, message: 'No body was provided.' });
		if (request.body && request.headers['content-type'] !== 'application/x-www-form-urlencoded')
			return response.status(400).send({
				success: false,
				message: `The Content-Type ${request.headers['content-type']} is not supported.`,
			});
		if (!request.body['cvalue'] || !request.body['password'])
			return response.status(400).send({
				success: false,
				message: 'The body provided was invalid.',
				userfacingmessage: 'The provided credentials were invalid.',
			});

		const Sessions = GetSessions();
		if (DFFlag['IsCaptchaV2Enabled']) {
			const __captchaSession = CreateCaptchaSessionBlob(request.ip);
			const cToken = request.body['captchaToken'];
			if (typeof cToken === 'string') {
				const cSession = cToken.split('|')[0];
				if (cSession) {
					let isCaptchaSessionValid = false;
					for (const v of sessions) {
						const sessionId = v.split('.').shift();
						if (sessionId === cSession) {
							isCaptchaSessionValid = true;
							break;
						}
					}
					if (isCaptchaSessionValid) {
						const cAnswer = cToken.split('|')[1];
						if (!Sessions.has(cSession)) return CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
						if (Sessions.get(cSession).answer !== cAnswer)
							return CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
						DeleteCaptchaSession(cSession);
					} else {
						return CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
					}
				} else {
					return CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
				}
			} else {
				return CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
			}
		}

		let isValidUser = false;
		let userId = '';
		for (const id of Object.keys(registeredUsers)) {
			if (registeredUsers[id] === request.body['cvalue']) {
				isValidUser = true;
				userId = id;
				break;
			}
		}
		if (isValidUser === false)
			return response.status(404).send({
				success: false,
				message: 'User not found.',
				userfacingmessage: 'Incorrect username or password.',
			});
		// let user = undefined;
		if (Manifest.get(userId).password !== request.body['password'])
			return response.status(403).send({
				success: false,
				message: 'Incorrect Password.',
				userfacingmessage: 'Incorrect Password or Username.',
			});
		const AuthToken = Crypto.createHash('sha512').update(Crypto.randomBytes(1000)).digest('hex');
		WriteToManifest(userId, 'sessionIds', AuthToken, true, false, 0, false, false);
		CreateCsrfSessionFile(AuthToken);

		response.shouldKeepAlive = false;
		return response
			.status(200)
			.cookie('AuthToken', AuthToken, {
				maxAge: DFInt('WWWAuthV1MaxAuthTokenAge'),
				domain: 'sitetest4.robloxlabs.com',
				secure: false,
				sameSite: 'lax',
				httpOnly: true,
			})
			.send({ success: true, message: 'Success', userfacingmessage: 'Success' });
	},
};
