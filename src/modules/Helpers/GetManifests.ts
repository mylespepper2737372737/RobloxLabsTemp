import filestream from 'fs';
import { _dirname } from '../constants/directories';

export type userType = { password: string; username: string; sessionIds: string[]; userId: string };

export const GetManifests = () => {
	const map = filestream.readdirSync(_dirname + '\\manifest\\users');
	const users = new Map<string, userType>();
	map.forEach((v) => {
		const user = filestream.readFileSync(_dirname + '\\manifest\\users\\' + v, { encoding: 'utf-8' });
		users.set(v.split('.').shift(), JSON.parse(user));
	});
	return users;
};
