import { Response } from 'express';
import { DFFlag, DYNAMIC_FASTFLAGVARIABLE } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

import { Counter } from '../../../Data/Counters/Roblox.Data.Counters/Counter'

DYNAMIC_FASTFLAGVARIABLE('EphemeralCountersServiceEnabled', true);

export namespace EphemeralCountersService {
	export async function HandleIncrementCounter(counter: string, amount: number, response: Response) {
		if (!AskIfWeAreAvailable(response)) return;
       		let result =  await Counter.IncrementCounter(counter, amount)
		if (result == 500) {
			return response.status(500).send({
				"Message": "An error has occurred."
			})
		}
		return response.status(result).send();
	}
    export async function HandleIncrementCounterNoResp(counter: string, amount: number) {
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