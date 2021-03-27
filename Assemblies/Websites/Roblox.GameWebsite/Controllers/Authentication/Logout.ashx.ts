/*
	FileName: Logout.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: The current Logout function.

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
POST https://www.sitetest4.robloxlabs.com/Authentication/Logout.ashx https/2.0
X-CSRF-TOKEN: token123
Content-Type: application/x-www-form-urlencoded
Connection: close
Cookie: AuthToken=AUTH_ID

*/

import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import { RobloxLegacy } from '../../../../Api';

dotenv.config({ path: RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\.env' });

// These flags are 'Launch-Time flags'
const FFlag = RobloxLegacy.Api.Helpers.Util.ClientSettings.GetFFlags();

export default {
	method: 'All',
	func: (request: Request, response: Response): Response<unknown> => {
		// Anything up here is dynamic,
		// these flags are 'Run-Time flags'
		const DFFlag = RobloxLegacy.Api.Helpers.Util.ClientSettings.GetDFFlags();
		const Manifest = RobloxLegacy.Api.Helpers.Helpers.DB.GetManifests();

		if (!DFFlag['IsWWWAuthV1Enabled'])
			return response.status(503).send({
				code: 503,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});

		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });
		if (FFlag['RequireGlobalhttps'] && request.protocol !== 'https')
			return response.status(403).send({ success: false, message: 'https Required.' });

		if (request.method !== 'POST' && !DFFlag['WWWAuthV1AllowAllMethods'])
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support https method '${request.method}'.`,
			});

		let validUser = undefined;
		let isValidId = false;
		let validIdx = 0;
		if (!request.cookies['AuthToken'])
			return response.status(400).send({
				success: false,
				message: 'AuthToken was not supplied',
				userfacingmessage: 'Unknown AuthToken, why are you on a page that requires auth without and Id?',
			});
		Manifest.forEach((user) => {
			user.sessionIds.forEach((sessionId, idx) => {
				if (sessionId === request.cookies['AuthToken']) {
					isValidId = true;
					validUser = user;
					validIdx = idx;
				}
			});
		});
		if (!isValidId)
			return response.status(404).send({
				success: false,
				message: 'AuthToken not found.',
				userfacingmessage: 'The current credentials are invalid, please manually remove them and log in again.',
			});

		RobloxLegacy.Api.Helpers.Helpers.Sessions.DeleteCsrfSession(request.cookies['AuthToken']);
		RobloxLegacy.Api.Helpers.Helpers.DB.WriteToManifest(validUser.userId, 'sessionIds', undefined, false, false, validIdx, true, false);

		response.shouldKeepAlive = false;
		return response
			.status(200)
			.clearCookie('AuthToken', { domain: 'sitetest4.robloxlabs.com' })
			.send({ success: true, message: 'Success', userfacingmessage: 'Success' });
	},
};
