import Crypto from 'crypto';
import filestream from 'fs';
import { _dirname } from '../../Constants/Directories';
import { ClientSettings, Group } from '../Roblox.Util/Roblox.Util.ClientSettings';

const FInt = ClientSettings.GetSettings(Group.FInt, 'Web');

export const CreateCsrfSessionFile = (id: string): string => {
	const sessionFile = `${id}.json`;
	const t = Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64');
	filestream.writeFileSync(_dirname + '\\Manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: id, token: t, c: 0 }, undefined, 4), {
		encoding: 'ascii',
	});
	let count = 0;
	const r = setInterval(() => {
		count++;
		if (!filestream.existsSync(_dirname + '\\Manifest\\csrf\\' + sessionFile)) return r.unref();
		if (count === FInt['CSRFV2MaxRefreshCount']) return r.unref();
		try {
			filestream.writeFileSync(
				_dirname + '\\Manifest\\csrf\\' + sessionFile,
				JSON.stringify(
					{ sub: id, token: Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64'), c: count },
					undefined,
					4,
				),
				{
					encoding: 'ascii',
				},
			);
		} catch {}
	}, FInt['CSRFV2Timeout']);
	return t;
};
