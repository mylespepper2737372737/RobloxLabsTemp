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

type StoreType = {
	storeName: string;
	type: string;
	universe: number;
	scopeCount: number;
	created: string;
	lastUpdated: string;
	scopes?: ScopeType[];
};

export = (universeId: number): Promise<[boolean, StoreType[] | null]> => {
	return new Promise<[boolean, StoreType[] | null]>((resumefunction) => {
		const dir = _dirname + '\\manifest\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			if (createIfDoesNotExist(universeId)) return resumefunction([true, null]);
			return resumefunction([false, null]);
		}
		const storesdir = dir + '\\stores\\';
		const stores = [];
		filestream.readdirSync(storesdir).forEach(async (b) => {
			if (filestream.statSync(storesdir + b).isDirectory()) {
				console.log(b);
				const [success, store] = await getStore(universeId, b.replace('sorted_', ''), b.startsWith('sorted_') ? true : false);
				if (success && store !== null) {
					stores.push(store);
				}
			}
		});
		return resumefunction([true, stores]);
	});
};
