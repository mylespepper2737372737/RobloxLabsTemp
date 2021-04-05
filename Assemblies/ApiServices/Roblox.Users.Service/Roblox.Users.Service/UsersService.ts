import { Response } from 'express';
import { IServiceUsernameValidationRequest } from '../../../ApiClients/Roblox.Users.Client/Models/IServiceUsernameValidationRequest';
import { IServiceUsernameValidationResponse } from '../../../ApiClients/Roblox.Users.Client/Models/IServiceUsernameValidationResponse';
import { UsernameValidationStatus } from '../../../ApiSites/Roblox.Auth.Api/Enumerations/UsernameValidationStatus';

export namespace UsersService {
	export namespace Validators {
		export function ValidateUsername(
			request: IServiceUsernameValidationRequest,
			response: Response<IServiceUsernameValidationResponse>,
		) {
			return response.send({
				IUser: request.IUser,
				Status: UsernameValidationStatus.ValidUsername,
				Username: request.Request.username,
				Context: request.Request.context,
				IsRCC: false,
				Birthdate: request.Request.birthday,
				InternalMessage: 'Username is valid',
			});
		}
	}
}
