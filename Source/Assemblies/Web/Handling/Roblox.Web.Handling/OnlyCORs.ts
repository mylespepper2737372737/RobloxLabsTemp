import { NextFunction, Request, RequestHandler, Response } from 'express';
import { OriginMasterDescriptive } from '../../Util/Roblox.Web.Util/OriginMaster';

export const OnlyCORs = (host: string) =>
	((request: Request, response: Response, resumeFunction: NextFunction) => {
		response.header(
			'Access-Control-Allow-Headers',
			'Origin, Referer, X-Requested-With, Content-Type, X-CSRF-TOKEN, Pragma, Cache-Control, expires',
		);
		response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		OriginMasterDescriptive.Do(host, request.headers['origin'], request.protocol, response);

		return resumeFunction();
	}) as RequestHandler;
