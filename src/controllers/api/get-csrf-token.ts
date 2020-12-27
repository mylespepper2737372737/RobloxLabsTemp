/*
	FileName: get-csrf-token.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://api.sitetest1.mfdlabs.com/csrf/v1/get-csrf-token,

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

import { GetSettings, Group } from '../../modules/Helpers/GetSettings';
import { Request, Response } from 'express-serve-static-core';

const FString = GetSettings(Group.FString);
const FFlag = GetSettings(Group.FFlag);

export default {
	dir: '/csrf/v1/get-csrf-token',
	method: 'ALL',
	func: (request: Request, response: Response) => {
		const DFFlag = GetSettings(Group.DFFlag);
		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });
		if (!DFFlag['IsCSRFV2Enabled'])
			return response.status(503).send({
				success: false,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});

		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
			return response.status(403).send({ success: false, message: 'HTTPS Required.' });

		if (request.method !== 'POST')
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support http method '${request.method}.'`,
				userfacingmessage: 'Something went wrong.',
			});

		if (DFFlag['IsCSRFV2Hardcoded']) {
			return response
				.status(200)
				.header({
					'access-control-expose-headers': 'X-CSRF-TOKEN, API-TRANSFER',
					'x-csrf-token': FString['CSRFV2HardcodedKey'],
					'api-transfer': 'Expose-Hardcoded-Session-Token#433',
				})
				.send({ success: true, message: 'OK' });
		}
	},
};
