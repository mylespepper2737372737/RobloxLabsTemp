import { _dirname } from '../../../constants/directories';
import createIfDoesNotExist from '../set/InitializeUniverse';
import getStore from './GetPersistentStoreForUniverse';
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
	created: string;
	lastUpdated: string;
	keys?: KeyType[];
};

export = (universeId: number, storeName: string, scopeName: string, isSorted: boolean = false): Promise<[boolean, ScopeType | null]> => {
	return new Promise<[boolean, ScopeType | null]>(async (resumefunction) => {
		const dir = _dirname + '\\manifest\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			createIfDoesNotExist(universeId);
			return resumefunction([false, null]);
		}
		const [success, store] = await getStore(universeId, storeName.replace('sorted_', ''), isSorted);
		let scope = null;
		if (success && store !== null) {
			store.scopes.forEach((s) => {
				if (s.scopeName === scopeName) scope = s;
			});
		}
		if (scope === null) {
			return resumefunction([false, null]);
		}
		return resumefunction([true, scope]);
	});
};
