import filestream from 'fs';
import { _dirname } from './directories';

type userType = { password: string; username: string; authIds: string[] };

export = () => {
	const map = filestream.readdirSync(_dirname + '\\manifest\\sessions');
	const sessions = new Map<string, userType>();
	map.forEach((v) => {
		const session = filestream.readFileSync(_dirname + '\\manifest\\sessions\\' + v, { encoding: 'utf-8' });
		sessions.set(v.split('.').shift(), JSON.parse(session));
	});
	return sessions;
};
