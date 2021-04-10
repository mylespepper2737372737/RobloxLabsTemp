import { __baseDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';
import filestream from 'fs';

export const GetUniverseIdFromPlaceId = (placeId: number): [boolean, number | null] => {
	const placePath = __baseDirName + '\\DataBase\\places\\' + placeId + '\\';
	if (!filestream.existsSync(placePath)) {
		return [false, null];
	}
	if (!filestream.statSync(placePath).isDirectory()) {
		return [false, null];
	}
	const place = JSON.parse(filestream.readFileSync(placePath + 'PLACE.json', 'utf-8'));
	if (place instanceof Object && place['universeId'] !== undefined) {
		return [true, place['universeId']];
	}
	return [false, null];
};
