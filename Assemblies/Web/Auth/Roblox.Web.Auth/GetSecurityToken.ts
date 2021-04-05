import { Request } from 'express';
import { GetValueFromCookieString } from '../../../Util/GetValueFromCookieString';

export function GetSecurityToken(request: Request) {
	return GetValueFromCookieString('.ROBLOSECURITY', request.headers.cookie || '');
}
