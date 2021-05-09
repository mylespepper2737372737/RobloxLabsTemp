import { Response } from 'express';
import { ICustomError } from '../../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { ErrorsClient } from '../ErrorsClient';
import { ISingleValidatorBase } from './Interfaces/ISingleValidatorBase';

export class ProtocolValidator<TResponse extends Response> implements ISingleValidatorBase<string, bool> {
	private readonly _errorsClient: ErrorsClient<TResponse>;

	public constructor(response: TResponse) {
		this._errorsClient = new ErrorsClient(response);
	}

	public Validate(originalValue: string, itShouldBe: string): boolean {
		const errors: ICustomError[] = [];
		originalValue = originalValue.toLowerCase();
		if (originalValue !== itShouldBe) {
			errors.push({
				code: 0,
				message: `${itShouldBe.toUpperCase()} Required`,
			});
			this._errorsClient.RespondWithCustomErrors(403, errors, true);
			return false;
		}
		return true;
	}
}
