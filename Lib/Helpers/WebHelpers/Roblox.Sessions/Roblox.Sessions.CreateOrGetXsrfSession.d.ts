import { Response } from 'express-serve-static-core';
export declare const CreateOrGetXsrfSession: (AuthToken?: string, ip?: string, token?: string | string[], response?: Response, isXsrfEndpoint?: boolean) => boolean | void;
