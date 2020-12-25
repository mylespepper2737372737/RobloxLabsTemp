/*
	FileName: setup.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: setup 404 middleware

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

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

import crypto from 'crypto';

export default (
	req: { query: { apiKey: string }; method: string; url: string },
	res: {
		status: (
			arg0: number,
		) => {
			(): any;
			new (): any;
			contentType: {
				(arg0: string): { (): any; new (): any; send: { (arg0: string): any; new (): any } };
				new (): any;
			};
			send: { (arg0: { env: NodeJS.ProcessEnv }): void; new (): any };
		};
		statusMessage: string;
	},
) => {
	if (!req.query.apiKey)
		return res
			.status(req.method === 'OPTIONS' ? 200 : 403)
			.contentType('text/xml')
			.send(
				`<Error><Code>AccessDenied</Code><Message>Access to ${
					'https://setup.sitetest1.mfdlabs.com' + req.url
				} has been denied.</Message><HostId>${crypto
					.createHash('sha256')
					.update(crypto.randomBytes(1000))
					.digest('base64')}</HostId></Error>`,
			);
	if (req.query.apiKey !== process.env['API_KEY'])
		return res
			.status(req.method === 'OPTIONS' ? 200 : 403)
			.contentType('text/xml')
			.send(
				`<Error><Code>AccessDenied</Code><Message>Access to ${
					'https://setup.sitetest1.mfdlabs.com' + req.url
				} has been denied.</Message><HostId>${crypto
					.createHash('sha256')
					.update(crypto.randomBytes(1000))
					.digest('base64')}</HostId></Error>`,
			);
	res.statusMessage = 'Verified';
	res.status(200).send({ env: process.env });
};
