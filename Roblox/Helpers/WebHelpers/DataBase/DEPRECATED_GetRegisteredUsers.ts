import filestream from 'fs';
import { _dirname } from '../../Constants/Directories';

export const GetRegisteredUsers = () => {
	const registeredUsers = filestream.readFileSync(_dirname + '\\Manifest\\users.json', 'ascii');
	return JSON.parse(registeredUsers);
};
