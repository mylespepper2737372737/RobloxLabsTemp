/*
	FileName: clientsettings.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Client settings, such as WebSettings etc.

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

	NOTICE DO NOT PUT CSRF PROTECTION ON THIS!

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
import { FASTLOG1, FASTLOG4, FASTLOG6, FLog } from '../../modules/Helpers/Log';

const FFlag = GetSettings(Group.FFlag);
const FSettings = <string[]>GetSettings(Group.FSettings);

export default {
	dir: '/clientsettings/v1/get-flags',
	method: 'all',
	func: (request, response): void => {
		const DFFlag = GetSettings(Group.DFFlag);
		if (!DFFlag['IsClientSettingsAPIEnabled']) {
			FASTLOG4(FLog['ClientSettingsAPIV1'], 'The service is disabled currently.', true);
			return response.status(503).send({
				code: 503,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});
		}

		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });

		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
			FASTLOG6(FLog['ClientSettingsAPIV1'], 'HTTPS was not given where it was required.', true);
			return response.status(403).send({ success: false, message: 'HTTPS Required.' });
		}

		if (request.method !== 'GET') {
			FASTLOG6(FLog['ClientSettingsAPIV1'], `${request.method} is not supported`);
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support http method '${request.method}'.`,
			});
		}

		if (!request.query['settingsGroup']) {
			FASTLOG6(FLog['ClientSettingsAPIV1'], 'settingsGroup did not exist on the request.', true);
			return response.status(400).send({ success: false, message: 'settingsGroup was not supplied' });
		}

		let found = false;
		FSettings.forEach((v) => {
			if (v === request.query['settingsGroup']) {
				found = true;
			}
		});
		if (!found) {
			FASTLOG4(FLog['ClientSettingsAPIV1'], `The settingsGroup matching ${request.query['settingsGroup']} was not found.`, true);
			return response.status(404).send({
				success: false,
				message: 'settingsGroup not found.',
				userfacingmessage: `The settingsGroup matching ${request.query['settingsGroup']} was not found.`,
			});
		}
		FASTLOG1(FLog['ClientSettingsAPIV1'], `Successfully got settings for ${request.query['settingsGroup']}`, true);
		return response.status(200).send(JSON.stringify(GetSettings(Group.All, request.query['settingsGroup'])));
	},
};
