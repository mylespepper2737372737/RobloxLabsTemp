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

export const GetScopeForPersistentStore = (
	universeId: number,
	storeName: string,
	scopeName: string,
	isSorted: boolean = false,
): Promise<[boolean, ScopeType | null]> => {
	return new Promise<[boolean, ScopeType | null]>(async (resumefunction) => {
		const dir = _dirname + '\\Manifest\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			WriteUniverse(universeId);
			return resumefunction([false, null]);
		}
		const [success, store] = await GetPersistentStoreForUniverse(universeId, storeName.replace('sorted_', ''), scopeName, isSorted);
		let scope = null;
		if (success && store !== null) {
			store.scopes.forEach((s) => {
				if (s.scopeName === scopeName) scope = s;
			});
		}
		if (store === null) {
			return resumefunction([false, null]);
		}
		return resumefunction([true, scope]);
	});
};
