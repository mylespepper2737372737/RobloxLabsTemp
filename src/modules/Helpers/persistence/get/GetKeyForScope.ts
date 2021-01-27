import { _dirname } from '../../../constants/directories';
import createIfDoesNotExist from '../set/InitializeUniverse';
import getScope from './GetScopeForPersistentStore';
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

export = (
	universeId: number,
	storeName: string,
	scopeName: string,
	keyName: string,
	isSorted: boolean = false,
): Promise<[boolean, KeyType | null]> => {
	return new Promise<[boolean, KeyType | null]>(async (resumefunction) => {
		const dir = _dirname + '\\manifest\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			createIfDoesNotExist(universeId);
			return resumefunction([false, null]);
		}
		const [success, scope] = await getScope(universeId, storeName.replace('sorted_', ''), scopeName, isSorted);
		let key = null;
		if (success && scope !== null) {
			scope.keys.forEach((k) => {
				if (k.keyName === keyName) key = k;
			});
		}
		if (scope === null) {
			return resumefunction([false, null]);
		}
		return resumefunction([true, key]);
	});
};
