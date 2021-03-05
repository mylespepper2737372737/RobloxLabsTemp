import filestream from 'fs';
interface wssOpts {
    path?: string;
    shouldHandleUpgrade?: boolean;
    apiName?: string;
    logSetups?: boolean;
}
declare const _default: (httpserver: {
    on: (arg0: string, arg1: (r: any, s: any, h: any) => any) => void;
}, httpsServer?: {
    on: (arg0: string, arg1: (r: any, s: any, h: any) => any) => void;
}, opts?: {
    path: filestream.PathLike;
    apiName: string;
    logSetups: any;
} | wssOpts) => Promise<void>;
export = _default;
