/*
	FileName: ClearAllSessionsAndReauthenticate.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: The current ClearAllSessionsAndReauthenticate function.

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

/*
POST https://www.sitetest4.robloxlabs.com/Authentication/ClearAllSessionsAndReauthenticate.ashx https/2.0
X-CSRF-TOKEN: token123
Content-Type: application/x-www-form-urlencoded
Connection: close
Cookie: AuthToken=AUTH_ID

*/

import { userType } from '../../../Roblox.Helpers/Roblox.Helpers/Roblox.DB/DEPRECATED_Roblox.Api.Helpers.DB.GetManifest';
import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import Crypto from 'crypto';
import { FLog, FASTLOG4, FASTLOG1, FASTLOG6 } from '../../../Roblox.Helpers/Roblox.Helpers/Roblox.Util/Roblox.Util.FastLog';
import { Roblox } from '../../../Roblox.Api';

dotenv.config({ path: Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\.env' });

// These flags are 'Launch-Time flags'
const FFlag = Roblox.Api.Helpers.Util.ClientSettings.GetFFlags();

export default {
	method: 'All',
	func: (request: Request, response: Response): Response<unknown> => {
		// Anything up here is dynamic,
		// these flags are 'Run-Time flags'
		const DFFlag = Roblox.Api.Helpers.Util.ClientSettings.GetDFFlags();
		const DFInt = Roblox.Api.Helpers.Util.ClientSettings.GetDFInts();
		const Manifest = Roblox.Api.Helpers.Helpers.DB.GetManifests();

		if (!DFFlag['IsWWWAuthV1Enabled']) {
			FASTLOG4(FLog['WWWAuthV1'], 'The service is disabled currently.', true);
			return response.status(503).send({
				code: 503,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});
		}

		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });
		if (FFlag['RequireGlobalhttps'] && request.protocol !== 'https') {
			FASTLOG6(FLog['WWWAuthV1'], 'https was not given where it was required.', true);
			return response.status(403).send({ success: false, message: 'https Required.' });
		}

		if (request.method !== 'POST' && !DFFlag['WWWAuthV1AllowAllMethods']) {
			FASTLOG6(FLog['WWWAuthV1'], `${request.method} is not supported`, true);
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support https method '${request.method}'.`,
			});
		}

		let validUser: userType = undefined;
		let isValidId = false;
		if (!request.cookies['AuthToken']) {
			FASTLOG6(FLog['WWWAuthV1'], 'AuthToken did not exist on the request.', true);
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
			FASTLOG4(FLog['WWWAuthV1'], `The user matching ${request.cookies['AuthToken']} was not found.`, true);
			return response.status(404).send({
				success: false,
				message: 'AuthToken not found.',
				userfacingmessage: 'The current credentials are invalid, please manually remove them and log in again.',
			});
		}

		Roblox.Api.Helpers.Helpers.Sessions.DeleteCsrfSession(request.cookies['AuthToken']);
		Roblox.Api.Helpers.Helpers.DB.WriteToManifest(validUser.userId, 'sessionIds', [], false, false, 0, false, false);
		const AuthToken = Crypto.createHash('sha512').update(Crypto.randomBytes(1000)).digest('hex');
		Roblox.Api.Helpers.Helpers.DB.WriteToManifest(validUser.userId, 'sessionIds', AuthToken, true, false, 0, false, false);
		Roblox.Api.Helpers.Helpers.Sessions.CreateCsrfSessionFile(AuthToken);

		response.shouldKeepAlive = false;
		FASTLOG1(
			FLog['WWWAuthV1'],
			`Successfully cleared all sessions of ${validUser.username.toString()} [${validUser.userId}-${request.cookies['AuthToken']}]`,
			true,
		);
		return response
			.status(200)
			.cookie('AuthToken', AuthToken, {
				maxAge: DFInt['WWWAuthV1MaxAuthTokenAge'],
				domain: 'sitetest4.robloxlabs.com',
				secure: false,
				sameSite: 'lax',
				httpOnly: true,
			})
			.send({ success: true, message: 'Success', userfacingmessage: 'Success' });
	},
};
