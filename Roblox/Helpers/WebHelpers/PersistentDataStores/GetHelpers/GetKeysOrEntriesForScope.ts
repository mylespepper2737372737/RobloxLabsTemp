import { _dirname } from '../../../Constants/Directories';
import { WriteUniverse } from '../SetHelpers/PushUniverseToDB';
import { PushPersistentStoreToUniverse } from '../SetHelpers/PushPersistentStoreToUniverse';
import { GetScopeForPersistentStore } from './GetScopeForPersistentStore';
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

/**
 * Get the Keys or Entries of the specific PersistentDataStore scope.
 * @param universeId The UniverseId to fetch from.
 * @param name The StoreName to fetch from.
 * @param scope The ScopeName to fetch from.
 * @param isSorted Is the store you're trying to push to a SortedDataStore.
 * @yields Yields until operation is complete.
 * @returns Promise<[boolean, KeyType[] | null]>
 */
export const GetKeysOrEntriesForScope = (
	universeId: number,
	name: string,
	scope: string = 'global',
	isSorted: boolean = false,
): Promise<[boolean, KeyType[] | null]> => {
	return new Promise<[boolean, KeyType[] | null]>(async (resumefunction) => {
		const dir1 = _dirname + '\\DataBase\\persistence\\' + universeId;
		const dir2 = _dirname + '\\DataBase\\persistence\\' + universeId + '\\stores\\' + name + '\\scopes\\' + scope;
		if (!filestream.existsSync(dir1)) {
			if (WriteUniverse(universeId)) return resumefunction([true, null]);
			return resumefunction([false, null]);
		}
		if (!filestream.existsSync(dir2)) {
			if (PushPersistentStoreToUniverse(universeId, name, scope, isSorted)) return resumefunction([true, null]);
			return resumefunction([false, null]);
		}
		let keysOrEntries = [];
		const [success, s] = await GetScopeForPersistentStore(universeId, name, scope, isSorted);
		if (success && s !== null) {
			keysOrEntries = s.keys;
		}

		return resumefunction([true, keysOrEntries]);
	});
};
