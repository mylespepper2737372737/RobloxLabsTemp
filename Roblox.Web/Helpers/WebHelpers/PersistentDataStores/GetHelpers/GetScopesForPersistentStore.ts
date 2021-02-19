import { _dirname } from '../../../Constants/Directories';
import { WriteUniverse } from '../SetHelpers/PushUniverseToDB';
import { PushPersistentStoreToUniverse } from '../SetHelpers/PushPersistentStoreToUniverse';
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

/**
 * Get all scopes for the given store name.
 * @param universeId The UniverseId to fetch from.
 * @param name The Name of the Store to fetch from.
 * @param isSorted Is the store you're trying to push to a SortedDataStore.
 * @yields Yields until operation is complete.
 * @returns Promise<[boolean, ScopeType[] | null]>
 */
export const GetScopesForPersistentStore = (
	universeId: number,
	name: string,
	isSorted: boolean = false,
): Promise<[boolean, ScopeType[] | null]> => {
	return new Promise<[boolean, ScopeType[] | null]>(async (resumefunction) => {
		const dir = _dirname + '\\Manifest\\persistence\\' + universeId + '\\stores\\' + name;
		const dir1 = _dirname + '\\Manifest\\persistence\\' + universeId;
		if (!filestream.existsSync(dir1)) {
			if (WriteUniverse(universeId)) return resumefunction([true, null]);
			return resumefunction([false, null]);
		}
		if (!filestream.existsSync(dir)) {
			if (PushPersistentStoreToUniverse(universeId, name, 'global', isSorted)) return resumefunction([true, null]);
			return resumefunction([false, null]);
		}
		let scopes = [];
		const [success, store] = await GetPersistentStoreForUniverse(universeId, name, undefined, isSorted);
		if (success && store !== null) {
			scopes = store.scopes;
		}

		return resumefunction([true, scopes]);
	});
};
