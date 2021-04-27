/*
	FileName: remove.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: NoOpt endpoints for DataPeristence, romove key

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
import { GetUniverseIdFromPlaceId } from '../../../../Assemblies/Caching/Universes/Roblox.Caching.Universes/GetUniverseIdFromPlaceId';
import { GetKeyOrEntryForScope } from '../../../../Assemblies/Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/GetKeyOrEntryForScope';
import { PurgeKeyFromScope } from '../../../../Assemblies/Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/PurgeKeyFromScope';

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

		const [, key] = await GetKeyOrEntryForScope(universeId, store, scope, k, request.query['type'] === 'standard' ? false : true);
		if (key === null) {
			return response.status(200).send({
				data: null,
			});
		}
		const value = key.value.raw;

		if (scope === '') scope = '_';
		const success2 = await PurgeKeyFromScope(universeId, store, scope, k, request.query['type'] === 'standard' ? false : true);
		if (!success2)
			return response.status(200).send({
				error: 'Unknown error',
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
