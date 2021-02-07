// Decompiled C# into Typescript
// Roblox.PeristentDataStoreTests.cs - 2011
// 5c74a525-e97a-4d61-8b5d-7163ca85b629

import { WriteUniverse } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.SetHelpers/Roblox.PersistentDataStores.SetHelpers.WriteUniverse';
import { PushPersistentStoreToUniverse } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.SetHelpers/Roblox.PersistentDataStores.SetHelpers.PushPersistentStoreToUniverse';
import { PushKeyToPersistentStore } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.SetHelpers/Roblox.PersistentDataStores.SetHelpers.PushKeyToPersistentStore';
import { GetPersistentStoresForUniverse } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetPersistentStoresForUniverse';
import { GetScopesForPersistentStore } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetScopesForPersistentStore';
import { GetKeysOrEntriesForScope } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetKeysOrEntriesForScope';
import { GetPersistentStoreForUniverse } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetPersistentStoreForUniverse';
import { GetScopeForPersistentStore } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetScopeForPersistentStore';
import { GetKeyOrEntryForScope } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetKeyOrEntryForScope';
import { PurgeKeyFromScope } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.PurgeHelpers/Roblox.PersistentDataStores.PurgeHelpers.PurgeKeyFromScope';
import { PurgeScopeFromPersistentStore } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.PurgeHelpers/Roblox.PersistentDataStores.PurgeHelpers.PurgeScopeFromPersistentStore';
import { PurgeUniversePersistentStore } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.PurgeHelpers/Roblox.PersistentDataStores.PurgeHelpers.PurgeUniversePersistentStore';
import { PurgeUniverse } from '../Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.PurgeHelpers/Roblox.PersistentDataStores.PurgeHelpers.PurgeUniverse';

(async () => {
	// Universe
	await WriteUniverse(1); // init universe - bool InitializeUniverse(int64 universeId) - Will return true if exists

	// Persistent DataStore
	await PushPersistentStoreToUniverse(1, 'storeTest', 'global', false); // Push a store to universe
	await PushKeyToPersistentStore(1, 'storeTest', 'global', 'keyTest', 'testValue', false); // push a key
	await PushKeyToPersistentStore(1, 'storeTest', 'global', 'key2', 'test2', false); // new key
	await PushKeyToPersistentStore(1, 'storeTest', 'global', 'key2', 'key updated!', false); // update key

	await PushPersistentStoreToUniverse(2, 'orderedstoretest', 'global', true);
	await PushKeyToPersistentStore(2, 'orderedstoretest', 'global', 'key1', 1, true); // allowed
	await PushKeyToPersistentStore(2, 'orderedstoretest', 'global', 'key2', '1', true); // allowed
	await PushKeyToPersistentStore(2, 'orderedstoretest', 'global', 'key3', '0x1', true); // allowed
	await PushKeyToPersistentStore(2, 'orderedstoretest', 'global', 'key4', 'badvalue', true); // forbidden, should not throw, but will respond with false

	await PushPersistentStoreToUniverse(2, 'storeTest', 'customScope', false); // custom scope, should not conflict with global
	await PushKeyToPersistentStore(2, 'storeTest', 'customScope', 'keyTest', 'testValue', false); // push a key
	await PushKeyToPersistentStore(2, 'storeTest', 'customScope', 'key2', 'test2', false); // new key
	await PushKeyToPersistentStore(2, 'storeTest', 'customScope', 'key2', 'key updated!', false); // update key

	await PushPersistentStoreToUniverse(2, 'orderedstoretest', 'customScope', true); // should not conflict with global
	await PushKeyToPersistentStore(2, 'orderedstoretest', 'customScope', 'key1', 1, true); // allowed
	await PushKeyToPersistentStore(2, 'orderedstoretest', 'customScope', 'key2', '1', true); // allowed
	await PushKeyToPersistentStore(2, 'orderedstoretest', 'customScope', 'key3', '0x1', true); // allowed
	await PushKeyToPersistentStore(2, 'orderedstoretest', 'customScope', 'key4', 'badvalue', true); // forbidden, should not throw, but will respond with false

	await WriteUniverse(3); // init another universe
	await PushPersistentStoreToUniverse(3, 'storeTest', 'global', false); // add a store - bool CreatePersistentStore(int64 universeId, std::string name, std::string scope, bool isSorted = false)
	await PushKeyToPersistentStore(3, 'storeTest', 'global', 'keyTest', 'testValue', false); // push a key
	await PushKeyToPersistentStore(3, 'storeTest', 'global', 'key2', 'test2', false); // new key
	await PushKeyToPersistentStore(3, 'storeTest', 'global', 'key2', 'key updated!', false); // update key

	const [success, stores] = await GetPersistentStoresForUniverse(2);
	if (success && stores !== null) {
		console.log(stores);
	}
	const [success2, store] = await GetPersistentStoreForUniverse(2, 'storeTest', 'global', false);
	if (success2 && store !== null) {
		console.log(store);
	}
	const [success3, scope] = await GetScopeForPersistentStore(2, 'storeTest', 'global', false);
	if (success3 && scope !== null) {
		console.log(scope);
	}
	const [success4, key] = await GetKeyOrEntryForScope(2, 'storeTest', 'global', 'key2', false);
	if (success4 && key !== null) {
		console.log(key);
	}
	const [success5, scopes] = await GetScopesForPersistentStore(2, 'storeTest', false);
	if (success5 && scopes !== null) {
		console.log(scopes);
	}
	const [success6, keys] = await GetKeysOrEntriesForScope(2, 'storeTest', 'global', false);
	if (success6 && keys !== null) {
		console.log(keys);
	}

	await WriteUniverse(4); // init universe - bool InitializeUniverse(int64 universeId) - Will return true if exists
	await PushPersistentStoreToUniverse(4, 'storeTest', 'global', false); // add a store - bool CreatePersistentStore(int64 universeId, std::string name, std::string scope, bool isSorted = false)
	await PushKeyToPersistentStore(4, 'storeTest', 'global', 'keyPurgeTest', 'testValue', false); // push a key
	await PurgeKeyFromScope(4, 'storeTest', 'global', 'keyPurgeTest', false);
	await PushPersistentStoreToUniverse(4, 'storeTest', 'scopePurgeTest', false);
	await PurgeScopeFromPersistentStore(4, 'storeTest', 'scopePurgeTest', false);
	await PushPersistentStoreToUniverse(4, 'storePurgeTest', 'global', false);
	await PurgeUniversePersistentStore(4, 'storePurgeTest', false);
	await WriteUniverse(5);
	await PurgeUniverse(5);
})();
