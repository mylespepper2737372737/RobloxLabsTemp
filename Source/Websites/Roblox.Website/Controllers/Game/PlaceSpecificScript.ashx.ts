import { Request, Response } from 'express';
import { SendSignedResponse } from '../../../../Assemblies/Data/HashMaps/Roblox.Data.HashMaps/SignData';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		SendSignedResponse('', response);
	},
};
