import filestream from 'fs';
import { _dirname } from '../constants/directories';

type captchaSessionType = { subject: string; time: number; answer: string; token: string };

export = () => {
	const map = filestream.readdirSync(_dirname + '\\manifest\\sessions');
	const sessions = new Map<string, captchaSessionType>();
	map.forEach((v) => {
		const session = filestream.readFileSync(_dirname + '\\manifest\\sessions\\' + v, { encoding: 'utf-8' });
		sessions.set(v.split('.').shift(), JSON.parse(session));
	});
	return sessions;
};
