import { Request, Response } from 'express';
declare const _default: {
    method: string;
    func: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
};
export default _default;
