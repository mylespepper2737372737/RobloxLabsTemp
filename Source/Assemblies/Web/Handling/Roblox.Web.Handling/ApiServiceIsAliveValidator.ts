import { RequestHandler } from 'express-serve-static-core';
import { FileBaseUrls } from '../../../Common/Constants/Roblox.Common.Constants/FileBaseUrls';
import { GetValueFromCookieString } from '../../../Common/KeyValueMapping/Roblox.Common.KeyValueMapping/GetValueFromCookieString';
import { ICustomError } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { GetUserFromCookie } from '../../Auth/Roblox.Web.Auth/GetUserFromCookie';
import { Errors } from '../../Util/Roblox.Web.Util/Errors';
import { CommonValidator } from '../../Util/Roblox.Web.Util/Validators/CommonValidator';

export const ApiServiceIsAliveValidator = (async (request, response, next) => {
	if (await GetUserFromCookie(request)) return next();
	if (await CommonValidator.IsFileStaticFile(FileBaseUrls[request.hostname], request.path)) return next();
	if (request.method === 'OPTIONS') return next();
	const cookie = GetValueFromCookieString('RobloxSecurityToken', request.headers.cookie);
	if (
		!CommonValidator.ValidateDoesTheWorldGetToViewTheSite(
			request.method,
			encodeURIComponent(`${request.protocol}://${request.hostname}${request.url}`),
			cookie || <string>request.headers['roblox-security-token'],
			response,
			true,
		)
	) {
		const customErrors: ICustomError[] = [{ code: 0, message: 'Service Undergoing Maintenance' }];
		Errors.RespondWithCustomErrors(503, customErrors, response, true);
		return;
	}
	next();
}) as RequestHandler;
