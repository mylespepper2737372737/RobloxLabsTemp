import filestream from 'fs';
import { __baseDirName } from '../../../Util/Directories';

export const GetRegisteredUsers = () => {
	const registeredUsers = filestream.readFileSync(__baseDirName + '\\DataBase\\users.json', 'ascii');
	return JSON.parse(registeredUsers);
};
