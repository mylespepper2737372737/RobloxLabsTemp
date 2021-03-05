/// <reference types="node" />
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { OutgoingMessage } from 'http';
interface PageDirOpts {
    path?: string;
}
interface PageOpts<R extends OutgoingMessage = OutgoingMessage> {
    cacheControl?: boolean;
    dotfiles?: string;
    etag?: boolean;
    extensions?: string[] | false;
    fallthrough?: boolean;
    immutable?: boolean;
    index?: boolean | string | string[];
    lastModified?: boolean;
    maxAge?: number | string;
    redirect?: boolean;
    setHeaders?: (res: R, path: string, stat: unknown) => unknown;
}
declare const UsePages: (app: IApplicationBuilder, opts: PageDirOpts, PagesOpts: PageOpts) => Promise<void>;
export default UsePages;
