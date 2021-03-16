import { Response } from 'express';
import { DFFlag, DYNAMIC_FASTFLAGVARIABLE } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { IUser } from '../../../Platform/Membership/IUser';
import { IUniverse } from '../../../Platform/Universes/IUniverse';

DYNAMIC_FASTFLAGVARIABLE('PointsServiceEnabled', true);

export namespace PointsService {
	export function HandleGetAllTimePoints(user: IUser, universe: IUniverse, response: Response) {
		if (!AskIfWeAreAvailable(response)) return;
		// Just make this do nothing for the time being; aka. echo back the user and universe, with an alltimescore of 0
		return response.status(200).send({ IUser: user, IUniverse: universe, allTimeScore: 0 });
	}

	export function AskIfWeAreAvailable(response: Response): boolean {
		if (!DFFlag('PointsServiceEnabled')) {
			response.status(503).send();
			return false;
		}
		return true;
	}
}
