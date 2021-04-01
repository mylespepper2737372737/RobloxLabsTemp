/*
	FileName: BatchIncrement.ts
	Written By: GithubPagesStuff, modified by nsg.
	File Type: Module
	Description: Increment multiple counters.

	NOTICE DO NOT PUT CSRF PROTECTION ON THIS!

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

import { Request, Response } from 'express';
import { EphemeralCountersService } from '../../../../../ApiServices/Roblox.EphemeralCounters.Service/Roblox.EphemeralCounters.Service/EphemeralCountersService';
import { ICounter } from '../../../Models/ICounter';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		const keys = new Map<string, number>(Object.entries(request.body));
		const counters: ICounter[] = [];
		keys.forEach(async (value, key) => {
			counters.push({ Name: key, Amount: value });
		});
		return await EphemeralCountersService.HandleBatchIncrementCounters(counters, response);
	},
};
