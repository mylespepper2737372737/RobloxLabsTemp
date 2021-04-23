import { RequestHandler } from 'express-serve-static-core';
import { GetValueFromCookieString } from '../../../Common/KeyValueMapping/Roblox.Common.KeyValueMapping/GetValueFromCookieString';
import { GetUserFromCookie } from '../../Auth/Roblox.Web.Auth/GetUserFromCookie';

export const CookieHandler = (async (request, response, next) => {
	if (!(await GetUserFromCookie(request)) && GetValueFromCookieString('.ROBLOSECURITY', request.headers.cookie) !== null)
		response.clearCookie('.ROBLOSECURITY', { domain: '.sitetest4.robloxlabs.com' });
	next();
}) as RequestHandler;
