/*
	FileName: report-stats.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://assetgame.sitetest4.robloxlabs.com/game/report-stats, An endpoint used to report api statistics

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

import { FASTLOG2 } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

export default {
	method: 'all',
	func: (_req, res): void => {
		res.setHeader('Access-Control-Allow-Origin', _req.headers['origin'] || 'https://www.sitetest4.robloxlabs.com');
		FASTLOG2('Stats', JSON.stringify(_req.query), true);
		FASTLOG2('Stats', _req.body instanceof Object ? JSON.stringify(_req.body) : _req.body, true);
		res.send({ success: true, message: '' });
	},
};
