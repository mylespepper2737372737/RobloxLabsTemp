import { Request, Response } from 'express';
import { UsersService } from '../../../../../ApiServices/Roblox.Users.Service/Roblox.Users.Service/UsersService';
import { ApiKeys } from '../../../../../Data/Keys/Api';
import { FetchKeyFromObjectCaseInsensitive } from '../../../../../Util/FetchKeyFromObjectCaseInsensitive';
import { ValidateApiKey } from '../../../../../Util/ValidateApiKey';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		if (request.method === 'OPTIONS') return response.status(200).send();

		if (request.method !== 'POST')
			return response
				.status(405)
				.header({ Allow: 'POST' })
				.send({
					Message: `The requested resource does not support http method '${request.method}'.`,
				});

		if (request.body && (!request.headers['content-type'] || request.headers['content-type'].length === 0))
			return response.status(415).send({
				Message:
					"The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.",
			});

		if (!ValidateApiKey(FetchKeyFromObjectCaseInsensitive(request.query, 'ApiKey'), ApiKeys.UsersApi, response)) return;

		return UsersService.Validators.ValidateUsername(request.body, response);
	},
};
