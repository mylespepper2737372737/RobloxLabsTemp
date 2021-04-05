import { IUsernameValidationRequest } from '../../../ApiSites/Roblox.Auth.Api/Models/IUsernameValidationRequest';
import { IUser } from '../../../Platform/Membership/IUser';

export interface IServiceUsernameValidationRequest {
	IUser: IUser;
	Request: IUsernameValidationRequest;
	IsSecure: System.Boolean;
}
