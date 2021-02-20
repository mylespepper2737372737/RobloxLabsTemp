/*
	FileName: datastores.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: DataStoreV2 API, Fetch DataStores for a given 'universeId'

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2015-2020 MFD

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

import { FASTLOG1, FASTLOG4, FASTLOG6 } from '../../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { CheckIfPlaceExists } from '../../../../../Helpers/WebHelpers/Universes/CheckIfPlaceExists';
import { GetPlaceFromId } from '../../../../../Helpers/WebHelpers/Universes/GetPlaceFromId';
import { GetPersistentStoresForUniverse } from '../../../../../Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetPersistentStoresForUniverse';

import { Request, Response } from 'express-serve-static-core';
import { ClientSettings, Group } from '../../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.ClientSettings';
import Crypto from 'crypto';

export default {
	method: 'all',
	func: async (req: Request, res: Response) => {
		FASTLOG1('DataStoreV2', JSON.stringify(req.query), true);
		FASTLOG1('DataStoreV2', JSON.stringify(req.body), true);
		FASTLOG1('DataStoreV2', JSON.stringify(req.params), true);
		const DFInt = ClientSettings.GetSettings(Group.DFInt, 'Client');
		const DFFlag = ClientSettings.GetSettings(Group.DFFlag, 'Client');
		let pageSize = parseInt(<string>req.query['maxItemsToReturn']);
		const prefix = <string>req.query['prefix'] || '';
		if (!pageSize) pageSize = 1;
		// let universeId = parseInt(req.params['universeId']);
		// if (universeId === NaN) universeId = -1;
		let placeId = parseInt(<string>req.headers['roblox-place-id']);
		if (!placeId && placeId !== 0) placeId = -1;

		if (placeId === -1) {
			if (!DFFlag['DataStoresV2AllowNegativePlacesForStudio']) {
				FASTLOG4('DataStoreV2', `The placeId was NaN or -1`, true);
				return res.status(403).send({
					errors: [
						{
							code: 0,
							message: 'Not allowed',
						},
					],
				});
			}
		}
		if (!CheckIfPlaceExists(placeId) && !DFFlag['DataStoresV2AllowNegativePlacesForStudio']) {
			if (req.cookies['.ROBLOSECURITY']) {
				FASTLOG4('DataStoreV2', `The placeId (${placeId}) didn't exist, and an auth token was present.`, true);
				return res.status(403).send({
					errors: [
						{
							code: 0,
							message: 'You do not have permission to manage this place. Universe is null.', // My ass, we're not even checking universe
						},
					],
				});
			}
			FASTLOG4('DataStoreV2', `The placeId (${placeId}) didn't exist, and no auth token was present.`, true);
			return res.status(403).send({
				errors: [
					{
						code: 0,
						message: 'Not allowed',
					},
				],
			});
		}
		if (DFFlag['DataStoreV2MaxItemsToReturnShould403OnBadNumber']) {
			if (pageSize < 1) {
				FASTLOG4('DataStoreV2', `The pageSize was less than 1, try snap back to 1.`, true);
				return res.status(403).send({
					errors: [
						{
							code: 0,
							message: 'Not allowed',
						},
					],
				});
			}

			if (pageSize > DFInt['DataStoreMaxPageSize']) {
				FASTLOG4('DataStoreV2', `The pageSize was greater than DataStoreMaxPageSize (${DFInt['DataStoreMaxPageSize']})`, true);
				return res.status(403).send({
					errors: [
						{
							code: 0,
							message: 'Not allowed',
						},
					],
				});
			}
		}

		if (!ClientSettings.GetPlaceIdInPlaceFilter('DataStoresV2Enabled', placeId, 'Client')) {
			FASTLOG4('DataStoreV2', `The placeId (${placeId}) was not in FPFilterDataStoresV2Enabled`, true);
			return res.status(403).send({
				errors: [
					{
						code: 26,
						message: 'The universe is not allowed to access the endpoint.',
						retryable: false,
					},
				],
			});
		}

		const [successForPlace, place] = GetPlaceFromId(placeId);
		if (!successForPlace) {
			FASTLOG6('DataStoreV2', `An error occured when fetching the place, no info available.`, true);
			return res.status(500).send({
				error: 'InternalServerError',
			});
		}

		const responsStores = [];
		let keyCount = 0;
		const [success, stores] = await GetPersistentStoresForUniverse(place.universeId);

		let hasCursor = false;
		if (success && stores !== null) {
			const storeCount = stores.length;
			let count = 0;
			stores.forEach((v) => {
				if (count === pageSize) {
					if (count < storeCount) {
						hasCursor = true;
					}
					return;
				}
				v.scopes.forEach((s) => {
					keyCount += s.keysCount;
				});
				if (DFFlag['DataStoresV2GetDataStoresAdminResponse']) {
					if (prefix.length > 0) {
						if (v.storeName.startsWith(prefix)) {
							responsStores.push({
								storeName: v.storeName,
								type: v.type,
								universe: v.universe,
								scopes: v.scopeCount,
								keys: keyCount,
								created: Math.round(new Date(v.created).getTime()),
								lastUpdated: v.lastUpdated ? Math.round(new Date(v.lastUpdated).getTime()) : null,
							});
							count++;
						}
					} else {
						responsStores.push({
							storeName: v.storeName,
							type: v.type,
							universe: v.universe,
							scopes: v.scopeCount,
							keys: keyCount,
							created: Math.round(new Date(v.created).getTime()),
							lastUpdated: v.lastUpdated ? Math.round(new Date(v.lastUpdated).getTime()) : null,
						});
						count++;
					}
				} else {
					if (prefix.length > 0) {
						if (v.storeName.startsWith(prefix)) {
							responsStores.push({
								storeName: v.storeName,
								created: Math.round(new Date(v.created).getTime()),
								lastUpdated: v.lastUpdated ? Math.round(new Date(v.lastUpdated).getTime()) : null,
							});
							count++;
						}
					} else {
						responsStores.push({
							storeName: v.storeName,
							created: Math.round(new Date(v.created).getTime()),
							lastUpdated: v.lastUpdated ? Math.round(new Date(v.lastUpdated).getTime()) : null,
						});
						count++;
					}
				}
			});
		}
		res.status(200).send({
			data: {
				DataStores: responsStores,
				Cursor: hasCursor ? 'u_' + Crypto.createHash('sha1').update(Crypto.randomBytes(1000)).digest('hex') : null,
			},
		});
	},
};
