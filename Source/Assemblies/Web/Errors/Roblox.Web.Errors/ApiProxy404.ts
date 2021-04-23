import { Request, Response } from 'express';
import { Errors } from '../../Util/Roblox.Web.Util/Errors';
import { InputValidator } from '../../Util/Roblox.Web.Util/Validators/InputValidator';

export const ApiProxy404 = (request: Request, response: Response) => {
	if (InputValidator.CheckDoesStringIncludeASPExtension(request.path)) {
		Errors.RespondWithAHttpStatusError(400, response);
	} else {
		Errors.RespondWithAHttpStatusError(404, response);
	}
};
