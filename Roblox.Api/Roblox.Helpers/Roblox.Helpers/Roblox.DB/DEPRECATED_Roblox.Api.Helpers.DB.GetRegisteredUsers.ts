import filestream from 'fs';
import { _dirname } from '../../Roblox.Constants/Roblox.Directories';

export const GetRegisteredUsers = () => {
	const registeredUsers = filestream.readFileSync(_dirname + '\\Roblox.Manifest\\users.json', 'ascii');
	return JSON.parse(registeredUsers);
};
