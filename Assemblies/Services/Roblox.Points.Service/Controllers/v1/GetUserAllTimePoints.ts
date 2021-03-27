import { Request, Response } from 'express';
import { RobloxLegacy } from '../../../../Api';
import { PointsService } from '../../../../ApiServices/Roblox.Points.Service/Implementation/PointsService';
import { ApiKeys } from '../../../../Data/Keys/Api';
import { FASTFLAG, FFlag } from '../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { IUser } from '../../../../Platform/Membership/IUser';
import { IUniverse } from '../../../../Platform/Universes/IUniverse';
import { FetchKeyFromObjectCaseInsensitive } from '../../../../Util/FetchKeyFromObjectCaseInsensitive';

FASTFLAG('RequireGlobalHTTPS');

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		if (request.method === 'OPTIONS') return response.status(200).send();
		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
			return response
				.status(404)
				.sendFile(RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\ErrorViews\\FilesApi\\Roblox.404.html');

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

		if (apiKey !== ApiKeys.PointsApi) {
			response.statusMessage = 'The client is not authorized to perform this operation.';
			return response.status(503).send();
		}

		return PointsService.HandleGetAllTimePoints(<IUser>request.body.user, <IUniverse>request.body.universe, response);
	},
};
