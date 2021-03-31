import { Response } from 'express';
import { DFFlag, DYNAMIC_FASTFLAGVARIABLE } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { RobloxLegacy } from '../../../Api';
import fs from 'fs';

DYNAMIC_FASTFLAGVARIABLE('EphemeralCountersServiceEnabled', true);

export namespace EphemeralCountersService {
	export function HandleIncrementCounter(counter: string, amount: number, response: Response) {
		if (!AskIfWeAreAvailable(response)) return;
		// Just make this do nothing for the time being; aka. echo back the user and universe, with an alltimescore of 0
        const counterpath = RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/EC.json"
        let counters = {}
        if (fs.existsSync(counterpath)) {
            counters = JSON.parse(fs.readFileSync(counterpath).toString())
        }
        if (counters[counter] == null) {
            counters[counter]=amount
        } else {
            counters[counter]+=amount
        }
        fs.writeFileSync(counterpath, JSON.stringify(counters))
		return response.status(200).send();
	}
    export function HandleIncrementCounterNoResp(counter: string, amount: number) {
		// Just make this do nothing for the time being; aka. echo back the user and universe, with an alltimescore of 0
        const counterpath = RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/EC.json"
        let counters = {}
        if (fs.existsSync(counterpath)) {
            counters = JSON.parse(fs.readFileSync(counterpath).toString())
        }
        if (counters[counter] == null) {
            counters[counter]=amount
        } else {
            counters[counter]+=amount
        }
        fs.writeFileSync(counterpath, JSON.stringify(counters))
	}

	export function AskIfWeAreAvailable(response: Response): boolean {
		if (!DFFlag('EphemeralCountersServiceEnabled')) {
			response.status(503).send();
			return false;
		}
		return true;
	}
} 