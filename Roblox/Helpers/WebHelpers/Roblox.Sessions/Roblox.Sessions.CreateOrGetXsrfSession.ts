/*
	FileName: createOrGetXsrfSession.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://api.sitetest4.robloxlabs.com/csrf/v1/get-csrf-token,

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	Implements flags:
	DFFlagIsCSRFV2Enabled
	DFFlagIsCSRFV2Hardcoded
	DFFlagIsCSRFV2BasedOnAuthenticationId
	DFFlagIsCSRFV2BasedOnIPAddress
	DFFlagIsCSRFV2BasedOnIpAddressAndAuthenticationId
	FStringCSRFV2HardcodedKey
	FStringCSRFV2FailedResponseStatusText
	FIntCSRFV2Timeout

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

import { Response } from 'express-serve-static-core';
import { ClientSettings, Group } from '../Roblox.Util/Roblox.Util.ClientSettings';
import filestream from 'fs';
import { _dirname } from '../../Constants/Directories';
import { CreateCsrfSessionFile } from './Roblox.Sessions.CreateCsrfSessionFile';
import { GetCsrfSession } from './Roblox.Sessions.GetCsrfSession';
import { CheckIfAuthTokenExists } from '../Auth/CheckIfAuthTokenExists';

const FString = ClientSettings.GetSettings(Group.FString);

//Consideration that this will fuck up in some way? Like it will use AuthToken instead of IP address?
//On the check for hasFoundSession, if false, ask if isBasedOnIpAndAuthToken is true, if yes then look for IP address instead.
export const CreateOrGetXsrfSession = (
	AuthToken: string = '',
	ip: string = '',
	token: string | string[] = '',
	response?: Response,
	isXsrfEndpoint?: boolean,
): boolean | void => {
	const DFFlag = ClientSettings.GetSettings(Group.DFFlag, 'Web');

	if (!DFFlag['IsCSRFV2Enabled']) return true;
	if (DFFlag['CanCSRFV2AdminKeyBeUsed'] && token === FString['CSRFV2HardcodedKey']) return true;
	if (DFFlag['IsCSRFV2Hardcoded'] && token !== FString['CSRFV2HardcodedKey']) {
		response
			.status(isXsrfEndpoint ? 200 : 403)
			.header({
				'access-control-expose-headers': 'X-CSRF-TOKEN, API-TRANSFER',
				'x-csrf-token': FString['CSRFV2HardcodedKey'],
				'api-transfer': 'Expose-Hardcoded-Session-Token#433',
			})
			.send({ success: isXsrfEndpoint, message: 'Token Validation Failed' });
		return false;
	} else if (DFFlag['IsCSRFV2Hardcoded'] && token === FString['CSRFV2HardcodedKey']) {
		return true;
	}

	if (ip) ip = ip.split('.').join('-');

	const csrfSessions = filestream.readdirSync(_dirname + '\\Manifest\\csrf');

	let hasFoundSession = false;
	let isBasedOnIpAndAuthToken = DFFlag['IsCSRFV2BasedOnIpAddressAndAuthenticationId'];
	let sessionFile = '';

	if (!CheckIfAuthTokenExists(AuthToken)) AuthToken = undefined; // Do this to stop AuthToken checks

	csrfSessions.forEach((file) => {
		if (DFFlag['IsCSRFV2BasedOnAuthenticationId']) {
			if (file.split('.')[0] === AuthToken) {
				sessionFile = file;
				hasFoundSession = true;
				return;
			}
		} else if (DFFlag['IsCSRFV2BasedOnIPAddress']) {
			if (file.split('.')[0] === ip) {
				sessionFile = file;
				hasFoundSession = true;
				return;
			}
		} else if (DFFlag['IsCSRFV2BasedOnIpAddressAndAuthenticationId']) {
			if (ip && !AuthToken) {
				if (file.split('.')[0] === ip) {
					sessionFile = file;
					hasFoundSession = true;
					return;
				}
			} else if (AuthToken && ip) {
				if (file.split('.')[0] === AuthToken) {
					sessionFile = file;
					hasFoundSession = true;
					return;
				}
				isBasedOnIpAndAuthToken = true;
			}
		}
	});

	let hasFoundSession2 = true;

	if (!hasFoundSession) {
		if (isBasedOnIpAndAuthToken) {
			if (csrfSessions.length > 0) {
				csrfSessions.forEach((session) => {
					if (session.split('.')[0] !== ip) {
						hasFoundSession2 = false;
					} else {
						sessionFile = session;
						hasFoundSession2 = true;
						return;
					}
				});
			} else {
				hasFoundSession2 = false;
			}
		} else {
			if (ip && !AuthToken) {
				const t = CreateCsrfSessionFile(ip);
				response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
				response
					.status(isXsrfEndpoint ? 200 : 403)
					.header({
						'access-control-expose-headers': 'X-CSRF-TOKEN',
						'x-csrf-token': t,
					})
					.send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
				return false;
			} else if (ip && AuthToken) {
				const t = CreateCsrfSessionFile(AuthToken);
				response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
				response
					.status(isXsrfEndpoint ? 200 : 403)
					.header({
						'access-control-expose-headers': 'X-CSRF-TOKEN',
						'x-csrf-token': t,
					})
					.send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
				return false;
			}
		}
	}

	if (!hasFoundSession2) {
		if (ip && !AuthToken) {
			const t = CreateCsrfSessionFile(ip);
			response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
			response
				.status(isXsrfEndpoint ? 200 : 403)
				.header({
					'access-control-expose-headers': 'X-CSRF-TOKEN',
					'x-csrf-token': t,
				})
				.send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
			return false;
		} else if (ip && AuthToken) {
			const t = CreateCsrfSessionFile(AuthToken);
			response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
			response
				.status(isXsrfEndpoint ? 200 : 403)
				.header({
					'access-control-expose-headers': 'X-CSRF-TOKEN',
					'x-csrf-token': t,
				})
				.send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
			return false;
		}
	}

	if (sessionFile) {
		if (GetCsrfSession(sessionFile)['token'] !== token) {
			response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
			response
				.status(isXsrfEndpoint ? 200 : 403)
				.header({
					'access-control-expose-headers': 'X-CSRF-TOKEN',
					'x-csrf-token': GetCsrfSession(sessionFile)['token'],
				})
				.send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
			return false;
		}
		return true;
	}

	return true;
};
