/*
	FileName: _P-userId.ts
	Written By: comrade
	File Type: Module
	Description: Set points amount.
			
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

//import a from 'axios';
// why points? i know it's super useless
// but i can just guess what it does and implement it that way.
import { _dirname } from '../../../../../../../Helpers/Constants/Directories';
import { SetPoints } from '../../../../../../../Helpers/WebHelpers/Points/Set';
export default {
	method: 'all',
	func: async (_req, res) => {
		if (_req.method === 'OPTIONS') return res.send();
		if (_req.method !== 'POST') {
			return res.status(502).send() // Make sure you're sending the right method
		}
		//return res.status(120).send()
		try {
    
            let data = JSON.parse(_req.body)
            // TODO: security checks.
            let uId = parseInt(_req.params['universeId'])
		    let usId = parseInt(_req.params['userId'])
            if (isNaN(uId) || isNaN(usId) || isNaN(data["amount"])) {
                return res.status(400).send({
					errors: [
						{
							code: 4,
							message: 'The specified points amount is invalid.',
							retryable: false,
						},
					],
				});
            }
            let e = {}
            const success = await SetPoints(uId, usId, parseInt(data["amount"]))
            if (success) {
                e["allTimeScore"]=0
            } else {
                e["allTimeScore"]=0
            }
            return res.status(200).send(JSON.stringify(e))
            
            
        } catch(err) {
         
        }
    },
};