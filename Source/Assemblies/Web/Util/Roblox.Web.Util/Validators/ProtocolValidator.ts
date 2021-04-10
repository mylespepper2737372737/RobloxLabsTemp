import { Response } from 'express';
import { ICustomError } from '../../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { Errors } from '../Errors';

export namespace ProtocolValidator {
	/**
	 * Checks if the request is HTTPS.
	 * @param {string} protocol The original request protocol.
	 * @param {Response} response A response to pass in to be injected into the {Roblox.Web.Util.Errors}.
	 * @returns {boolean} Returns true if the protocol is HTTPS, or false if the protocol is anything other than HTTPS.
	 */
	export function CheckIsHTTPS(protocol: string, response: Response): boolean {
		const errors: ICustomError[] = [];
		protocol = protocol.toLowerCase();
		if (protocol !== 'https') {
			errors.push({
				code: 0,
				message: 'HTTPS Required',
			});
			Errors.RespondWithCustomErrors(403, errors, response, true);
			return false;
		}
		return true;
	}
}
