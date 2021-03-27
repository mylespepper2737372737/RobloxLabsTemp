/*
	FileName: getV2.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: NoOpt endpoints for DataPeristence, get key

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
import { RobloxLegacy } from '../../../../Api';

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
		const [success, universeId] = RobloxLegacy.Api.Helpers.Helpers.Places.GetUniverseIdFromPlaceId(placeId === NaN ? -1 : placeId);
		if (!success)
			return res.status(403).send({
				errors: [
					{
						code: 0,
						message: 'Not allowed',
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

		let k = req.body['qkeys[0].target'];
		let scope = req.body['qkeys[0].scope'];
		const store = req.body['qkeys[0].key'];
		if (!req.body['qkeys[0].scope']) {
			if (req.query['scope']) {
				scope = <string>req.query['scope'];
			}
		}
		if (scope === '') scope = '_';
		if (!req.body['qkeys[0].key'] && req.body['qkeys[0].target']) {
			k = req.body['qkeys[0].target'];
		}
		if (req.body['qkeys[0].key'] && !req.body['qkeys[0].target']) {
			k = req.body['qkeys[0].target'];
		}
		const [success2, key] = await RobloxLegacy.Api.Helpers.Helpers.PersistentDataStores.GetHelpers.GetKeyOrEntryForScope(
			universeId,
			store,
			scope,
			k,
			req.query['type'] === 'standard' ? false : true,
		);
		if (!success2)
			return res.status(500).send({
				errors: [
					{
						code: 0,
						message: 'InternalServerError',
					},
				],
			});
		if (key === null) {
			return res.status(200).send({
				data: [],
			});
		} else {
			if (key.scope === '_') key.scope = '';
			return res.status(200).send({
				data: [
					{
						Key: {
							Target: key.keyName,
							Scope: key.scope,
							Key: key.store,
						},
						Value: key.value.raw.toString(),
					},
				],
			});
		}
	},
};
