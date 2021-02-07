/*
	FileName: RequestAuth.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: http://api.sitetest4.robloxlabs.com/Login/RequestAuth.ashx, Returns a negotiate.ashx.

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

export default {
	method: 'all',
	func: (_req: any, res: { send: (arg0: string) => void }): void => {
		res.send('http://api.sitetest4.robloxlabs.com/Login/Negotiate.ashx');
	},
};
