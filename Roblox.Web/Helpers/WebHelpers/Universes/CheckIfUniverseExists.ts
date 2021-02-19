import { _dirname } from '../../Constants/Directories';
import filestream from 'fs';

export const CheckIfUniverseExists = (universeId: number): boolean => {
	const universePath = _dirname + '\\Roblox.Moblox.Manifest\\universes\\' + universeId;
	if (!filestream.existsSync(universePath)) {
		return false;
	}
	return true;
};
