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

export const GetPlaceFromId = (placeId: number): [boolean, PlaceType | null] => {
	if (placeId === -1) placeId = 0;
	const placePath = _dirname + '\\DataBase\\places\\' + placeId;
	if (!filestream.existsSync(placePath)) return [false, null];
	if (!filestream.statSync(placePath).isDirectory()) return [false, null];
	const place = JSON.parse(filestream.readFileSync(placePath + '\\PLACE.json', 'utf-8'));
	return [true, place];
};
