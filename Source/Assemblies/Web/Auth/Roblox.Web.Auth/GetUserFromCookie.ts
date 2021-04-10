import { Request } from 'express';
import { User } from '../../../Platform/Membership/Roblox.Platform.Membership/User';
import { GetSecurityToken } from './GetSecurityToken';

export async function GetUserFromCookie(request: Request<any, any, any, any, any>) {
	return await User.GetByCookie(GetSecurityToken(request));
}
