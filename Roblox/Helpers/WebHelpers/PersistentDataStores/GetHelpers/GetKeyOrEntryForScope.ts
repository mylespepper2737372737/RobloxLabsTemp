import { _dirname } from '../../../Constants/Directories';
import { WriteUniverse } from '../SetHelpers/PushUniverseToDB';
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

//I tried to compact this as much as I could
export const GetKeyOrEntryForScope = (
	universeId: number,
	storeName: string,
	scopeName: string,
	keyName: string,
	isSorted: boolean = false,
): Promise<[boolean, KeyType | null]> => {
	return new Promise<[boolean, KeyType | null]>(async (resumefunction) => {
		const dir = _dirname + '\\Manifest\\persistence\\' + universeId;
		if (!filestream.existsSync(dir)) {
			WriteUniverse(universeId);
			return resumefunction([false, null]);
		}
		const [success, scope] = await GetScopeForPersistentStore(universeId, storeName.replace('sorted_', ''), scopeName, isSorted);
		let key = null;
		if (success && scope !== null) {
			scope.keys.forEach((k) => {
				if (k.keyName === keyName) key = k;
			});
		}
		if (key === null && success) {
			return resumefunction([true, null]);
		} else if (success === false && key === null) {
			return resumefunction([false, null]);
		}
		return resumefunction([true, key]);
	});
};
