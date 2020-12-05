/*
	FileName: controllers/www/Login.ts
	Written By: Nikita Nicholaevich Pedko - nikita-mfd - Server Vulnerabilities.
	File Type: Module
	Description: The current Login function.
			
	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

	TODO Finish function, then continue on sessions.
	TODO Simplify this.

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
import dotenv from 'dotenv';
import filestream from 'fs';
import crypto from 'crypto';
const _dirname = 'C:\\Users\\Padraig\\Git\\Mfd\\Web\\mfdlabs.com';
dotenv.config({ path: _dirname + '\\.env' });
export default {
	dir: '/Authorization/Login.fxhx',
	method: 'All',
	func: (request: Request, response: Response): Response<unknown, number> => {
		if (request.method === 'OPTIONS') return response.status(200).send({ code: 200, message: '' });
		if (request.protocol !== 'https') return response.status(403).send({ code: 403, message: 'HTTPS Required.' });
		if (request.method !== 'POST')
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support http method '${request.method}.'`,
				userfacingmessage: 'Something went wrong.',
			});
		if (request.protocol !== 'https') return response.status(403).send({ code: 403, message: 'HTTPS Required.' });
		const settings = JSON.parse(filestream.readFileSync(_dirname + '\\global\\settings.json', 'ascii'));
		if (settings['isXsrfEnabled']) {
			console.log(request.headers);

			if (
				!request.headers['x-csrf-token'] ||
				request.headers['x-csrf-token'] === '' ||
				(settings['isXsrfHardcoded'] && request.headers['x-csrf-token'] !== process.env['xsrf'])
			) {
				response.statusMessage = 'Token Validation Failed.';
				if (settings['isXsrfHardcoded'])
					return response
						.status(403)
						.header({
							'access-control-expose-headers': 'X-CSRF-TOKEN, API-TRANSFER',
							'x-csrf-token': process.env['xsrf'],
							'api-transfer': 'Expose-Hardcoded-Session-Token#433',
						})
						.send({ success: false, message: 'Token Validation Failed' });
				return response.status(403).send({ success: false, message: 'Token Validation Failed' });
			}
		}
		const registeredUsers = filestream.readFileSync(_dirname + '\\manifest\\users.json', 'ascii');
		const sessions = filestream.readdirSync(_dirname + '\\manifest\\sessions');
		let isValidUser = false;
		const parsedUsers = JSON.parse(registeredUsers);
		if (JSON.stringify(request.body) === '{}') return response.status(400).send({ success: false, message: 'No body was provided.' });
		if (request.body && request.headers['content-type'] !== 'application/x-www-form-urlencoded')
			return response.status(400).send({
				success: false,
				message: `The Content-Type ${request.headers['content-type']} is not supported.`,
			});
		if (!request.body['cvalue'] || !request.body['password'])
			return response.status(400).send({
				success: false,
				message: 'The body provided was invalid.',
				userfacingmessage: 'The provided credentials were invalid.',
			});

		if (settings['isNewCaptchaEnabled']) {
			console.log({
				alg: 'sha512',
				type: 'mfdJWT',
				sub: request.ip,
				iat: Math.floor(new Date(Date.now()).getTime() / 1000),
			});
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
				.update(JSON.stringify({ sub: request.ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) }))
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

			const __captchaSession = `${header}\_${body}\_${signature}`;
			console.log(__captchaSession);
			if (request.body['captchaToken']) {
				if ((request.body['captchaToken'] as string).split('|')[0]) {
					let isCaptchaSessionValid = false;
					for (const v of sessions) {
						const sessionId = v.split('.').shift();
						if (sessionId !== (request.body['captchaToken'] as string).split('|')[0]) continue;
						else {
							isCaptchaSessionValid = true;
							break;
						}
					}
					if (isCaptchaSessionValid) {
						try {
							filestream.unlinkSync(
								_dirname + `\\manifest\\sessions\\${(request.body['captchaToken'] as string).split('|')[0]}.json`,
							);
						} catch {
							console.warn('Session dead');
						}
						// try {
						// 	JSON.parse(
						// 		filestream.readFileSync(
						// 			_dirname +
						// 				`\\manifest\\sessions\\${
						// 					(request.body['captchaToken'] as string).split('|')[0]
						// 				}.json`,
						// 			{ encoding: 'ascii' },
						// 		),
						// 	);
						// } catch {}
						return response.sendStatus(200);
					} else {
						filestream.writeFileSync(
							_dirname + `\\manifest\\sessions\\${__captchaSession}.json`,
							JSON.stringify({ sub: request.ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) }),
							{ encoding: 'ascii' },
						);
						setTimeout(() => {
							try {
								filestream.unlinkSync(_dirname + `\\manifest\\sessions\\${__captchaSession}.json`);
							} catch {
								console.warn('The session is already clear');
							}
						}, 60000);
						response.statusMessage = 'Captcha failed';
						return response.status(403).header({ expires: 60000 }).send({
							success: false,
							message: 'You need to pass the robot test first.',
							captchaSessionId: __captchaSession,
							expires: 60000,
						});
					}
				} else {
					filestream.writeFileSync(
						_dirname + `\\manifest\\sessions\\${__captchaSession}.json`,
						JSON.stringify({ sub: request.ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) }),
						{ encoding: 'ascii' },
					);
					setTimeout(() => {
						try {
							filestream.unlinkSync(_dirname + `\\manifest\\sessions\\${__captchaSession}.json`);
						} catch {
							console.warn('The session is already clear');
						}
					}, 60000);
					response.statusMessage = 'Captcha failed';
					return response.status(403).header({ expires: 60000 }).send({
						success: false,
						message: 'You need to pass the robot test first.',
						captchaSessionId: __captchaSession,
						expires: 60000,
					});
				}
			} else {
				filestream.writeFileSync(
					_dirname + `\\manifest\\sessions\\${__captchaSession}.json`,
					JSON.stringify({ sub: request.ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) }),
					{ encoding: 'ascii' },
				);
				setTimeout(() => {
					try {
						filestream.unlinkSync(_dirname + `\\manifest\\sessions\\${__captchaSession}.json`);
					} catch {
						console.warn('The session is already clear');
					}
				}, 60000);
				response.statusMessage = 'Captcha failed';
				return response.status(403).header({ expires: 60000 }).send({
					success: false,
					message: 'You need to pass the robot test first.',
					captchaSessionId: __captchaSession,
					expires: 60000,
				});
			}
		}
		for (const userId of Object.keys(parsedUsers)) {
			if (parsedUsers[userId] !== request.body['cvalue']) continue;
			else {
				isValidUser = true;
				break;
			}
		}
		if (isValidUser === false)
			return response.status(404).send({
				success: false,
				message: 'User not found.',
				userfacingmessage: 'Incorrect username or password.',
			});
		response.shouldKeepAlive = false;
		response.sendStatus(200);
	},
};
