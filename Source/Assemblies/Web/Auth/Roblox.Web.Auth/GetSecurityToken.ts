import { Request } from 'express';
import { GetValueFromCookieString } from '../../../Common/KeyValueMapping/Roblox.Common.KeyValueMapping/GetValueFromCookieString';

export function GetSecurityToken(request: Request) {
	return GetValueFromCookieString('.ROBLOSECURITY', request.headers.cookie || '');
}
