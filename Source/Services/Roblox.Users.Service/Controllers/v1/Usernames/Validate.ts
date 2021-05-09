import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../../../../../Assemblies/ApiServices/Roblox.Users.Service/Roblox.Users.Service/UsersService';
import { ApiKeys } from '../../../../../Assemblies/Common/Client/Roblox.Common.Client/Api/ApiKeys';
import { FetchKeyFromObjectCaseInsensitive } from '../../../../../Assemblies/Common/KeyValueMapping/Roblox.Common.KeyValueMapping/FetchKeyFromObjectCaseInsensitive';
import { HttpRequestMethodEnum } from '../../../../../Assemblies/Http/ServiceClient/Roblox.Http.ServiceClient/Enumeration/HttpRequestMethodEnum';
import { ErrorsClient } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/ErrorsClient';
import { ApiKeyValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ApiKeyValidator';
import { MethodValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/MethodValidator';

export default {
	method: 'all',
	func: async (request: Request, response: Response, next: NextFunction) => {
		const errorsClient = new ErrorsClient(response);
		const apiKeyValidatorClient = new ApiKeyValidator(response, 'The service is unavailable.');
		const methodValidatorClient = new MethodValidator(response);

		if (methodValidatorClient.MultiValidate(request.method, ['POST', 'OPTIONS'], true) === HttpRequestMethodEnum.UNKNOWN) return;
		if (request.body && (!request.headers['content-type'] || request.headers['content-type'].length === 0))
			return errorsClient.RespondWithAServiceError(
				415,
				"The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.",
				true,
			);

		if (typeof request.body.Request !== 'object') return errorsClient.RespondWithAServiceError(500, 'An Error occured.', true);
		if (!apiKeyValidatorClient.Validate(FetchKeyFromObjectCaseInsensitive(request.query, 'ApiKey'), ApiKeys.UsersApi, true)) return;

		return UsersService.Validators.ValidateUsername(request.body, response);
	},
};
