import { Response } from 'express';

export function ValidateApiKey(originalApiKey: string, apiKeyToValidate: string, response: Response, optionalResponseData?: any) {
	return ValidateApiKeys(originalApiKey, [apiKeyToValidate], response, optionalResponseData);
}

export function ValidateApiKeys(originalApiKey: string, apiKeysToValidate: string[], response: Response, optionalResponseData?: any) {
	if (!originalApiKey) {
		response.statusMessage = 'ApiKey required in Guid format.';
		response.status(503).send(optionalResponseData);
		return false;
	}

	if (!originalApiKey.match(/(.{8})(.{4})(.{4})(.{4})(.{12})/)) {
		response.statusMessage = 'ApiKey required in Guid format.';
		response.status(503).send(optionalResponseData);
		return false;
	}
	let isValid = false;
	apiKeysToValidate.every((apiKeyToValidate) => {
		if (apiKeyToValidate.toLowerCase() === originalApiKey.toLowerCase()) {
			isValid = true;
			return false;
		}
		return true;
	});
	if (!isValid) {
		response.statusMessage = 'Invalid client credentials.';
		response.status(503).send(optionalResponseData);
		return false;
	}
	return true;
}
