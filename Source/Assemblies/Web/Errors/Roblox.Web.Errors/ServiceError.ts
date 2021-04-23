import { Request, Response } from 'express';
import { Errors } from '../../Util/Roblox.Web.Util/Errors';

export const DefaultServiceError = (request: Request, response: Response) => {
	if (request.method === 'OPTIONS') return response.status(200).send();
	Errors.RespondWithAServiceError(
		404,
		`No HTTP resource was found that matches the request URI '${request.protocol}://${request.hostname}${request.url}'.`,
		response,
		true,
	);
};
