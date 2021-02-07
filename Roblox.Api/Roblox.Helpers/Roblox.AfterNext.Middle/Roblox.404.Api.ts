/*
	FileName: api.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: api 404 middleware

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

export default (
	req: { method: string; hostname: string; url: string; headers: { [x: string]: string } },
	res: {
		status: (
			arg0: number,
		) => {
			(): any;
			new (): any;
			send: { (arg0: { code: number; message: string; userfacingmessage: string }): any; new (): any };
		};
	},
) => {
	return res.status(req.method === 'OPTIONS' ? 200 : 404).send({
		code: 404,
		message: 'http://' + escape(req.hostname) + escape(req.url) + ' NotFound.',
		userfacingmessage:
			'404 Not Found, the endpoint (http://' +
			escape(req.hostname) +
			escape(req.url) +
			') that you requested from ' +
			escape(req.headers['origin']) +
			' is invalid, please contact a developer or check status on http://www.sitetest4.robloxlabs.com/status.ashx',
	});
};
