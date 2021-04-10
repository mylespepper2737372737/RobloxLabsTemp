import filestream from 'fs';
import { __baseDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';

export const GetRegisteredUsers = () => {
	const registeredUsers = filestream.readFileSync(__baseDirName + '\\DataBase\\users.json', 'ascii');
	return JSON.parse(registeredUsers);
};
