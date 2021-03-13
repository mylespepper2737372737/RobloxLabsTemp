/*
	FileName: all-time.ts
	Written By: comrade
	File Type: Module
	Description: Points API set point amount.
			
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

// Request example:
/*

# Request
POST /v1/universes/:id/users/:id/ HTTP/1.1

{
    amount: 1234,
}


###
 */

// Notes:
// If a query to Roblox.Data.AbTesting.Experiments.BrowserTrackerExperiments and Roblox.Data.AbTesting.Experiments.UserExperiments returns with no experiment,
// this doesn't mean that the experiment doesn't exist, it could be in Roblox.Data.AbTesting.Experiments.SharedExperiments.

import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import { Roblox } from '../../../../../../Api';
import { SetPoints } from '../../../../../../Helpers/WebHelpers/Points/Set';
import { FASTFLAG, FFlag } from '../../../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

dotenv.config({ path: Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\.env' });

FASTFLAG('RequireGlobalHTTPS');
export default {
	method: 'All',
	func: async (request: Request, response: Response): Promise<Response<unknown> | void> => {
    	if (request.method === 'OPTIONS') return response.status(200).send();
        if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
            return response.status(403).send({
                errors: [
                    {
                        code: 0,
                        message: 'HTTPS Required.',
                    }
                ],
            })
        }
        let uId = parseInt(request.params['universeId'])
		let usId = parseInt(request.params['userId'])
        if (isNaN(usId)) {
            return response.status(404).send({
                errors: [
                    {
                        code: 1,
                        message: 'The universe is invalid.',
                    }
                ],
            })
        } else if (isNaN(uId)) {
            return response.status(404).send({
                errors: [
                    {
                        code: 2,
                        message: 'The user is invalid.',
                    }
                ],
            })
        }


        let data = JSON.parse(request.body)
        // TODO: security checks.
        if (isNaN(data["amount"])) {
            return response.status(400).send({
                errors: [
                    {
                        code: 4 ,
                        message: 'The specified amount of points is invalid.',
                    }
                ],
            })
        }
        let e = {}
		const success = await SetPoints(uId, usId, parseInt(data["amount"]))
		if (success) {
			e["allTimeScore"]=0
		} else {
			e["allTimeScore"]=0
		}
		return response.status(200).send(JSON.stringify(e))
		
	},
};
