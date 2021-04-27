import { Request, Response } from 'express';
import { CountersClient } from '../../../../Assemblies/ApiClients/Roblox.Counters.Client/Implementation/CountersClient';
import { Task } from '../../../../System/Threading/Task';
import { RespondWithA1PXImage } from '../../../../Assemblies/Web/Handling/Roblox.Web.Handling/RespondWithA1PXImage';

export default {
	method: 'all',
	func: async (_request: Request, response: Response): Task<void> => {
		// TODO: Add client things here.
		await CountersClient.IncrementCounter('HTTPSiteVisit', 1);
		return RespondWithA1PXImage(response);
	},
};
