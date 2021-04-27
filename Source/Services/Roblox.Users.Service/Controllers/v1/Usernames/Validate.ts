import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../../../../../Assemblies/ApiServices/Roblox.Users.Service/Roblox.Users.Service/UsersService';
import { ApiKeys } from '../../../../../Assemblies/Common/Client/Roblox.Common.Client/Api/ApiKeys';
import { FetchKeyFromObjectCaseInsensitive } from '../../../../../Assemblies/Common/KeyValueMapping/Roblox.Common.KeyValueMapping/FetchKeyFromObjectCaseInsensitive';
import { Errors } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Errors';
import { ApiKeyValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ApiKeyValidator';
import { MethodValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/MethodValidator';

export default {
	method: 'all',
	func: async (request: Request, response: Response, next: NextFunction) => {
		if (!MethodValidator.CheckMethods(request.method, ['POST', 'OPTIONS'], response, true)[0]) return;
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
