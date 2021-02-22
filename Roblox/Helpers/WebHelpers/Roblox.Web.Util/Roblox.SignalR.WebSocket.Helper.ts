/*
	FileName: ws.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Wrapper for WS servers and WSS servers, used as a helper.

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

import mapwss from '../../../Global.Helpers/MapWebsockets';
import { _dirname } from '../../Constants/Directories';
import { Server as httpserver } from 'http';
import { Server as httpsServer } from 'https';

export const ROBLOX_SignalR_Config_Helper = async (httpserver: httpserver, httpsServer: httpsServer, dir: string, apiName: string) => {
	await mapwss(httpserver, httpsServer, {
		path: _dirname + dir,
		shouldHandleUpgrade: true,
		apiName: apiName,
		logSetups: true,
	});
};
