import { Request, Response } from 'express';
import { UsersClient } from '../../../ApiClients/Roblox.Users.Client/Implementation/UsersClient';
import { IServiceUsernameValidationResponse } from '../../../ApiClients/Roblox.Users.Client/Models/IServiceUsernameValidationResponse';
import { IUsernameValidationRequest } from '../../../ApiSites/Roblox.Auth.Api/Models/IUsernameValidationRequest';
import { IUsernameValidationResponse } from '../../../ApiSites/Roblox.Auth.Api/Models/IUsernameValidationResponse';
import { UsernameValidationContext } from '../../../ApiSites/Roblox.Auth.Api/Enumerations/UsernameValidationContext';
import { Task } from '../../../Http/Task';
import { ICustomError } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { IUser } from '../../../Platform/Membership/IUser';
import { Errors } from '../../Util/Roblox.Web.Util/Errors';
import { ContentTypeValidator } from '../../Util/Roblox.Web.Util/Validators/ContentTypeValidator';

export namespace AuthRequestProcessor {
	export namespace UsernameValidation {
		/**
		 * A private function that sanitizes the request and returns a {Roblox.Auth.Api.Models.UsernameValidationRequest}
		 * @param {IUsernameValidationRequest} data The original request body.
		 * @param {ICustomError[]} errors A cross-referenced error-set, so they aren't defined twice. TODO: Put this in the class-base.
		 * @param {IUser} authenticatedUser The authenticated user to use.
		 * @param {Response} response A response to pass in to be injected into the {Roblox.Web.Util.Errors}.
		 * @returns {[boolean, IUsernameValidationRequest]} Returns an IUsernameValidationRequest if the body was validated successfully.
		 * @internal This method is private and internal, and should only be used inside of the AuthRequestProcessor.UsernameValidation
		 */
		function checkRequest(
			data: IUsernameValidationRequest,
			errors: ICustomError[],
			authenticatedUser: IUser,
			response: Response,
		): [boolean, IUsernameValidationRequest] {
			const newRequest: IUsernameValidationRequest = data;
			if (!data.username || data.username.length === 0) {
				errors.push({
					code: 1,
					message: 'A valid username is required.',
					userFacingMessage: 'Something went wrong',
				});
				Errors.RespondWithCustomErrors(400, errors, response, true);
				return [false, null];
			}
			if (!data.birthday || data.birthday.length === 0) {
				// Check if the user is authenticated via the passed in IUser
				if (!authenticatedUser) {
					errors.push({
						code: 2,
						message: 'A valid birthday or authenticated user is required.',
						userFacingMessage: 'Something went wrong',
					});
					Errors.RespondWithCustomErrors(400, errors, response, true);
					return [false, null];
				}
				newRequest.birthday = authenticatedUser.Created; // Use Created until BirthDay is implemented to the entity.
			}

			if (!data.context) newRequest.context = UsernameValidationContext.Unknown;
			return [true, newRequest];
		}

		/**
		 * Will check the request depending on if the request is a GET or POST.
		 * @param isUsingPost
		 * @param request
		 * @param response
		 * @returns
		 */
		export function CheckRequest(
			isUsingPost: boolean,
			authenticatedUser: IUser,
			request: Request<null, IUsernameValidationResponse, IUsernameValidationRequest, IUsernameValidationRequest>,
			response: Response,
		): [boolean, IUsernameValidationRequest] {
			const errors: ICustomError[] = [];
			const contentType = request.headers['content-type'];
			let data = isUsingPost ? request.body : request.query;

			if (!data) {
				errors.push({ code: 1, message: 'A valid username is required.', userFacingMessage: 'Something went wrong' });
				Errors.RespondWithCustomErrors(400, errors, response, true);
				return [false, null];
			}
			if (isUsingPost)
				if (
					!ContentTypeValidator.CheckContentTypes(
						contentType,
						['application/json', 'text/json', 'application/x-www-form-urlencoded'],
						response,
					)
				)
					return [false, null];
			if (!isUsingPost)
				data = {
					username: (<any>data)['request.username'],
					birthday: (<any>data)['request.birthday'],
					context: (<any>data)['request.context'],
				};
			const [IsSuccessful, ParsedBody] = checkRequest(data, errors, authenticatedUser, response);
			if (!IsSuccessful) return [false, null];
			return [true, ParsedBody];
		}

		//

		export async function ValidateUsername(
			authenticatedUser: IUser,
			request: IUsernameValidationRequest,
			isSecure: boolean = true,
		): Task<[boolean, IServiceUsernameValidationResponse, Error]> {
			return new Promise<[boolean, IServiceUsernameValidationResponse, Error]>(async (resumeFunction) => {
				const [WasRequestSuccessful, , Response, Error] = await UsersClient.Validators.ValidateUsername({
					IUser: authenticatedUser,
					Request: request,
					IsSecure: isSecure,
				});

				return resumeFunction([WasRequestSuccessful, Response, Error]);
			});
		}
	}
}
