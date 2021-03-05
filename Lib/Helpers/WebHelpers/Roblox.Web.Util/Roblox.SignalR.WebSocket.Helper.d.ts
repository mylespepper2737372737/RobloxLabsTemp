/// <reference types="node" />
import { Server as httpserver } from 'http';
import { Server as httpsServer } from 'https';
export declare const ROBLOX_SignalR_Config_Helper: (httpserver: httpserver, httpsServer: httpsServer, dir: string, apiName: string) => Promise<void>;
