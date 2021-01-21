/*
	FileName: logoutV2.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://api.mfdlabs.com/auth/v2/logout,
				 deprecated for https://www.mfdlabs.com/Authentication/Logout.fxhx

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

import filestream from 'fs';
import { GetSettings, Group } from '../../modules/Helpers/GetSettings';
import { _dirname } from '../../modules/constants/directories';

export default {
	dir: '/auth/v2/logout',
	method: 'ALL',
	func: (
		request: { method: string; protocol: string; cookies: { authId: string }; query: { cookie: string } },
		response: {
			status: (
				arg0: number,
			) => {
				(): any;
				new (): any;
				send: { (arg0: { code: number; message: string; userfacingmessage?: string }): any; new (): any };
			};
			clearCookie: (arg0: string, arg1: { domain: string; path: string }) => { send: (body: any) => void };
		},
	) => {
		const DFFlag = GetSettings(Group.DFFlag);
		const FFlag = GetSettings(Group.FFlag);
		if (request.method === 'OPTIONS') return response.status(200).send({ code: 200, message: '' });
		if (!DFFlag['IsAuthV2Enabled'])
			return response.status(503).send({
				code: 503,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});
		if (request.protocol !== 'https') return response.status(403).send({ code: 403, message: 'HTTPS Required.' });
		if (request.method !== 'POST')
			return response.status(405).send({
				code: 405,
				message: `The requested resource does not support http method '${request.method}.'`,
				userfacingmessage: 'Something went wrong.',
			});
		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
			return response.status(403).send({ code: 403, message: 'HTTPS Required.' });
		const data = JSON.parse(filestream.readFileSync(_dirname + '/lib/env.json', { encoding: 'utf-8' }));
		const authId: string =
			request.cookies.authId ||
			(request.query.cookie as string)
				.split('; ')
				.find((authid) => authid.startsWith('authId'))
				.split('=')[1];
		if (!authId)
			return response.status(401).send({
				code: 401,
				message: 'Authorization has been denied for this request.',
				userfacingmessage: 'You are not currently logged in.',
			});
		let userId = '';
		for (const i in data['userIds']) {
			if (data['userIds'][i].sessionId !== authId)
				return response.status(404).send({
					code: 404,
					message: 'User not found.',
					userfacingmessage: 'You sent invalid credentials.',
				});
			else userId = i;
		}

		data['userIds'][userId].loggedOn = false;
		data['userIds'][userId].sessionId = '';
		filestream.writeFile(_dirname + '/lib/env.json', JSON.stringify(data, undefined, 4), () =>
			response.clearCookie('authId', { domain: 'mfdlabs.com', path: '/' }).send({ success: true, message: 'Success' }),
		);
	},
};
