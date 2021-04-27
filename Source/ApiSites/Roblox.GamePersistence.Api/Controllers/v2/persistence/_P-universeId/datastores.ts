/*
	FileName: datastores.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: DataStoreV2 API, Fetch DataStores for a given 'universeId'

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/
import { Request, Response } from 'express-serve-static-core';
import {
	DFFlag,
	DFInt,
	DFLog,
	DYNAMIC_FASTFLAGVARIABLE,
	DYNAMIC_FASTINTVARIABLE,
	DYNAMIC_LOGVARIABLE,
	FASTLOG,
	FASTLOG1,
} from '../../../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { Pages } from '../../../../../../Assemblies/Caching/Pagination/Roblox.Caching.Pagination/PaginationCache';
import { GetRootPlaceIdFromUniverseId } from '../../../../../../Assemblies/Caching/Universes/Roblox.Caching.Universes/GetRootPlaceIdFromUniverseId';
import { GetPersistentStoresForUniverse } from '../../../../../../Assemblies/Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/GetPersistentStoresForUniverse';
import { IDataStoreRespose } from '../../../../../../Assemblies/Platform/GamePersistence/Roblox.Platform.GamePersistence/Models/IDataStoreRespose';
import Base64 from 'crypto-js/enc-base64';
import Crypto from 'crypto-js';
import { MethodValidator } from '../../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/MethodValidator';
import { GetValueFromCookieString } from '../../../../../../Assemblies/Common/KeyValueMapping/Roblox.Common.KeyValueMapping/GetValueFromCookieString';
import { User } from '../../../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/User';
import { ICustomError } from '../../../../../../Assemblies/Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { Errors } from '../../../../../../Assemblies/Web/Util/Roblox.Web.Util/Errors';
import { InputValidator } from '../../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/InputValidator';
import { ClientSettings } from '../../../../../../Assemblies/Platform/ClientSettings/Roblox.Platform.ClientSettings/Implementation/ClientSettingsUtil';

// IDataStoreRespose[] Roblox.Web.GamePersistence.GamePersistenceRequestProcessor.GetDataStoresForTheUniverse(IDataStoreRequest request)
// Request example:
/*
 
# Get all the datastores for the universe
GET /v2/persistence/<UNIVERSEIDGOESHERE>/datastores?prefix=<PREFIXGOESHERE>&maxItemsToReturn=<PAGESIZEGOESHERE>&exclusiveStartKey=<PAGECURSORGOESHERE> HTTP/1.1
Host: gamepersistence.sitetest4.robloxlabs.com
Cookie: <SECURITYTOKENGOESHERE>
Roblox-Place-Id: <PLACEIDGOESHERE>

# Response

HTTP/1.1 200 OK
content-type: application/json; charset=utf-8

{
  "datastores": [
    {
      "name": "<DATASTORENAMEGOESHERE>",
      "createdTime": "<ISOCREATEDTIMEGOESHERE>",
      "updatedTime": "<ISOLASTUPDATEDTIMEGOESHERE>",
      "versioningEnabled": <% Roblox.ClientSettings.IsFeatureEnabled("DataStoreVersioning", "WebST4") %>
    }
  ],
  "lastReturnedKey": <PAGECURSORGOESHERE>
}
 */

/*
{
	"dataStores": IDataStoreRespose[],
	"lastReturnedKey": String,
}
*/

/* 
For the DataStore team:

If the maxItemsToReturn is 0, then it will return the first 50 DataStores found on DB74
If the prefix is null or empty, then it will return all stores without any filtering
The page cursor will be based on the universeId in the given request, eg. beta_<LASTRETURNEDDATASTORENAMEGOESHERE>_s+<SOMEBASE64KEY>
After 20 minutes, or server retart, the page will be purged and a new page will be supplied.

*/

DYNAMIC_LOGVARIABLE('DataStoresV2', 7); // FIXME Development thing here, change to 0 for prod

DYNAMIC_FASTFLAGVARIABLE('DataStoresV2EnabledForTheWorld', false);
DYNAMIC_FASTFLAGVARIABLE('AllowNoUserForDataStore', false);

