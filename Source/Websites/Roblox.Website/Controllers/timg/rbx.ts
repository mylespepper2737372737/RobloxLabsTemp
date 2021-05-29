import { Request, Response } from 'express';
import { CountersClientV2 } from '../../../../Assemblies/ApiClients/Roblox.Counters.Client/Implementation/CountersClient';
import { Task } from '../../../../System/Threading/Task';
import { RespondWithA1PXImage } from '../../../../Assemblies/Web/Handling/Roblox.Web.Handling/RespondWithA1PXImage';

export default {
	method: 'all',
	func: async (_request: Request, response: Response): Task<void> => {
		// TODO: Add client things here.
		await CountersClientV2.IncrementCounter('HTTPSiteVisit', 1);
		return RespondWithA1PXImage(response);
	},
};
