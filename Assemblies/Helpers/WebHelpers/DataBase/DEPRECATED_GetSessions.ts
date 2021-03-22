import filestream from 'fs';
import { _dirname } from '../../Constants/Directories';

type captchaSessionType = { subject: string; time: number; answer: string; token: string };

export const GetSessions = () => {
	const map = filestream.readdirSync(_dirname + '\\DataBase\\sessions');
	const sessions = new Map<string, captchaSessionType>();
	map.forEach((v) => {
		const session = filestream.readFileSync(_dirname + '\\DataBase\\sessions\\' + v, { encoding: 'utf-8' });
		sessions.set(v.split('.').shift(), JSON.parse(session));
	});
	return sessions;
};
