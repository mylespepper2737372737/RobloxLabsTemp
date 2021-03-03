/*
	FileName: get-csrf-token.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://api.sitetest4.robloxlabs.com/csrf/v1/get-csrf-token,

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

import { Request, Response } from 'express-serve-static-core';
import {
	DFFlag,
	DYNAMIC_FASTFLAGVARIABLE,
	FASTFLAG,
	FASTLOG,
	FASTLOG2,
	FASTLOGS,
	FFlag,
	FLog,
	LOGGROUP,
} from '../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { Roblox } from '../../../../Api';

FASTFLAG('RequireGlobalHTTPS');

DYNAMIC_FASTFLAGVARIABLE('IsCSRFV2Enabled', true);

LOGGROUP('CsrfAPIV1');

export default {
	method: 'ALL',
	func: (request: Request, response: Response) => {
		if (!DFFlag('IsCSRFV2Enabled')) {
			FASTLOG(FLog['CsrfAPIV1'], '[FLog::CsrfAPIV1] The service is disabled currently.');
			return response.status(503).send({
				success: false,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});
		}

		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });

		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
			FASTLOG(FLog['CsrfAPIV1'], 'https was not given where it was required.');
			return response.status(403).send({ success: false, message: 'HTTPS Required.' });
		}

		if (request.method !== 'POST') {
			FASTLOGS(FLog['CsrfAPIV1'], `[FLog::CsrfAPIV1] The request metod '%s' is not supported`, request.method);
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support HTTP method '${request.method}'.`,
			});
		}

		const res = Roblox.Api.Helpers.Helpers.Sessions.CreateOrGetXsrfSession(
			request.cookies['AuthToken'],
			request.ip,
			request.headers['x-csrf-token'],
			response,
			true,
		);
		console.log(res);
		if (!res) {
			FASTLOG2(
				FLog['CsrfAPIV1'],
				`[FLog::CsrfAPIV1] Gave CSRF for subject %s [%s], the session probably didn't exist.`,
				request.cookies['AuthToken'] || 'No AuthToken',
				request.ip,
			);
			return;
		}
		FASTLOG2(
			FLog['CsrfAPIV1'],
			`[FLog::CsrfAPIV1] Gave CSRF for subject %s [%s], the session probably did exist.`,
			request.cookies['AuthToken'] || 'No AuthToken',
			request.ip,
		);
	},
};
