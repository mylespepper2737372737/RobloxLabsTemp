import { Request, Response } from 'express';
import { UsersService } from '../../../../../ApiServices/Roblox.Users.Service/Roblox.Users.Service/UsersService';
import { ApiKeys } from '../../../../../Data/Keys/Api';
import { FetchKeyFromObjectCaseInsensitive } from '../../../../../Util/FetchKeyFromObjectCaseInsensitive';

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

		const apiKey = <string>FetchKeyFromObjectCaseInsensitive(request.query, 'ApiKey');
		if (!apiKey.match(/(.{8})(.{4})(.{4})(.{4})(.{12})/)) {
			// Pull this capture to a helper.
			response.statusMessage = 'ApiKey required in Guid format.';
			return response.status(503).send();
		}

		if (apiKey !== ApiKeys.UsersApi) {
			response.statusMessage = 'The client is not authorized to perform this operation.';
			return response.status(503).send();
		}

		return UsersService.Validators.ValidateUsername(request.body, response);
	},
};
