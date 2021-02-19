/*
	FileName: Increment.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Increment a single counter

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

import { FASTLOG2 } from '../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

export default {
	method: 'all',
	func: (_req: any, res: { send: (arg0: { success: boolean; message: string }) => void }): void => {
		FASTLOG2('EphemeralCounters', JSON.stringify(_req.query), true);
		FASTLOG2('EphemeralCounters', _req.body instanceof Object ? JSON.stringify(_req.body) : _req.body, true);
		res.send({ success: true, message: '' });
	},
};
