/*
	FileName: increment.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: NoOpt endpoints for DataPeristence, increment key

	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

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
import { GetUniverseIdFromPlaceId } from '../../../../Assemblies/Caching/Universes/Roblox.Caching.Universes/GetUniverseIdFromPlaceId';
import { GetKeyOrEntryForScope } from '../../../../Assemblies/Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/GetKeyOrEntryForScope';
import { PushKeyToPersistentStore } from '../../../../Assemblies/Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/PushKeyToPersistentStore';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		let usequery = false;
		if (request.headers['roblox-place-id'] === undefined) {
			usequery = true;
		}
		if (!usequery) {
			if (parseInt(<string>request.headers['roblox-place-id']) === NaN)
				return response.status(403).send({
					errors: [
						{
							code: 0,
							message: 'Not allowed',
						},
					],
				});
		}
		const placeId = parseInt(!usequery ? <string>request.headers['roblox-place-id'] : <string>request.query['placeId']);
		const [success, universeId] = GetUniverseIdFromPlaceId(placeId === NaN ? -1 : placeId);
		if (!success)
			return response.status(403).send({
				errors: [
					{
						code: 0,
						message: 'You do not have permission to manage this place. Universe is null.',
					},
				],
			});

		if (universeId === null)
			return response.status(403).send({
				errors: [
					{
						code: 0,
						message: 'You do not have permission to manage this place. Universe is null.',
					},
				],
			});

		const k = <string>request.query['target'];
		let scope = <string>request.query['scope'];
		const store = <string>request.query['key'];
		const delta = <string>request.query['value'];
		if (<string>request.query['type'] !== 'standard')
			if (<string>request.query['type'] !== 'sorted')
				return response.status(400).send({
					errors: [
						{
							code: 0,
							message: 'The request is invalid.',
						},
					],
				});

		if (delta === undefined || delta === '' || parseInt(delta) === NaN)
			return response.status(400).send({
				errors: [
					{
						code: 0,
						message: 'The request is invalid.',
					},
				],
			});

		const [, key] = await GetKeyOrEntryForScope(universeId, store, scope, k, request.query['type'] === 'standard' ? false : true);
		let value = 0;
		if (key === null) {
			value = parseInt(delta);
		} else {
			if (typeof key.value.raw === 'number') {
				value = key.value.raw + parseInt(delta);
			} else if (typeof key.value.raw === 'string') {
				if (parseInt(key.value.raw) !== NaN) {
					value = parseInt(key.value.raw) + parseInt(delta);
				} else {
					return response.status(409).send({
						error: "Key wasn't a number",
					});
				}
			} else {
				return response.status(409).send({
					error: "Key wasn't a number",
				});
			}
		}

		if (scope === '') scope = '_';
		const success2 = await PushKeyToPersistentStore(
			universeId,
			store,
			scope,
			k,
			value,
			request.query['type'] === 'standard' ? false : true,
		);
		if (!success2 && request.query['type'] === 'sorted')
			return response.status(200).send({
				error: 'Invalid value format for datastore type Sorted.\r\nParameter name: value',
			});

		if (!success2)
			return response.status(500).send({
				errors: [
					{
						code: 0,
						message: 'InternalServerError',
					},
				],
			});

		return response.status(200).send({
			data: value.toString(),
		});
	},
};
