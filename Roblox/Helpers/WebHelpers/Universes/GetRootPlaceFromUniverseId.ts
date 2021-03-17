import { _dirname } from '../../Constants/Directories';
import filestream from 'fs';

type PlaceType = {
	placeId: number;
	name: string;
	description: string;
	url: string;
	builder: string;
	builderId: number;
	isPlayable: boolean;
	reasonProhibited: string;
	universeId: number;
	universeRootPlaceId: number;
	price: number;
	imageToken: string;
};

export const GetRootPlaceFromUniverseId = (universeId: number): [boolean, PlaceType | null] => {
	const universePath = _dirname + '\\DataBase\\universes\\' + universeId;
	if (!filestream.statSync(universePath).isDirectory()) {
		return [false, null];
	}
	const universe = JSON.parse(filestream.readFileSync(universePath + '\\UNIVERSE.json', 'utf-8'));
	if (universe instanceof Object && universe['rootPlaceId'] !== undefined) {
		const placePath = _dirname + '\\DataBase\\places\\' + universe['rootPlaceId'];
		if (!filestream.statSync(placePath).isDirectory()) {
			return [false, null];
		}
		const place = JSON.parse(filestream.readFileSync(placePath + '\\PLACE.json', 'utf-8'));
		return [true, place];
	}
	return [false, null];
};
