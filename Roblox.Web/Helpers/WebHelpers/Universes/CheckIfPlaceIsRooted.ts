import { _dirname } from '../../Constants/Directories';
import { CheckIfPlaceExists } from './CheckIfPlaceExists';
import { GetPlaceFromId } from './GetPlaceFromId';

export const CheckIfPlaceIsRooted = (placeId: number): boolean => {
	if (!CheckIfPlaceExists(placeId)) return false;
	const [success, place] = GetPlaceFromId(placeId);
	if (!success) return false;
	if (place.universeRootPlaceId !== placeId) return false;
	return true;
};
