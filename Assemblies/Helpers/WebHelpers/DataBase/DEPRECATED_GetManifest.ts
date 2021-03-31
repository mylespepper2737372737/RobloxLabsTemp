import filestream from 'fs';
import { __baseDirName } from '../../Constants/Directories';

export type userType = { password: string; username: string; sessionIds: string[]; userId: string };

export const GetManifests = () => {
	const map = filestream.readdirSync(__baseDirName + '\\DataBase\\users');
	const users = new Map<string, userType>();
	map.forEach((v) => {
		const user = filestream.readFileSync(__baseDirName + '\\DataBase\\users\\' + v, { encoding: 'utf-8' });
		users.set(v.split('.').shift(), JSON.parse(user));
	});
	return users;
};
