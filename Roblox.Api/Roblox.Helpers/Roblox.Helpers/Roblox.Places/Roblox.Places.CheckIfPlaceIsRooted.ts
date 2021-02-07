import { _dirname } from '../../Roblox.Constants/Roblox.Directories';
import { CheckIfPlaceExists } from './Roblox.Places.CheckIfPlaceExists';
import { GetPlaceFromId } from './Roblox.Places.GetPlaceFromId';

export const CheckIfPlaceIsRooted = (placeId: number): boolean => {
	if (!CheckIfPlaceExists(placeId)) return false;
	const [success, place] = GetPlaceFromId(placeId);
	if (!success) return false;
	if (place.universeRootPlaceId !== placeId) return false;
	return true;
};
