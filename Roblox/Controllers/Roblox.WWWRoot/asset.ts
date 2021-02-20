/*
	FileName: asset.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://www.sitetest4.robloxlabs.com/asset/, Redirects to assetdelivery

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

import dotenv from 'dotenv';
import { _dirname } from '../../Helpers/Constants/Directories';
import a from 'axios';

dotenv.config({ path: _dirname + '\\.env' });

export default {
	method: 'all',
	func: (req, res): void => {
		if (req.query.id === '1') {
			res.redirect('http://static.sitetest4.robloxlabs.com/rbx/1.rbxlx');
			return;
		}
		a.get('https://assetdelivery.roblox.com/v1' + req.url, {
			headers: { ...req.headers, host: 'www.roblox.com' },
		})
			.then((re) => {
				// const newbody = re.data.split('roblox.com').join('sitetest4.robloxlabs.com');
				const newheaders = JSON.parse(JSON.stringify(re.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));

				return res.header(newheaders).send(re.data);
			})
			.catch((e) => {
				const newheaders = JSON.parse(JSON.stringify(e.response.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));
				return res.header(newheaders).status(e.response.status).send(e.response.data);
			});
	},
};
