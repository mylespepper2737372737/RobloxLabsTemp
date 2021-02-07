import { _dirname } from '../../Roblox.Constants/Roblox.Directories';
import filestream from 'fs';

export const CheckIfPlaceExists = (placeId: number): boolean => {
	const placePath = _dirname + '\\Roblox.Manifest\\places\\' + placeId;
	if (!filestream.existsSync(placePath)) {
		return false;
	}
	return true;
};
