import { Request, Response } from 'express-serve-static-core';
declare const _default: {
    method: string;
    func: (request: Request, response: Response) => Promise<Response<unknown> | void>;
};
export default _default;
