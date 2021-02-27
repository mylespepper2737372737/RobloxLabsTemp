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
import { Roblox } from '../../../Api';

export default {
	method: 'all',
	func: async (req: Request, res: Response) => {
		let usequery = false;
		if (req.headers['roblox-place-id'] === undefined) {
			usequery = true;
		}
		if (!usequery) {
			if (parseInt(<string>req.headers['roblox-place-id']) === NaN)
				return res.status(403).send({
					errors: [
						{
							code: 0,
							message: 'Not allowed',
						},
					],
				});
		}
		const placeId = parseInt(!usequery ? <string>req.headers['roblox-place-id'] : <string>req.query['placeId']);
		const [success, universeId] = Roblox.Api.Helpers.Helpers.Places.GetUniverseIdFromPlaceId(placeId === NaN ? -1 : placeId);
		if (!success)
			return res.status(403).send({
				errors: [
					{
						code: 0,
						message: 'You do not have permission to manage this place. Universe is null.',
					},
				],
			});

		if (universeId === null)
			return res.status(403).send({
				errors: [
					{
						code: 0,
						message: 'You do not have permission to manage this place. Universe is null.',
					},
				],
			});

		const k = <string>req.query['target'];
		let scope = <string>req.query['scope'];
		const store = <string>req.query['key'];
		if (<string>req.query['type'] !== 'standard')
			if (<string>req.query['type'] !== 'sorted')
				return res.status(400).send({
					errors: [
						{
							code: 0,
							message: 'The request is invalid.',
						},
					],
				});

		const [, key] = await Roblox.Api.Helpers.Helpers.PersistentDataStores.GetHelpers.GetKeyOrEntryForScope(
			universeId,
			store,
			scope,
			k,
			req.query['type'] === 'standard' ? false : true,
		);
		if (key === null) {
			return res.status(200).send({
				data: null,
			});
		}
		const value = key.value.raw;

		if (scope === '') scope = '_';
		const success2 = await Roblox.Api.Helpers.Helpers.PersistentDataStores.PurgeHelpers.PurgeKeyFromScope(
			universeId,
			store,
			scope,
			k,
			req.query['type'] === 'standard' ? false : true,
		);
		if (!success2)
			return res.status(200).send({
				error: 'Unknown error',
			});

		if (!success2)
			return res.status(500).send({
				errors: [
					{
						code: 0,
						message: 'InternalServerError',
					},
				],
			});

		return res.status(200).send({
			data: value.toString(),
		});
	},
};
