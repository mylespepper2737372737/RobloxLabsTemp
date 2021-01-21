/*
	FileName: ClearAllSessionsAndReauthenticate.fxhx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: The current ClearAllSessionsAndReauthenticate function.

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

/*
POST https://www.mfdlabs.com/Authentication/ClearAllSessionsAndReauthenticate.fxhx HTTP/2.0
X-CSRF-TOKEN: token123
Content-Type: application/x-www-form-urlencoded
Connection: close
Cookie: authId=AUTH_ID

*/

import createCsrfSessionFile from '../../modules/Helpers/createCsrfSessionFile';
import SetManifestField from '../../modules/Helpers/SetManifestField';
import { GetManifests, userType } from '../../modules/Helpers/GetManifests';
import { GetSettings, Group } from '../../modules/Helpers/GetSettings';
import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import { _dirname } from '../../modules/constants/directories';
import Crypto from 'crypto';
import { FLog, FASTLOG4, FASTLOG1, FASTLOG6 } from '../../modules/Helpers/Log';
import deleteCsrfSession from '../../modules/Helpers/deleteCsrfSession';

dotenv.config({ path: _dirname + '\\.env' });

// These flags are 'Launch-Time flags'
const FFlag = GetSettings(Group.FFlag);

export default {
	dir: '/Authentication/ClearAllSessionsAndReauthenticate.fxhx',
	method: 'All',
	func: (request: Request, response: Response): Response<unknown> => {
		// Anything up here is dynamic,
		// these flags are 'Run-Time flags'
		const DFFlag = GetSettings(Group.DFFlag);
		const DFInt = GetSettings(Group.DFInt);
		const Manifest = GetManifests();

		if (!DFFlag['IsWWWAuthV1Enabled']) {
			FASTLOG4(FLog['WWWAuthV1'], 'The service is disabled currently.', true);
			return response.status(503).send({
				code: 503,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});
		}

		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });
		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
			FASTLOG6(FLog['WWWAuthV1'], 'HTTPS was not given where it was required.', true);
			return response.status(403).send({ success: false, message: 'HTTPS Required.' });
		}

		if (request.method !== 'POST' && !DFFlag['WWWAuthV1AllowAllMethods']) {
			FASTLOG6(FLog['WWWAuthV1'], `${request.method} is not supported`);
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support http method '${request.method}'.`,
			});
		}

		let validUser: userType = undefined;
		let isValidId = false;
		if (!request.cookies['authId']) {
			FASTLOG6(FLog['WWWAuthV1'], 'AuthId did not exist on the request.', true);
			return response.status(400).send({
				success: false,
				message: 'AuthId was not supplied',
				userfacingmessage: 'Unknown authId, why are you on a page that requires auth without and Id?',
			});
		}
		Manifest.forEach((user) => {
			user.sessionIds.forEach((sessionId) => {
				if (sessionId === request.cookies['authId']) {
					isValidId = true;
					validUser = user;
				}
			});
		});
		if (!isValidId) {
			FASTLOG4(FLog['WWWAuthV1'], `The user matching ${request.cookies['authId']} was not found.`, true);
			return response.status(404).send({
				success: false,
				message: 'AuthId not found.',
				userfacingmessage: 'The current credentials are invalid, please manually remove them and log in again.',
			});
		}

		deleteCsrfSession(request.cookies['authId']);
		SetManifestField(validUser.userId, 'sessionIds', [], false, false, 0, false, false);
		const authId = Crypto.createHash('sha512').update(Crypto.randomBytes(1000)).digest('hex');
		SetManifestField(validUser.userId, 'sessionIds', authId, true, false, 0, false, false);
		createCsrfSessionFile(authId);

		response.shouldKeepAlive = false;
		FASTLOG1(
			FLog['WWWAuthV1'],
			`Successfully cleared all sessions of ${validUser.username.toString()} [${validUser.userId}-${request.cookies['authId']}]`,
			true,
		);
		return response
			.status(200)
			.cookie('authId', authId, {
				maxAge: DFInt['WWWAuthV1MaxAuthIdAge'],
				domain: 'mfdlabs.com',
				secure: true,
				sameSite: 'lax',
				httpOnly: true,
			})
			.send({ success: true, message: 'Success', userfacingmessage: 'Success' });
	},
};