DYNAMIC_FASTINTVARIABLE('DataStoreV2RolloutPercentage', 0);
DYNAMIC_FASTINTVARIABLE('DataStoreApiRefreshRolloutPercentage', 0);

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		const errors: ICustomError[] = [];

		/*Start check for request method*/
		if (!MethodValidator.CheckMethod(request.method, 'GET', response)) return;
		/*End check for request method*/

		/*Start check for request security token*/
		const cookie = GetValueFromCookieString('.ROBLOSECURITY', request.headers.cookie || '');
		/*End check for request security token*/

		/*Start check for request security token validity*/
		const user = await User.GetByCookie(cookie);
		if (!user && !DFFlag('AllowNoUserForDataStore')) {
			errors.push({
				code: 0,
				message: 'You do not have permission to manage this place. User is null.',
			});
			return Errors.RespondWithCustomErrors(403, errors, response, true);
		}
		/*End check for request security token validity*/

		/*Start check for Universe Id*/
		const universeId = parseInt(request.params['universeId']);
		if (InputValidator.CheckDoesNumberStringIncludeAlphaChars(universeId)) {
			FASTLOG(DFLog('DataStoresV2'), '[DFLog::DataStoresV2] We got an Null universe, god damn');

			errors.push({
				code: 0,
				message: 'The request is invalid.',
			});

			return Errors.RespondWithCustomErrors(400, errors, response, true);
		}
		/*End check for Universe Id*/

		/*Start check for place ownership/permissions*/
		/*End check for place ownership/permissions*/

		/*Start check for Rollout flag and percentage*/
		if (!DFFlag('DataStoresV2EnabledForTheWorld') && DFInt('DataStoreV2RolloutPercentage') < 100) {
			// It's not released yet. Check if the universe is valid.
			let [success, PlaceId] = GetRootPlaceIdFromUniverseId(universeId);
			if (!success || PlaceId === null) {
				if (DFFlag('AllowNullPlaceForDataStoreTesting')) {
					PlaceId = 1;
				} else {
					FASTLOG(DFLog('DataStoresV2'), '[DFLog::DataStoresV2] We got an Null place, that means the universe did not exist');
					return response.status(403).send({
						errors: [
							{
								code: 26,
								message: 'The universe is not allowed to access the endpoint.',
								retryable: DFInt('DataStoreApiRefreshRolloutPercentage') >= 100,
							},
						],
					});
				}
			}

			if (!ClientSettings.GetPlaceIdInPlaceFilter('DataStoresV2Enabled', PlaceId, 'ClientAppSettings')) {
				FASTLOG1(DFLog('DataStoresV2'), '[DFLog::DataStoresV2] The place %d was not in the filter, bruh', PlaceId);
				return response.status(403).send({
					errors: [
						{
							code: 26,
							message: 'The universe is not allowed to access the endpoint.',
							retryable: DFInt('DataStoreApiRefreshRolloutPercentage') >= 100,
						},
					],
				});
			}
		}
		/*End check for Rollout flag and percentage*/

		/*Start Query Parsing*/
		let PageLength = <number>parseInt(<string>request.query['maxItemsToReturn']);
		const DataStorePrefix = request.query['prefix'] || '';
		const PageCursor = <String>request.query.PageCursor || '';
		const exclusiveStartKey = <String>request.query['exclusiveStartKey'] || '';
		/*End Query Parsing*/

		/*Start Cursor*/
		let Cursor = Pages.GetPageCursorByKey(`${universeId}_${PageCursor.split('+').join('+').split('=').join('_').split('/').join('-')}`);
		if (Cursor.length === 0) {
			Cursor = Base64.stringify(Crypto.MD5(universeId.toString()));
			Pages.SetPageByKey(`${universeId}_${Cursor.split('+').join('+').split('=').join('_').split('/').join('-')}`, Cursor);
		}
		/*End Cursor*/

		/*Start Variables*/
		let DataStores: IDataStoreRespose[] = [];
		let lastReturnedKey = '';
		let CanPush = true;
		let c = '';
		/*End Variables*/

		// TODO Make this happen on gamepersistence.api.sitetest4.robloxlabs.com
		/*Start Stores*/
		let [Success, Stores] = await GetPersistentStoresForUniverse(universeId);
		if (!Stores) Stores = [];
		Stores.sort();
		if (Success && Stores) {
			Stores.forEach((store, storeNumber) => {
				if (!isNaN(<number>PageLength) && PageLength > 0 && storeNumber >= <number>PageLength) {
					CanPush = false;
					if (exclusiveStartKey && exclusiveStartKey.replace(' ', '+') === c) {
						CanPush = true;
						DataStores = [];
						PageLength += PageLength;
					}
					lastReturnedKey = c;
					return;
				}
				if (DataStorePrefix !== null && DataStorePrefix.length !== 0) {
					if (store.storeName.startsWith(<string>DataStorePrefix)) {
						if (CanPush)
							DataStores.push({
								Name: store.storeName,
								CreatedTime: store.created,
								UpdatedTime: store.lastUpdated,
								VersioningEnabled: DFFlag('DataStoreVersioning'),
							});
						c = `beta_${store.storeName}_s+${Cursor}`;
						return;
					}
				}
				if (CanPush)
					DataStores.push({
						Name: store.storeName,
						CreatedTime: store.created,
						UpdatedTime: store.lastUpdated,
						VersioningEnabled: DFFlag('DataStoreVersioning'),
					});
				c = `beta_${store.storeName}_s+${Cursor}`;
			});
		}
		/*End Stores*/
		response.send({ datastores: DataStores.sort(), lastReturnedKey: lastReturnedKey, data: DataStores.sort() });
	},
};
