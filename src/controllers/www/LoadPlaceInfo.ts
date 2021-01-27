import crypto from 'crypto';
import fs from 'fs';
import { _dirname } from '../../modules/constants/directories';
export default {
	dir: '/Game/LoadPlaceInfo.ashx',
	method: 'all',
	func: (_req: unknown, res: { send: (arg0: string) => void }): void => {
		const txt = fs.readFileSync(_dirname + '\\rbx\\PlaceInfo.lua', 'utf-8');
		const sign = crypto.createSign('sha1');
		const dick = '\r\n' + txt;
		sign.write(dick);
		sign.end();

		const key = fs.readFileSync(_dirname + '\\rbx\\PrivateKey.pem');
		const sig = sign.sign(key, 'base64');

		const out = `--rbxsig%${sig}%${dick}`;

		res.send(out);
	},
};
