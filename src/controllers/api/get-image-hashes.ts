/*
	FileName: get-captcha-hashes.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://api.sitetest1.mfdlabs.com/captcha/v1/get-image-hashes,

	TODO Implement this for captcha front end

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

// TODO: Should we deprecate DFFlagIsCaptchaV1Enabled? V2 is used more.

import SetCaptchaSessionField from '../../modules/Helpers/SetCaptchaSessiontField';
import crypto from 'crypto';
import { GetCaptchaImages } from '../../modules/Helpers/GetCaptchaImages';
import GetSessions from '../../modules/Helpers/GetSessions';
import { GetSettings, Group } from '../../modules/Helpers/GetSettings';
import { Request, Response } from 'express-serve-static-core';
import filestream from 'fs';
import { _dirname } from '../../modules/constants/directories';
import DeleteCaptchaSession from '../../modules/Helpers/DeleteCaptchaSession';
import shuffleArray from '../../modules/Helpers/shuffleArray';

const FString = GetSettings(Group.FString);
const FInt = GetSettings(Group.FInt);
const FFlag = GetSettings(Group.FFlag);

export default {
	dir: '/captcha/v1/get-image-hashes',
	method: 'ALL',
	func: (request: Request, response: Response) => {
		const DFFlag = GetSettings(Group.DFFlag);
		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });
		if (!DFFlag['IsCaptchaV2Enabled'])
			return response.status(503).send({
				success: false,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});

		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
			return response.status(403).send({ success: false, message: 'HTTPS Required.' });
		if (request.method !== 'POST')
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support http method '${request.method}.'`,
				userfacingmessage: 'Something went wrong.',
			});
		if (JSON.stringify(request.body) === '{}')
			return response.status(400).send({
				success: false,
				message: 'No body was provided.',
			});
		if (request.body && request.headers['content-type'] !== 'application/x-www-form-urlencoded')
			return response.status(400).send({
				success: false,
				message: `The Content-Type ${request.headers['content-type']} is not supported.`,
			});
		if (!request.body['captchaHash'] || !request.body['captchaProvider'])
			return response.status(400).send({
				success: false,
				message: 'The body provided was invalid.',
				userfacingmessage: 'The provided credentials were invalid.',
			});
		if (request.body['captchaProvider'] !== FString['CaptchaV2CaptchaProvider'])
			return response
				.status(400)
				.header({
					'access-control-expose-headers': 'MFD-CAPTCHA-PROVIDER, API-TRANSFER',
					'mfd-captcha-provider': FString['CaptchaV2CaptchaProvider'],
					'api-transfer': 'Expose-Captcha-V2-Provider#503',
				})
				.send({ success: false, message: 'The current CAPTCHA_PROVIDER is not valid' });
		const Sessions = GetSessions();
		if (!Sessions.get(request.body['captchaHash']))
			return response.status(404).send({
				success: false,
				message: 'The captchaToken supplied is not valid.',
				userfacingmessage: 'Bad Token Request',
			});
		const imageCache = GetCaptchaImages();
		const images = [];
		const newHash = request.body['captchaHash'] + '0x0ff';
		filestream.writeFileSync(
			_dirname + `\\manifest\\sessions\\${newHash}.json`,
			JSON.stringify(Sessions.get(request.body['captchaHash'])),
			{
				encoding: 'utf-8',
			},
		);
		DeleteCaptchaSession(request.body['captchaHash']);
		setTimeout(() => {
			try {
				filestream.unlinkSync(_dirname + `\\manifest\\sessions\\${newHash}.json`);
			} catch {
				console.warn('The session is not persistent anymore.');
			}
		}, FInt['CaptchaV2TimeoutAdditionAfter200GetImageHashes']);
		imageCache.forEach((v) => {
			const hash = crypto.createHash('sha512').update(crypto.randomBytes(1000)).digest('hex');
			images.push({ imageHash: hash, imageUri: v.uri });
			if (v.correct) SetCaptchaSessionField(newHash, 'answer', hash, true, false, false, 0, false, true);
		});
		response
			.status(200)
			.contentType('application/json')
			.send({
				data: shuffleArray(images),
				captchaHash: newHash,
				expires: FInt['CaptchaV2TimeoutAdditionAfter200GetImageHashes'],
			});
	},
};
