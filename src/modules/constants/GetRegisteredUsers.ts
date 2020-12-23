import filestream from 'fs';
import { _dirname } from './directories';

export = () => {
	const registeredUsers = filestream.readFileSync(_dirname + '\\manifest\\users.json', 'ascii');
	return JSON.parse(registeredUsers);
};
