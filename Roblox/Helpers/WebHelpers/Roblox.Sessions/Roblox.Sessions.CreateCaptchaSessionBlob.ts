/*
	FileName: createCaptchaSessionBlob.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Creates a random sha512 hash with client signing

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

import crypto from 'crypto';

export const CreateCaptchaSessionBlob = (ip: string) => {
	const header = crypto
		.createHash('sha256')
		.update(JSON.stringify({ alg: 'sha512', type: 'mfdJWT' }))
		.digest('base64')
		.split('/')
		.join('')
		.split('+')
		.join('')
		.split('=')
		.join('');
	const body = crypto
		.createHash('sha256')
		.update(JSON.stringify({ sub: ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) }))
		.digest('base64')
		.split('/')
		.join('')
		.split('+')
		.join('')
		.split('=')
		.join('');
	const signature = crypto
		.createHash('sha512')
		.update(header + body)
		.digest('base64')
		.split('/')
		.join('')
		.split('+')
		.join('')
		.split('=')
		.join('');
	return `${header}\_${body}\_${signature}`;
};
