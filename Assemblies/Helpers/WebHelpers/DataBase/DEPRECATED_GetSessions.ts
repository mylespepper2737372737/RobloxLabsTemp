import filestream from 'fs';
import { __baseDirName } from '../../Constants/Directories';

type captchaSessionType = { subject: string; time: number; answer: string; token: string };

export const GetSessions = () => {
	const map = filestream.readdirSync(__baseDirName + '\\DataBase\\sessions');
	const sessions = new Map<string, captchaSessionType>();
	map.forEach((v) => {
		const session = filestream.readFileSync(__baseDirName + '\\DataBase\\sessions\\' + v, { encoding: 'utf-8' });
		sessions.set(v.split('.').shift(), JSON.parse(session));
	});
	return sessions;
};
