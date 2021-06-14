const e = {"error":0,"msg":"Success","result":[]}

import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		response.send(e);
	},
};