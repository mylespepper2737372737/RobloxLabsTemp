import { _dirname } from '../../../constants/directories';
import createIfDoesNotExist from '../set/InitializeUniverse';
import createStoreIfDoesNotExist from '../set/CreatePersistentStore';
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

export = (universeId: number, storeName: string, isSorted: boolean = false): Promise<[boolean, StoreType | null]> => {
	return new Promise<[boolean, StoreType | null]>((resumefunction) => {
		const dir = _dirname + '\\manifest\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			if (!createIfDoesNotExist(universeId)) return resumefunction([false, null]);
		}
		const persistentstorepath = dir + '\\stores\\' + (isSorted ? 'sorted_' + storeName : storeName);
		if (!filestream.existsSync) {
			createStoreIfDoesNotExist(universeId, storeName, 'u', isSorted); // init a GetGlobalDataStore store here
		}
		const store = <Record<string, unknown>>JSON.parse(filestream.readFileSync(persistentstorepath + '\\STORE.json', 'utf-8'));
		const returnData = <StoreType>{
			storeName: store['storeName'],
			type: store['type'],
			universe: store['universe'],
			scopeCount: store['scopes'],
			created: store['created'],
			lastUpdated: store['lastUpdated'],
			scopes: [],
		};
		const scopes: ScopeType[] = [];
		filestream.readdirSync(persistentstorepath + '\\scopes\\').forEach((v) => {
			if (filestream.statSync(persistentstorepath + '\\scopes\\' + v).isDirectory()) {
				const name = persistentstorepath + '\\scopes\\' + v;
				const scope = <Record<string, unknown>>JSON.parse(filestream.readFileSync(name + '\\SCOPE.json', 'utf-8'));
				const keys: KeyType[] = [];
				const keysPath = name + (isSorted ? '\\entries\\' : '\\keys\\');
				filestream.readdirSync(keysPath).forEach((k) => {
					if (filestream.statSync(keysPath + k).isDirectory()) {
						const keyname = keysPath + k;
						const key = <Record<string, unknown>>(
							JSON.parse(filestream.readFileSync(keyname + (isSorted ? '\\ENTRY.json' : '\\KEY.json'), 'utf-8'))
						);
						const value = <Record<string, unknown>>JSON.parse(filestream.readFileSync(keyname + '\\VALUE.json', 'utf-8'));
						const versions = <{ version: number; date: string }[]>(
							JSON.parse(filestream.readFileSync(keyname + (isSorted ? '\\ENTRY' : '\\KEY') + 'VERSIONS.json', 'utf-8'))
						);
						const KeyToPush = <KeyType>{
							keyName: key['keyName'],
							scope: key['scope'],
							store: key['store'],
							universe: key['universe'],
							version: key['version'],
							created: key['created'],
							lastUpdated: key['lastUpdated'],
							value: {
								raw: value['value'],
								type: value['type'],
							},
							versions: [],
						};
						versions.forEach((v) => {
							KeyToPush['versions'].push(v);
						});
						keys.push(KeyToPush);
					}
				});
				scopes.push(<ScopeType>{
					scopeName: scope['scopeName'],
					store: scope['store'],
					universe: scope['universe'],
					keysCount: scope['keys'],
					created: scope['created'],
					lastUpdated: scope['lastUpdated'],
					keys: keys,
				});
			}
		});
		returnData['scopes'] = scopes;
		return resumefunction([true, returnData]);
	});
};
