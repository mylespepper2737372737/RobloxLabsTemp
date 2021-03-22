/*
	FileName: ClearAllSessionsAndReauthenticate.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: The current ClearAllSessionsAndReauthenticate function.

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
POST https://www.sitetest4.robloxlabs.com/Authentication/ClearAllSessionsAndReauthenticate.ashx https/2.0
X-CSRF-TOKEN: token123
Content-Type: application/x-www-form-urlencoded
Connection: close
Cookie: AuthToken=AUTH_ID

*/

import { userType } from '../../../Helpers/WebHelpers/DataBase/DEPRECATED_GetManifest';
import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import Crypto from 'crypto';
import {
	FLog,
	FASTFLAG,
	DYNAMIC_FASTFLAGVARIABLE,
	LOGGROUP,
	DYNAMIC_FASTINTVARIABLE,
	DFFlag,
	FFlag,
	DFInt,
	FASTLOG,
	FASTLOGS,
	FASTLOG3,
} from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { RobloxLegacy } from '../../../Api';

dotenv.config({ path: RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\.env' });

FASTFLAG('RequireGlobalHTTPS');

DYNAMIC_FASTFLAGVARIABLE('IsWWWAuthV1Enabled', true);
DYNAMIC_FASTFLAGVARIABLE('WWWAuthV1AllowAllMethods', false);

DYNAMIC_FASTINTVARIABLE('WWWAuthV1MaxAuthTokenAge', 94610000 * 10000);

LOGGROUP('WWWAuthV1');

export default {
	method: 'All',
	func: (request: Request, response: Response): Response<unknown> => {
		const Manifest = RobloxLegacy.Api.Helpers.Helpers.DB.GetManifests();

		if (!DFFlag('IsWWWAuthV1Enabled')) {
			FASTLOG(FLog['WWWAuthV1'], '[FLog::WWWAuthV1] The service is currently disabled.');
			return response.status(503).send({
				code: 503,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service unavailable.',
			});
		}

		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });
		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
			FASTLOG(FLog['WWWAuthV1'], '[FLog::WWWAuthV1] HTTPS was not given where it was needed.');
			return response.status(403).send({ success: false, message: 'HTTPS Required.' });
		}

		if (request.method !== 'POST' && !DFFlag('WWWAuthV1AllowAllMethods')) {
			FASTLOGS(FLog['WWWAuthV1'], `[FLog::WWWAuthV1] The method %s is not supported`, request.method);
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support HTTP method '${request.method}'.`,
			});
		}

		let validUser: userType = undefined;
		let isValidId = false;
		if (!request.cookies['AuthToken']) {
			FASTLOG(FLog['WWWAuthV1'], '[FLog::WWWAuthV1] AuthToken did not exist on the request.');
			return response.status(400).send({
				success: false,
				message: 'AuthToken was not supplied',
				userfacingmessage: 'Unknown AuthToken, why are you on a page that requires auth without and Id?',
			});
		}
		Manifest.forEach((user) => {
			user.sessionIds.forEach((sessionId) => {
				if (sessionId === request.cookies['AuthToken']) {
					isValidId = true;
					validUser = user;
				}
			});
		});
		if (!isValidId) {
			FASTLOGS(FLog['WWWAuthV1'], `[FLog::WWWAuthV1] The user matching %s was not found.`, request.cookies['AuthToken']);
			// We should try and delete the cookie here.
			return response.status(404).send({
				success: false,
				message: 'AuthToken not found.',
				userfacingmessage: 'The current credentials are invalid, please manually remove them and log in again.',
			});
		}

		RobloxLegacy.Api.Helpers.Helpers.Sessions.DeleteCsrfSession(request.cookies['AuthToken']);
		RobloxLegacy.Api.Helpers.Helpers.DB.WriteToManifest(validUser.userId, 'sessionIds', [], false, false, 0, false, false);
		const AuthToken = Crypto.createHash('sha512').update(Crypto.randomBytes(1000)).digest('hex');
		RobloxLegacy.Api.Helpers.Helpers.DB.WriteToManifest(validUser.userId, 'sessionIds', AuthToken, true, false, 0, false, false);
		RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCsrfSessionFile(AuthToken);

		response.shouldKeepAlive = false;
		FASTLOG3(
			FLog['WWWAuthV1'],
			`Successfully cleared all sessions of %s [%s-%s]`,
			validUser.username.toString(),
			validUser.userId,
			request.cookies['AuthToken'],
		);
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
