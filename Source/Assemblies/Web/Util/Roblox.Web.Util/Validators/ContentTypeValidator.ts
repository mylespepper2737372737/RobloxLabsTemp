import { Response } from 'express';
import { ICustomError } from '../../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { Errors } from '../Errors';

export namespace ContentTypeValidator {
	export function CheckContentType(
		originalContentType: string,
		contentTypeToValidate: string,
		response: Response,
		hasBody: boolean = false,
		isService: boolean = false,
	) {
		return CheckContentTypes(originalContentType, [contentTypeToValidate], response, hasBody, isService);
	}
	export function CheckContentTypes(
		originalContentType: string,
		contentTypesToValidate: string[],
		response: Response,
		hasBody: boolean = false,
		isService: boolean = false,
	): boolean {
		const errors: ICustomError[] = [];
		if (!originalContentType) {
			const errorMessage =
				"The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.";
			if (isService) {
				if (hasBody) {
					Errors.RespondWithAServiceError(415, errorMessage, response, true);
				} else {
					Errors.RespondWithAServiceError(500, 'An error has occurred.', response, true);
				}
				return false;
			}
			errors.push({
				code: 0,
				message: errorMessage,
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
			const errorMessage = `The request entity's media type '${originalContentType}' is not supported for this resource.`;
			if (isService) {
				Errors.RespondWithAServiceError(415, errorMessage, response, true);
				return false;
			}

			errors.push({
				code: 0,
				message: errorMessage,
			});
			Errors.RespondWithCustomErrors(415, errors, response, true);
			return false;
		}
		return true;
	}
}
