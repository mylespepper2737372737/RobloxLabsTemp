import { __baseDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';
import filestream from 'fs';

export const GetRootPlaceIdFromUniverseId = (universeId: number): [boolean, number | null] => {
	const universePath = __baseDirName + '\\DataBase\\universes\\' + universeId;
	if (!filestream.existsSync(universePath) || !filestream.statSync(universePath).isDirectory()) {
		return [false, null];
	}
	const universe = JSON.parse(filestream.readFileSync(universePath + '\\UNIVERSE.json', 'utf-8'));
	if (universe instanceof Object && universe['rootPlaceId'] !== undefined) {
		return [true, universe['rootPlaceId']];
	}
	return [false, null];
};
