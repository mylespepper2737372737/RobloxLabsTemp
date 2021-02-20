import { _dirname } from '../../Constants/Directories';
import filestream from 'fs';

type UniverseType = {
	id: number;
	rootPlaceId: number;
	places: {
		placeId: number;
		placeName: string;
		isRoot: boolean;
	}[];
	name: string;
	description: string;
	creator: {
		id: number;
		name: string;
		type: string;
	};
	price: number | null;
	allowedGearGenres: string[];
	allowedGearCategories: string[];
	playing: number;
	visits: number;
	maxPlayers: number;
	created: string;
	updated: string;
	studioAccessToApisAllowed: boolean;
	createVipServersAllowed: boolean;
	universeAvatarType: string;
	genre: string;
	media: {
		assetTypeId: number;
		assetType: string;
		imageId: number;
		videoHash: string | null;
		videoTitle: string | null;
		approved: boolean;
	}[];
};

export const GetUniverseFromPlaceId = (placeId: number): [boolean, UniverseType | null] => {
	const placePath = _dirname + '\\Manifest\\places\\' + placeId;
	if (!filestream.statSync(placePath).isDirectory()) {
		return [false, null];
	}
	const place = JSON.parse(filestream.readFileSync(placePath + '\\PLACE.json', 'utf-8'));
	if (place instanceof Object && place['universeId'] !== undefined) {
		const universePath = _dirname + '\\Manifest\\universes\\' + place['universeId'];
		if (!filestream.statSync(universePath).isDirectory()) {
			return [false, null];
		}
		const universe = JSON.parse(filestream.readFileSync(universePath + '\\UNIVERSE.json', 'utf-8'));
		return [true, universe];
	}
	return [false, null];
};
