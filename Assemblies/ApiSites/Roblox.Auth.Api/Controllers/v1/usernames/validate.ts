/*
	FileName: validate.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Checks if a username is valid.

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

import { Request, Response } from 'express';
import { HttpRequestMethodEnum } from '../../../../../Http/ServiceClient/Roblox.Http.ServiceClient/Enumeration/HttpRequestMethodEnum';
import { AuthRequestProcessor } from '../../../../../Web/Auth/Roblox.Web.Auth/AuthRequestProcessor';
import { GetUserFromCookie } from '../../../../../Web/Auth/Roblox.Web.Auth/GetUserFromCookie';
import { Errors } from '../../../../../Web/Util/Roblox.Web.Util/Errors';
import { MethodValidator } from '../../../../../Web/Util/Roblox.Web.Util/Validators/MethodValidator';
import { ProtocolValidator } from '../../../../../Web/Util/Roblox.Web.Util/Validators/ProtocolValidator';
import { IUsernameValidationRequest } from '../../../Models/IUsernameValidationRequest';
import { IUsernameValidationResponse } from '../../../Models/IUsernameValidationResponse';

export default {
	method: 'ALL',
	func: async (
		request: Request<null, IUsernameValidationResponse, IUsernameValidationRequest, IUsernameValidationRequest, null>,
		response: Response<IUsernameValidationResponse, null>,
	) => {
		if (!ProtocolValidator.CheckIsHTTPS(request.protocol, response)) return;
		const [isValid, method] = MethodValidator.CheckMethods(request.method, ['GET', 'POST'], response);
		if (!isValid) return;
		const isPost = method === HttpRequestMethodEnum.POST;
		const authenticatedUser = await GetUserFromCookie(request);
		const [isRequestValid, dataRequest] = AuthRequestProcessor.UsernameValidation.CheckRequest(
			isPost,
			authenticatedUser,
			request,
			response,
		);
		if (!isRequestValid) return;
		const [WasRequestSuccessful, Response, Exception] = await AuthRequestProcessor.UsernameValidation.ValidateUsername(
			authenticatedUser,
			dataRequest,
			request.secure,
		);
		if (!WasRequestSuccessful) {
			return Errors.RespondWithAHttpError(response, Exception);
		}

		return response.status(200).send({
			code: Response.Status,
			message: Response.InternalMessage,
		});
	},
};
