import { Response } from 'express';
import { HttpRequestMethodEnum } from '../../../../Http/ServiceClient/Roblox.Http.ServiceClient/Enumeration/HttpRequestMethodEnum';
import { ICustomError } from '../../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { Errors } from '../Errors';

export namespace MethodValidator {
	/**
	 * Checks if the request method matches the given {methodToValidate} for the MethodValidator.
	 *
	 * @param {string} originalMethod The original request method, to be converted to lowercase etc.
	 * @param {string} methodToValidate The method to validate.
	 * @param {Response} response A response to pass in to be injected into the {Roblox.Web.Util.Errors}.
	 * @param {boolean} isService If true, will use the ServiceError instead of the CustomError.
	 * @returns {[boolean, HttpRequestMethodEnum]} Returns true if the request method verb matches any of the given methods below.
	 */
	export function CheckMethod(originalMethod: string, methodToValidate: string, response: Response, isService: boolean = false): boolean {
		return CheckMethods(originalMethod, [methodToValidate], response, isService)[0];
	}

	/**
	 * Checks if the request method matches the given {methodsToValidate} for the MethodValidator.
	 *
	 * @param {string} originalMethod The original request method, to be converted to lowercase etc.
	 * @param {string[]} methodsToValidate The methods to validate.
	 * @param {Response} response A response to pass in to be injected into the {Roblox.Web.Util.Errors}.
	 * @param {boolean} isService If true, will use the ServiceError instead of the CustomError.
	 * @returns {[boolean, HttpRequestMethodEnum]} Returns true if the request method verb matches any of the given methods below.
	 */
	export function CheckMethods(
		originalMethod: string,
		methodsToValidate: string[],
		response: Response,
		isService: boolean = false,
	): [boolean, HttpRequestMethodEnum] {
		const errors: ICustomError[] = [];
		originalMethod = originalMethod.toLowerCase();
		if (originalMethod === 'options') return [true, HttpRequestMethodEnum.OPTIONS];
		let methodIsValid = false;
		let requestMethod = HttpRequestMethodEnum.GET;
		const allowedMethods = methodsToValidate.join(', ');
		methodsToValidate.every((method) => {
			method = method.toLowerCase();
			if (method === originalMethod) {
				methodIsValid = true;
				switch (originalMethod) {
					case 'post':
						requestMethod = HttpRequestMethodEnum.POST;
						break;
					case 'put':
						requestMethod = HttpRequestMethodEnum.PUT;
						break;
					case 'delete':
						requestMethod = HttpRequestMethodEnum.DELETE;
						break;
					case 'head':
						requestMethod = HttpRequestMethodEnum.HEAD;
						break;
					case 'patch':
						requestMethod = HttpRequestMethodEnum.PATCH;
						break;
					default:
						requestMethod = <HttpRequestMethodEnum>(<unknown>'Unknown');
						break;
				}
				return false;
			}
			return true;
		});
		if (!methodIsValid) {
			const errorMessage = `The requested resource does not support http method '${originalMethod.toUpperCase()}'.`;
			if (isService) {
				response.header({ Allow: allowedMethods });
				Errors.RespondWithAServiceError(405, errorMessage, response, true);
				return [false, null];
			}
			errors.push({ code: 0, message: errorMessage });
			Errors.RespondWithCustomErrors(405, errors, response, true);
			return [false, null];
		}
		return [true, requestMethod];
	}
}
