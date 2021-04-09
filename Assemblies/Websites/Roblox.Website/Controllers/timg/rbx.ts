import { Request, Response } from 'express';
import { EphemeralCountersClient } from '../../../../ApiClients/Roblox.EphemeralCounters.Client/Implementation/EphemeralCountersClient';
import { Task } from '../../../../Http/Types/Roblox.Http.Types/Task';
import { RespondWithA1PXImage } from '../../../../Util/RespondWithA1PXImage';

export default {
	method: 'all',
	func: async (_request: Request, response: Response): Task<void> => {
		// TODO: Add client things here.
		await EphemeralCountersClient.IncrementCounter('HTTPSiteVist', 1);
		return RespondWithA1PXImage(response);
	},
};
