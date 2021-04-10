import { Request, Response } from 'express';
import { UsersService } from '../../../../../Assemblies/ApiServices/Roblox.Users.Service/Roblox.Users.Service/UsersService';
import { ApiKeys } from '../../../../../Assemblies/Common/Client/Roblox.Common.Client/Api/ApiKeys';
import { FetchKeyFromObjectCaseInsensitive } from '../../../../../Assemblies/Common/KeyValueMapping/Roblox.Common.KeyValueMapping/FetchKeyFromObjectCaseInsensitive';
import { Errors } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Errors';
import { ApiKeyValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ApiKeyValidator';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		if (request.method === 'OPTIONS') return response.status(200).send();

		if (request.method !== 'POST') {
			response.header({ Allow: 'POST' });
			return Errors.RespondWithAServiceError(
				405,
				`The requested resource does not support http method '${request.method}'.`,
				response,
				true,
			);
		}

		if (request.body && (!request.headers['content-type'] || request.headers['content-type'].length === 0))
			return Errors.RespondWithAServiceError(
				415,
				"The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.",
				response,
				true,
			);

		if (typeof request.body.Request !== 'object') return Errors.RespondWithAServiceError(500, 'An Error occured.', response, true);
		if (!ApiKeyValidator.ValidateApiKey(FetchKeyFromObjectCaseInsensitive(request.query, 'ApiKey'), ApiKeys.UsersApi, response)) return;

		return UsersService.Validators.ValidateUsername(request.body, response);
	},
};
