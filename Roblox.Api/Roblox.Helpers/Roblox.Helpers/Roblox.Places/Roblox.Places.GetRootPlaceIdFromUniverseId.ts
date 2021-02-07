import { _dirname } from '../../Roblox.Constants/Roblox.Directories';
import filestream from 'fs';

export const GetRootPlaceIdFromUniverseId = (universeId: number): [boolean, number | null] => {
	const universePath = _dirname + '\\Roblox.Manifest\\universes\\' + universeId;
	if (!filestream.statSync(universePath).isDirectory()) {
		return [false, null];
	}
	const universe = JSON.parse(filestream.readFileSync(universePath + '\\PLACE.json', 'utf-8'));
	if (universe instanceof Object && universe['rootPlaceId'] !== undefined) {
		return [true, universe['rootPlaceId']];
	}
	return [false, null];
};
