import { Response } from 'express';
import { DFFlag, DYNAMIC_FASTFLAGVARIABLE } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

import { Counter } from '../../../Platform/Misc/Counter'

DYNAMIC_FASTFLAGVARIABLE('EphemeralCountersServiceEnabled', true);

export namespace EphemeralCountersService {
	export async function HandleIncrementCounter(counter: string, amount: number, response: Response) {
		if (!AskIfWeAreAvailable(response)) return;
		// Just make this do nothing for the time being; aka. echo back the user and universe, with an alltimescore of 0
       		let result =  await Counter.IncrementCounter(counter, amount)
		
		return response.status(result).send();
	}
    export async function HandleIncrementCounterNoResp(counter: string, amount: number) {
		// Just make this do nothing for the time being; aka. echo back the user and universe, with an alltimescore of 0
		let result = await Counter.IncrementCounter(counter, amount)
		return result;
	}

	export function AskIfWeAreAvailable(response: Response): boolean {
		if (!DFFlag('EphemeralCountersServiceEnabled')) {
			response.status(503).send();
			return false;
		}
		return true;
	}
} 