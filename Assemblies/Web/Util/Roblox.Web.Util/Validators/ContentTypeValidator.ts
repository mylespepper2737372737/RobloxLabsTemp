import { Response } from 'express';
import { ICustomError } from '../../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { Errors } from '../Errors';

export namespace ContentTypeValidator {
	export function CheckContentType(originalContentType: string, contentTypeToValidate: string, response: Response) {
		return CheckContentTypes(originalContentType, [contentTypeToValidate], response);
	}
	export function CheckContentTypes(originalContentType: string, contentTypesToValidate: string[], response: Response): boolean {
		const errors: ICustomError[] = [];
		if (!originalContentType) {
			errors.push({
				code: 0,
				message:
					"The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.",
			});
			Errors.RespondWithCustomErrors(415, errors, response, true);
			return false;
		}
		originalContentType = originalContentType.toLowerCase();
		let contentTypeIsValid = false;
		contentTypesToValidate.every((contentType) => {
			contentType = contentType.toLowerCase();
			if (contentType === originalContentType) {
				contentTypeIsValid = true;
				return false;
			}
			return true;
		});
		if (!contentTypeIsValid) {
			errors.push({
				code: 0,
				message: `The request entity's media type '${originalContentType}' is not supported for this resource.`,
			});
			Errors.RespondWithCustomErrors(415, errors, response, true);
			return false;
		}
		return true;
	}
}
