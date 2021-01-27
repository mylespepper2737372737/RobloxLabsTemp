/*
	FileName: Visit.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://assetgame.mfdlabs.com/game/Visit.ashx

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

	***

	Copyright 2015-2020 MFD

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
import { _dirname } from '../../modules/constants/directories';
import fs from 'fs';

export default {
	dir: '/Game/Visit.ashx',
	method: 'all',
	func: async (_req, res) => {
		const str = fs.readFileSync(_dirname + '\\rbx\\visit.lua', 'utf-8');
		const sign = crypto.createSign('sha1');
		const dick = '\r\n' + str;
		sign.write(dick);
		sign.end();

		const key = fs.readFileSync(_dirname + '\\rbx\\PrivateKey.pem');
		const sig = sign.sign(key, 'base64');

		const out = `--rbxsig%${sig}%${dick}`;

		res.send(out);
	},
};
