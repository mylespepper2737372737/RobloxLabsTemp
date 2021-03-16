import { Response } from 'express';
import { DFFlag, DYNAMIC_FASTFLAGVARIABLE } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { ICustomError } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { ICustomErrorList } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomErrorList';
import { StatusCodes } from './StatusCodes';

DYNAMIC_FASTFLAGVARIABLE('Debug', false);

export namespace Errors {
	export function RespondWithCustomErrors(
		statusCode: number,
		customErrors: ICustomError[],
		response: Response,
		shouldEndResponse: boolean = true,
	) {
		const CustomErrorList: ICustomErrorList = { errors: customErrors };
		response.status(statusCode).send(CustomErrorList);
		if (shouldEndResponse) response.end();
	}

	///////////////////////////
	// Responders
	///////////////////////////
	/**
	 * Determines the current enviornment in order to respond with the correct error types.
	 * USE THIS FOR ALL UNHANDLED ERRORS.
	 * @param {Response} response The response to be hooked.
	 * @param {Error} exception The exception to be used.
	 * @returns {void} Returns nothing.
	 */
	export function RespondWithAHttpError(response: Response, exception: Error): void {
		if (DFFlag('Debug')) return RespondWithADetailedError(response, exception);
		return RespondWithInternalServerError(response);
	}

	/**
	 * Use this if NOT development.
	 * @param {Response} response The response to be hooked.
	 * @returns {void} Returns nothing.
	 */
	export function RespondWithInternalServerError(response: Response): void {
		const customErrors: ICustomError[] = [{ code: 500, message: 'InternalServerError' }];
		RespondWithCustomErrors(500, customErrors, response, true);
		return;
	}

	/**
	 * Respond with a Http Status Code error.
	 * @param {number} status The status code.
	 * @param {Response} response The response to be hooked.
	 * @returns {void} Returns nothing.
	 */
	export function RespondWithAHttpStatusError(status: number, response: Response): void {
		const customErrors: ICustomError[] = [{ code: status || 0, message: StatusCodes[status.toString()] || 'Unknown' }];
		RespondWithCustomErrors(status, customErrors, response, true);
		return;
	}

	/**
	 * Respond with a default Http error.
	 * @param {number} status The status code that appears in the response.
	 * @param {Response} response The response to hook.
	 * @returns {void} Returns nothing.
	 */
	export function RespondWithADefaultHttpError(status: number, response: Response): void {
		const customErrors: ICustomError[] = [{ code: 0, message: 'Something went wrong with the request, see response status code.' }];
		RespondWithCustomErrors(status, customErrors, response, true);
		return;
	}

	/**
	 * Responds with a detailed error based on the exception given.
	 * @param {Response} response The response to hook.
	 * @param {Error} exception The exception to parse.
	 * @returns {void} Returns nothing.
	 */
	export function RespondWithADetailedError(response: Response, exception: Error): void {
		const customErrors: ICustomError[] = [{ code: 500, message: `${exception.stack}`.replace('Error:', '') }];
		RespondWithCustomErrors(500, customErrors, response, true);
		return;
	}
}
