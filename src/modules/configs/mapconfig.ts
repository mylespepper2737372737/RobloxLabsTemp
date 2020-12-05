import { ConfigOpts } from '../../library/startup';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { _dirname } from '../constants/directories';
import config from '../../config/default-serverv2-config';
export default (app: IApplicationBuilder, PagesDir: string, EndpointsDir: string, apiName: string, errorpage?: boolean) => {
	return {
		app: app,
		...((config as unknown) as ConfigOpts),
		PagesOpts: {
			path: _dirname + PagesDir,
		},
		EndpointOpts: {
			path: _dirname + EndpointsDir,
			logSetups: true,
			apiName: apiName,
		},
		errorpage: errorpage,
	};
};
