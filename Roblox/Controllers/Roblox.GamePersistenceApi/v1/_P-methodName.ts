/*
	FileName: datastores.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: DataStoreV2 API, Fetch DataStores for a given 'universeId'

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
import { Request, Response } from 'express-serve-static-core';
import { FASTLOG1 } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

export default {
	method: 'all',
	func: async (req: Request, res: Response) => {
		FASTLOG1('DataStore', JSON.stringify(req.query), true);
		FASTLOG1('DataStore', JSON.stringify(req.body), true);
		FASTLOG1('DataStore', JSON.stringify(req.params), true);
	},
};
