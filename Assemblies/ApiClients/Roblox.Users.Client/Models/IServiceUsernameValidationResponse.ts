import { UsernameValidationContext } from '../../../ApiSites/Roblox.Auth.Api/Models/UsernameValidationContext';
import { UsernameValidationStatus } from '../../../ApiSites/Roblox.Auth.Api/Models/UsernameValidationStatus';
import { IUser } from '../../../Platform/Membership/IUser';

export interface IServiceUsernameValidationResponse {
	IUser: IUser;
	Username: System.String;
	Status: UsernameValidationStatus;
	Context: UsernameValidationContext;
	IsRCC: System.Boolean;
	Birthdate: System.String;
	InternalMessage: System.String;
}
