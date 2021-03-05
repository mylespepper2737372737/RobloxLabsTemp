import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { Server as httpserver } from 'http';
import { Server as httpsServer } from 'https';
export declare const ROBLOX_Starter: (app: IApplicationBuilder, name: string) => [httpserver, httpsServer];
