/// <reference types="node" />
import { Express as IApplicationBuilder } from 'express-serve-static-core';
declare const _default: (app: IApplicationBuilder, PagesDir: string, EndpointsDir: string, apiName: string, errorpage?: boolean, fileListings?: boolean) => {
    PagesOpts: {
        path: string;
    };
    EndpointOpts: {
        path: string;
        logSetups: boolean;
        apiName: string;
    };
    errorpage: boolean;
    fileListings: boolean;
    app: IApplicationBuilder;
    UseEndpoints?: boolean;
    UseRouting?: boolean;
    RoutingOpts?: {
        caseSensitive?: boolean;
        mergeParams?: boolean;
        strict?: boolean;
    };
    UsePages?: boolean;
    PageOpts?: {
        cacheControl?: boolean;
        dotfiles?: string;
        etag?: boolean;
        extensions?: false | string[];
        fallthrough?: boolean;
        immutable?: boolean;
        index?: string | boolean | string[];
        lastModified?: boolean;
        maxAge?: string | number;
        redirect?: boolean;
        setHeaders?: (res: import("http").OutgoingMessage, path: string, stat: unknown) => unknown;
    };
    signalr?: boolean;
    hubs?: string[];
};
export default _default;
