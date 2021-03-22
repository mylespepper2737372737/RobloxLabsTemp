/// <reference types="node_modules/@types/express" />

declare namespace Roblox.Web.WebAPI.Middleware {
	interface IApiService {
		ApiServiceIsAliveValidator(request: Express.Request, response: Express.Response, next): void;
	}
}
