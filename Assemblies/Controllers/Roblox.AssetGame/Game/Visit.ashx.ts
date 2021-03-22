/*
	FileName: Visit.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://assetgame.sitetest4.robloxlabs.com/game/Visit.ashx, the Visit script that runs when playing in Studio

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the \\"License\\");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an \\"AS IS\\" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/
import crypto from 'crypto';
import { RobloxLegacy } from '../../../Api';
import fs from 'fs';

export default {
	method: 'all',
	func: async (_req, res) => {
		// TODO Refactor this to use files.api, as it uses it on C# - Nikita
		const str = fs.readFileSync(RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\InternalCDN\\visit.lua', 'utf-8');
		const sign = crypto.createSign('sha1');
		const dick = '\r\n' + str;
		sign.write(dick);
		sign.end();

		const key = fs.readFileSync(RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\InternalCDN\\PrivateKey.pem');
		const sig = sign.sign(key, 'base64');

		const out = `--rbxsig%${sig}%${dick}`;

		res.send(out);
	},
};
