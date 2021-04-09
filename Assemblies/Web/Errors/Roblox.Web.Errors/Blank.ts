import { Request, Response } from 'express';

export const Blank = (_req: Request, res: Response) => {
	res.status(200).send();
};
