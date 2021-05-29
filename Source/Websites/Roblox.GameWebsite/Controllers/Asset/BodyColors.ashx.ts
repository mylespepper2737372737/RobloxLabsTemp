/*
	FileName: BodyColors.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://asssetgame.sitetest4.robloxlabs.com/Asset/BodyColors.ashx, Gets a xml body colors object based on userId

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

import { Request, Response } from 'express';
import { ApiKeys } from '../../../../Assemblies/Common/Client/Roblox.Common.Client/Api/ApiKeys';
import { BaseURL } from '../../../../Assemblies/Common/Client/Roblox.Common.Client/BaseUrl';
import { __baseDirName } from '../../../../Assemblies/Common/Constants/Roblox.Common.Constants/Directories';
import { FetchKeyFromObjectCaseInsensitive } from '../../../../Assemblies/Common/KeyValueMapping/Roblox.Common.KeyValueMapping/FetchKeyFromObjectCaseInsensitive';
import { HttpRequestMethodEnum } from '../../../../Assemblies/Http/ServiceClient/Roblox.Http.ServiceClient/Enumeration/HttpRequestMethodEnum';
import { ServiceClient } from '../../../../Assemblies/Http/ServiceClient/Roblox.Http.ServiceClient/Implementation/HttpClient';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		const Url = BaseURL.ConstructServicePathFromHostSimple('api.roblox.com', 'v1.1/avatar-fetch', true);
		const Client = new ServiceClient.HttpClient({
			Url: Url,
			QueryString: {
				ApiKey: ApiKeys.TestApi,
				userId: FetchKeyFromObjectCaseInsensitive<long>(request.query, 'UserID'),
			},
			AdditionalHeaders: { 'Content-Type': 'application/json' },
			Payload: null,
			Method: HttpRequestMethodEnum.GET,
			FailedMessage: `Error fetching the character for ${FetchKeyFromObjectCaseInsensitive<long>(request.query, 'UserID')}`,
		});
		const [s1, Response] = await Client.ExecuteAsync();

		if (!s1)
			return response.render('Game/BodyColors', {
				bodyColors: {
					HeadColor: 1004,
					LeftArmColor: 1004,
					LeftLegColor: 1004,
					RightArmColor: 1004,
					RightLegColor: 1004,
					TorsoColor: 1004,
				},
			});

		return response.render('Game/BodyColors', { bodyColors: Response.ResponsePayload.bodyColors });
	},
};
