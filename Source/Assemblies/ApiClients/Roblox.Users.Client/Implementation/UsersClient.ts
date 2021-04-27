import { BaseURL } from '../../../Common/Client/Roblox.Common.Client/BaseUrl';
import { ApiKeys } from '../../../Common/Client/Roblox.Common.Client/Api/ApiKeys';
import { ServiceClient } from '../../../Http/ServiceClient/Roblox.Http.ServiceClient/Implementation/HttpClient';
import { HttpRequestMethodEnum } from '../../../Http/ServiceClient/Roblox.Http.ServiceClient/Enumeration/HttpRequestMethodEnum';
import { Task } from '../../../../System/Threading/Task';
import { IServiceUsernameValidationRequest } from '../Models/IServiceUsernameValidationRequest';

export namespace UsersClient {
	export namespace Validators {
		export async function ValidateUsername(request: IServiceUsernameValidationRequest): Task<[boolean, number, any, Error]> {
			return new Promise<[boolean, number, any, Error]>(async (resumeFunction) => {
				const Url = BaseURL.ConstructServicePath('users.api', 'v1/Usernames/ValidateUsername', request.IsSecure);
				const Payload = JSON.stringify({ ...request, IsSecure: undefined });
				const Client = new ServiceClient.HttpClient({
					Url: Url,
					QueryString: {
						ApiKey: ApiKeys.UsersApi,
					},
					AdditionalHeaders: { 'Content-Type': 'application/json' },
					Payload: Payload,
					Method: HttpRequestMethodEnum.POST,
					FailedMessage: `Error validating the username ${request.Request.username}`,
				});
				const [Success, Response, Error] = await Client.execute();
				return resumeFunction([<boolean>Success, <number>Response.StatusCode, Response.ResponsePayload, Error]);
			});
		}
	}
}
