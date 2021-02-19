import { _dirname } from '../../../Constants/Directories';
import { WriteUniverse } from '../SetHelpers/PushUniverseToDB';
import { GetPersistentStoreForUniverse } from './GetPersistentStoreForUniverse';
import filestream from 'fs';

type VersionType = {
	version: number;
	date: string;
};

type KeyType = {
	keyName: string;
	scope: string;
	store: string;
	universe: number;
	version: number;
	root: string;
	created: string;
	lastUpdated: string;
	value: {
		raw: unknown;
		type: string;
	};
	versions?: VersionType[];
};

type ScopeType = {
	scopeName: string;
	store: string;
	universe: number;
	keysCount: number;
	root: string;
	created: string;
	lastUpdated: string;
	keys?: KeyType[];
};

type StoreType = {
	storeName: string;
	type: string;
	universe: number;
	scopeCount: number;
	root: string;
	created: string;
	lastUpdated: string;
	scopes?: ScopeType[];
};
/**
 * Get all stores for the given UniverseId
 * @param universeId The UniverseId to fetch from.
 * @yields Yields until operation is complete.
 * @returns Promise<[boolean, StoreType[] | null]>
 */
export const GetPersistentStoresForUniverse = (universeId: number): Promise<[boolean, StoreType[] | null]> => {
	return new Promise<[boolean, StoreType[] | null]>((resumefunction) => {
		const dir = _dirname + '\\Manifest\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			if (WriteUniverse(universeId)) return resumefunction([true, null]);
			return resumefunction([false, null]);
		}
		const storesdir = dir + '\\stores\\';
		const stores = [];
		filestream.readdirSync(storesdir).forEach(async (b) => {
			if (filestream.statSync(storesdir + b).isDirectory()) {
				const [success, store] = await GetPersistentStoreForUniverse(
					universeId,
					b.replace('sorted_', ''),
					undefined,
					b.startsWith('sorted_') ? true : false,
				);
				if (success && store !== null) {
					stores.push(store);
				}
			}
		});
		return resumefunction([true, stores]);
	});
};
