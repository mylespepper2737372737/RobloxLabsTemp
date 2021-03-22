import { Response } from 'express';
declare const _default: {
    method: string;
    func: (_req: {
        method: string;
        url: string;
        headers: any;
    }, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
