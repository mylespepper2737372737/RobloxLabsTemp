// Decompiled C# into Typescript
// Roblox.PeristentDataStoreTests.cs - 2011
// 5c74a525-e97a-4d61-8b5d-7163ca85b629

import { WriteUniverse } from '../Helpers/WebHelpers/PersistentDataStores/SetHelpers/PushUniverseToDB';
import { PushPersistentStoreToUniverse } from '../Helpers/WebHelpers/PersistentDataStores/SetHelpers/PushPersistentStoreToUniverse';
import { PushKeyToPersistentStore } from '../Helpers/WebHelpers/PersistentDataStores/SetHelpers/PushKeyToPersistentStore';
// import { GetPersistentStoresForUniverse } from '../Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetPersistentStoresForUniverse';
// import { GetScopesForPersistentStore } from '../Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetScopesForPersistentStore';
// import { GetKeysOrEntriesForScope } from '../Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetKeysOrEntriesForScope';
// import { GetPersistentStoreForUniverse } from '../Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetPersistentStoreForUniverse';
// import { GetScopeForPersistentStore } from '../Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetScopeForPersistentStore';
// import { GetKeyOrEntryForScope } from '../Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetKeyOrEntryForScope';
// import { PurgeKeyFromScope } from '../Helpers/WebHelpers/PersistentDataStores/PurgeHelpers/PurgeKeyFromScope';
// import { PurgeScopeFromPersistentStore } from '../Helpers/WebHelpers/PersistentDataStores/PurgeHelpers/PurgeScopeFromPersistentStore';
// import { PurgeUniversePersistentStore } from '../Helpers/WebHelpers/PersistentDataStores/PurgeHelpers/PurgeUniversePersistentStore';
// import { PurgeUniverse } from '../Helpers/WebHelpers/PersistentDataStores/PurgeHelpers/PurgeUniverse';

// 2342098878

