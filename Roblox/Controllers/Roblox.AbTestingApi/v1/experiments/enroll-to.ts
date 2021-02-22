/*
	FileName: enrollments.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Load Place info script
			
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

// Roblox.AbTesting.Service.Processor.EnrollTo(IList<IEnrollment> enrollments);
// Request example:
/*

# Request
POST /v1/experiments/enroll-to HTTP/1.1
Host: abtesting.api.jack.black.sitetest1.robloxlabs.com
content-type: application/json

{
	"data": [
		{
			"SubjectType":"BrowserTracker",
			"SubjectTargetId":"<BROWSERTRACKERIDGOESHERE>",
			"ExperimentName":"{Roblox.Data.AbTesting.Experiments.BrowserTrackerExperiments}"
		},
		{
			"SubjectType":"User",
			"SubjectTargetId":"<USERIDGOESHERE>",
			"ExperimentName":"{Roblox.Data.AbTesting.Experiments.UserExperiments}"
		}
	]
}

 */

import { Request, Response } from 'express-serve-static-core';
import { AbTestingService } from '../../../../ApiServices/Roblox.AbTesting.Service/Roblox.AbTesting.Service/Implementation/AbTestingService';

export default {
	method: 'All',
	func: async (request: Request, response: Response): Promise<Response<unknown> | void> => {
		// const DFFlag = Roblox.Api.Helpers.Util.ClientSettings.GetDFFlags();

		if (request.method !== 'POST')
			return response.status(405).send({
				error: `The requested resource does not support http method '${request.method}'.`,
			});

		if (JSON.stringify(request.body) === '{}') return response.status(400).send();

		if (request.body && (!request.headers['content-type'] || request.headers['content-type'].length === 0))
			return response.status(415).send({
				message:
					"The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.",
			});
		let cookie = request.headers.cookie;
		if (cookie === undefined) cookie = '';
		cookie = (cookie as string).split(';').find((AuthToken) => {
			return AuthToken.startsWith(' .ROBLOSECURITY') || AuthToken.startsWith('.ROBLOSECURITY');
		});
		if (cookie) cookie = cookie.split('=')[1];

		AbTestingService.HandleEnrollTo(request.body.data || [], response);
	},
};
