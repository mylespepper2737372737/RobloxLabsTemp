import { Request, Response } from 'express';
declare const _default: {
    method: string;
    func: (request: Request, response: Response) => Promise<void | Response<any, Record<string, any>>>;
};
export default _default;