(async () => {
	// // Universe
	// await WriteUniverse(1); // init universe - bool InitializeUniverse(int64 universeId) - Will return true if exists

	// // Persistent DataStore
	// await PushPersistentStoreToUniverse(1, 'storeTest', 'global', false); // Push a store to universe
	// await PushKeyToPersistentStore(1, 'storeTest', 'global', 'keyTest', 'testValue', false); // push a key
	// await PushKeyToPersistentStore(1, 'storeTest', 'global', 'key2', 'test2', false); // new key
	// await PushKeyToPersistentStore(1, 'storeTest', 'global', 'key2', 'key updated!', false); // update key

	// await PushPersistentStoreToUniverse(2, 'orderedstoretest', 'global', true);
	// await PushKeyToPersistentStore(2, 'orderedstoretest', 'global', 'key1', 1, true); // allowed
	// await PushKeyToPersistentStore(2, 'orderedstoretest', 'global', 'key2', '1', true); // allowed
	// await PushKeyToPersistentStore(2, 'orderedstoretest', 'global', 'key3', '0x1', true); // allowed
	// await PushKeyToPersistentStore(2, 'orderedstoretest', 'global', 'key4', 'badvalue', true); // forbidden, should not throw, but will respond with false

	// await PushPersistentStoreToUniverse(2, 'storeTest', 'customScope', false); // custom scope, should not conflict with global
	// await PushKeyToPersistentStore(2, 'storeTest', 'customScope', 'keyTest', 'testValue', false); // push a key
	// await PushKeyToPersistentStore(2, 'storeTest', 'customScope', 'key2', 'test2', false); // new key
	// await PushKeyToPersistentStore(2, 'storeTest', 'customScope', 'key2', 'key updated!', false); // update key

	// await PushPersistentStoreToUniverse(2, 'orderedstoretest', 'customScope', true); // should not conflict with global
	// await PushKeyToPersistentStore(2, 'orderedstoretest', 'customScope', 'key1', 1, true); // allowed
	// await PushKeyToPersistentStore(2, 'orderedstoretest', 'customScope', 'key2', '1', true); // allowed
	// await PushKeyToPersistentStore(2, 'orderedstoretest', 'customScope', 'key3', '0x1', true); // allowed
	// await PushKeyToPersistentStore(2, 'orderedstoretest', 'customScope', 'key4', 'badvalue', true); // forbidden, should not throw, but will respond with false

	// await WriteUniverse(3); // init another universe
	// await PushPersistentStoreToUniverse(3, 'storeTest', 'global', false); // add a store - bool CreatePersistentStore(int64 universeId, std::string name, std::string scope, bool isSorted = false)
	// await PushKeyToPersistentStore(3, 'storeTest', 'global', 'keyTest', 'testValue', false); // push a key
	// await PushKeyToPersistentStore(3, 'storeTest', 'global', 'key2', 'test2', false); // new key
	// await PushKeyToPersistentStore(3, 'storeTest', 'global', 'key2', 'key updated!', false); // update key

	// const [success, stores] = await GetPersistentStoresForUniverse(2);
	// if (success && stores !== null) {
	// 	console.log(stores);
	// }
	// const [success2, store] = await GetPersistentStoreForUniverse(2, 'storeTest', 'global', false);
	// if (success2 && store !== null) {
	// 	console.log(store);
	// }
	// const [success3, scope] = await GetScopeForPersistentStore(2, 'storeTest', 'global', false);
	// if (success3 && scope !== null) {
	// 	console.log(scope);
	// }
	// const [success4, key] = await GetKeyOrEntryForScope(2, 'storeTest', 'global', 'key2', false);
	// if (success4 && key !== null) {
	// 	console.log(key);
	// }
	// const [success5, scopes] = await GetScopesForPersistentStore(2, 'storeTest', false);
	// if (success5 && scopes !== null) {
	// 	console.log(scopes);
	// }
	// const [success6, keys] = await GetKeysOrEntriesForScope(2, 'storeTest', 'global', false);
	// if (success6 && keys !== null) {
	// 	console.log(keys);
	// }

	// await WriteUniverse(4); // init universe - bool InitializeUniverse(int64 universeId) - Will return true if exists
	// await PushPersistentStoreToUniverse(4, 'storeTest', 'global', false); // add a store - bool CreatePersistentStore(int64 universeId, std::string name, std::string scope, bool isSorted = false)
	// await PushKeyToPersistentStore(4, 'storeTest', 'global', 'keyPurgeTest', 'testValue', false); // push a key
	// await PurgeKeyFromScope(4, 'storeTest', 'global', 'keyPurgeTest', false);
	// await PushPersistentStoreToUniverse(4, 'storeTest', 'scopePurgeTest', false);
	// await PurgeScopeFromPersistentStore(4, 'storeTest', 'scopePurgeTest', false);
	// await PushPersistentStoreToUniverse(4, 'storePurgeTest', 'global', false);
	// await PurgeUniversePersistentStore(4, 'storePurgeTest', false);
	// await WriteUniverse(5);
	// await PurgeUniverse(5);

	/*Init universe*/
	await WriteUniverse(2342098878);

	/*Stores*/
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore10', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore10', 'testScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore1', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore1', 'sike', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore1', 'testScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore2', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore2', 'testScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore3', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore3', 'testScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore4', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore4', 'testScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore5', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore5', 'testScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore6', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore6', 'testScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore7', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore7', 'testScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore8', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore8', 'testScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore9', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore9', 'testScopes', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore9', 'coolScopes', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStoreNumber', '12345', false);

	await PushPersistentStoreToUniverse(2342098878, 'mydataStore', 'global', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore', 'testScopes', false);
	await PushPersistentStoreToUniverse(2342098878, 'mydataStore', 'coolScope', false);

	await PushPersistentStoreToUniverse(2342098878, 'store', 'scope', false);

	/*Keys*/
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore10',
		'global',
		'Test210',
		'Hi! It is maybe a good idea to have it check permissions for the universe!\n\n- Some guy on the internet',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore10',
		'testScopes',
		'Test210',
		'Although this is a test place, there is no excuse for it!!!',
		false,
	);

	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore1',
		'global',
		'Test21',
		JSON.stringify({
			errors: [
				{
					code: 11,
					message: 'The requested key does not exist.',
					retryable: false,
				},
			],
		}),
		false,
	);
	await PushKeyToPersistentStore(2342098878, 'mydataStore1', 'sike', 'Test21', 7, false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore1', 'testScopes', 'Test21', '"This is test data for datastore 1"', false);

	await PushKeyToPersistentStore(2342098878, 'mydataStore2', 'global', 'Test22', '"This is test data for datastore 2"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore2', 'testScopes', 'Test22', '"This is test data for datastore 2"', false);

	await PushKeyToPersistentStore(2342098878, 'mydataStore3', 'global', 'Test23', '"This is test data for datastore 3"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore3', 'testScopes', 'Test23', '"This is test data for datastore 3"', false);

	await PushKeyToPersistentStore(2342098878, 'mydataStore4', 'global', 'Test24', '"This is test data for datastore 4"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore4', 'testScopes', 'Test24', '"This is test data for datastore 4"', false);

	await PushKeyToPersistentStore(2342098878, 'mydataStore5', 'global', 'Test25', '"This is test data for datastore 5"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore5', 'testScopes', 'Test25', '"This is test data for datastore 5"', false);

	await PushKeyToPersistentStore(2342098878, 'mydataStore6', 'global', 'Test26', '"This is test data for datastore 6"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore6', 'testScopes', 'Test26', '"This is test data for datastore 6"', false);

	await PushKeyToPersistentStore(2342098878, 'mydataStore7', 'global', 'Test27', '"This is test data for datastore 7"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore7', 'testScopes', 'Test27', '"This is test data for datastore 7"', false);

	await PushKeyToPersistentStore(2342098878, 'mydataStore8', 'global', 'Test28', '"This is test data for datastore 8"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore8', 'testScopes', 'Test28', '"This is test data for datastore 8"', false);

	await PushKeyToPersistentStore(2342098878, 'mydataStore9', 'global', 'Test29', '"This is test data for datastore 9"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore9', 'testScopes', 'Test29', '"This is test data for datastore 9"', false);

	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'coolScope', 'ok', 3, false);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'0868bd5c-4e62-4c1e-9262-29aa7815f347',
		'"This is test data for datastore 9"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'12839f06-6d0b-42e2-b965-cb37e060b7cd',
		'"This is test data for getVersion"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'1D51BBE1-749C-476A-84E3-260043CF2877',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'2b2beb23-4b22-40fb-a90c-9bf1b0a71aff',
		'"This is test data value only"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'2ebabb03-2960-4061-a604-838808267156',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'362E0802-C3E0-499E-BE0A-87B4939462D9',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'3ff0a5a9-71ef-48bb-9c61-dfc1f785f9bb',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'5169be93-7ee9-4c39-bed3-c9f76ca3d3db',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'532085D7-9BF4-4CEB-8642-84B7F1661EA8',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'5EC8E110-F20E-4AD0-81A9-2D3273A290A3',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'88D58577-F984-48C7-866A-60EECAA64423',
		'"This is test data value only"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'89E2F668-FD7C-4A6B-8540-77DCCDAB0116',
		'"This is test data value only"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'9294719F-9C8D-4E17-8C49-8E1F73BA3F1F',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'96a103e3-8e76-47ba-bf9b-4b0d2e756dfb',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'AC14ACB0-6186-43CA-AE6C-68D09AE8D081',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'B2564530-0733-4399-853E-832BD8CADEDD',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'C36EF718-267A-4D26-A935-EC9EE696A2AF',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'CB439A3C-F951-4041-96E5-C8E7DF311EA9',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'D66A11F2-35A3-4FEC-B09B-C8C630F5480C',
		'"This is test data value only"',
		false,
	);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test2', '"This is updated data latest version"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test21', '"This is test data 1"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test210', '"This is test data 10"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test22', '"This is test data 2"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test24', '"This is test data 4"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test25', '"This is test data 5"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test26', '"This is test data 6"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test27', '"This is test data 7"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test28', '"This is test data 8"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test29', '"This is test data 9"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'Test300', 256, false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'TestInc', 90, false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'TestInc2', 9, false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'TestNoMetadata', '"TestNoUserIds"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'TestNoUserIds', '"This is test data for datastore 9"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'global', 'TestScopes', '"This is test data for datastore 9"', false);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'ba3247cc-642f-4ebe-88c4-b0da12c6ee1d',
		'"This is test data for getVersion"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'c7fee19e-4727-4182-9eb7-05a04536e4ab',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(
		2342098878,
		'mydataStore',
		'global',
		'cb0aa514-525a-4b00-8125-d73d3a9633dd',
		'"This is test data"',
		false,
	);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test2', '"This is test data"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test21', '"This is test data 1"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test210', '"This is test data 10"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test22', '"This is test data 2"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test23', '"This is test data 3"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test24', '"This is test data 4"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test25', '"This is test data 5"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test26', '"This is test data 6"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test27', '"This is test data 8"', false);
	await PushKeyToPersistentStore(2342098878, 'mydataStore', 'testScopes', 'Test28', '"This is test data 9"', false);

	await PushKeyToPersistentStore(2342098878, 'store', 'scope', 'joe', 25, false);
})();
