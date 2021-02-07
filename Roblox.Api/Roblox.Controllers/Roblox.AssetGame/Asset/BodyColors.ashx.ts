/*
	FileName: BodyColors.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: http://asssetgame.sitetest4.robloxlabs.com/Asset/BodyColors.ashx, Gets a xml body colors object based on userId

	All commits will be made on behalf of mfd-co to http://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2015-2020 MFD

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

import fs from 'fs';
import { Roblox } from '../../../Roblox.Api';

export default {
	method: 'all',
	func: async (_req, res) => {
		const str = fs.readFileSync(
			Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\Roblox.Internal.Static\\BodyColors.xml',
			'utf-8',
		);
		return res.send(str);
	},
};
