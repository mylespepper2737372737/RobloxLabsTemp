/*
	FileName: set.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: NoOpt endpoints for DataPeristence, set key

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
import { RobloxLegacy } from '../../../Api';

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
		const value = req.body['value'];
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
		if (req.query['valueLength'] === undefined)
			return res.status(500).send({
				errors: [
					{
						code: 6,
						message: 'The provided data length does not match the amount of data.',
						userFacingMessage: 'Something went wrong',
					},
				],
			});
		if (parseInt(<string>req.query['valueLength']) !== value.length && (<string>req.query['valueLength']).length !== 0)
			return res.status(500).send({
				errors: [
					{
						code: 6,
						message: 'The provided data length does not match the amount of data.',
						userFacingMessage: 'Something went wrong',
					},
				],
			});
		if (scope === '') scope = '_';
		const success2 = await RobloxLegacy.Api.Helpers.Helpers.PersistentDataStores.SetHelpers.PushKeyToPersistentStore(
			universeId,
			store,
			scope,
			k,
			value,
			req.query['type'] === 'standard' ? false : true,
		);
		if (!success2 && req.query['type'] === 'sorted')
			return res.status(200).send({
				error: 'Invalid value format for datastore type Sorted.\r\nParameter name: value',
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
			data: value,
		});
	},
};
