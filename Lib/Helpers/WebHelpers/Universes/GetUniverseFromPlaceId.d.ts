declare type UniverseType = {
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
export declare const GetUniverseFromPlaceId: (placeId: number) => [boolean, UniverseType | null];
export {};
