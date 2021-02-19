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

// Roblox.Web.AbTesting.AbTestingRequestProcessor.TryEnrollToExperiments(String experimentName, IUser user, IBrowserTracker browserTracker, Boolean requireSecureUri, Boolean isUpsell)
// Request example:
/*
 
# Preflight
OPTIONS /v1/enrollments HTTP/1.1
Host: Roblox.Tests.Hosts.SecureAbTestingHost
access-control-request-method: POST
access-control-request-headers: content-type,x-csrf-token
origin: Roblox.Tests.Origins.SecureAbTestingOrigin
user-agent: Roblox.Tests.UserAgents.AntiAdditionBlockAgent

###

# Request
POST /v1/enrollments HTTP/1.1
Host: Roblox.Tests.Hosts.SecureAbTestingHost
x-csrf-token: Roblox.Tests.HardCodedData.HardCodedXsrfTokens.ST4
user-agent: Roblox.Tests.UserAgents.AntiAdditionBlockAgent
content-type: application/json
origin: Roblox.Tests.Origins.SecureAbTestingOrigin

[
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

 */

// Notes:
// If a query to Roblox.Data.AbTesting.Experiments.BrowserTrackerExperiments and Roblox.Data.AbTesting.Experiments.UserExperiments returns with no experiment,
// this doesn't mean that the experiment doesn't exist, it could be in Roblox.Data.AbTesting.Experiments.SharedExperiments.

import a from 'axios';

export default {
	method: 'all',
	func: async (_req, res) => {
		if (_req.method === 'OPTIONS') return res.send();
		a.post('https://abtesting.roblox.com' + _req.url, _req.body, {
			headers: { ..._req.headers, host: 'abtesting.roblox.com' },
		})
			.then((re) => {
				const newheaders = JSON.parse(JSON.stringify(re.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));

				return res.header(newheaders).send(re.data);
			})
			.catch((e) => {
				const newheaders = JSON.parse(JSON.stringify(e.response.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));
				return res.header(newheaders).status(e.response.status).send(e.response.data);
			});
	},
};
