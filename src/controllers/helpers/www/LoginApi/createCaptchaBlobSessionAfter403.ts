/*
	FileName: createCaptchaBlobSessionAfter403.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Creates a random sha512 hash with client signing

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

import filestream from 'fs';
import { Response } from 'express-serve-static-core';
import { _dirname } from '../../../../modules/constants/directories';
import { GetSettings, Group } from '../../../../modules/Helpers/GetSettings';

const FInt = GetSettings(Group.FInt);

export = (response: Response, captchaBLOB: string, ip: string) => {
	const dataToRefer = { sub: ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) };
	filestream.writeFileSync(_dirname + `\\manifest\\sessions\\${captchaBLOB}.json`, JSON.stringify(dataToRefer), { encoding: 'ascii' });
	setTimeout(() => {
		try {
			filestream.unlinkSync(_dirname + `\\manifest\\sessions\\${captchaBLOB}.json`);
		} catch {
			console.warn('The session is already clear');
		}
	}, FInt['CaptchaV2Timeout']);
	response.statusMessage = 'Captcha failed';
	return response.status(403).header({ expires: FInt['CaptchaV2Timeout'] }).send({
		success: false,
		message: 'You need to pass the robot test first.',
		blob: captchaBLOB,
		expires: FInt['CaptchaV2Timeout'],
	});
};
