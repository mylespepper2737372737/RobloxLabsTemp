import { RequestHandler } from 'express-serve-static-core';
import { ICustomError } from '../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { ValidateDoesTheWorldGetToViewTheSite } from '../Util/ValidateDoesTheWorldGetToViewTheSite';
import { Errors } from '../Web/Util/Roblox.Web.Util/Errors';

export const ApiServiceIsAliveValidator = ((req, res, next) => {
	if (req.method === 'OPTIONS') return next();
	let cookie = req.headers.cookie;
	if (cookie === undefined) cookie = '';
	cookie = (cookie as string).split(';').find((secToken) => {
		return secToken.startsWith(' RobloxSecurityToken') || secToken.startsWith('RobloxSecurityToken');
	});
	if (cookie) cookie = cookie.split('=')[1];
	if (
		!ValidateDoesTheWorldGetToViewTheSite(
			req.method,
			encodeURIComponent(`${req.protocol}://${req.hostname}${req.url}`),
			cookie || <string>req.headers['roblox-security-token'],
			res,
			true,
		)
	) {
		const customErrors: ICustomError[] = [{ code: 0, message: 'Service Undergoing Maintenance' }];
		Errors.RespondWithCustomErrors(503, customErrors, res, true);
		return;
	}
	next();
}) as RequestHandler;
