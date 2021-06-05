/*
	FileName: ws.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Wrapper for WS servers and WSS servers, used as a helper.

	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

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

import mapwss from '../../Util/Roblox.Web.Util/Setup/Implementation/MapWebsockets';
import { __baseDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';
import { Server as httpserver } from 'http';
import { Server as httpsServer } from 'https';

export const SignalRSetup = async (httpserver: httpserver, httpsServer: httpsServer, dir: string, apiName: string) => {
	await mapwss(httpserver, httpsServer, {
		path: __baseDirName + dir,
		shouldHandleUpgrade: true,
		apiName: apiName,
		logSetups: true,
	});
};
