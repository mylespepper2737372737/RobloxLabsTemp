/*
	FileName: startup.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: A mock of ASP.NET and Servers.FX

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

	***

	Copyright 2015-2020 MFD

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { json as jparser } from 'express';
import bparser from 'body-parser';
import { OutgoingMessage } from 'http';
import cparser from 'cookie-parser';
import DeveloperExceptionPage from '../global/DeveloperExeptionPage';
import UseRouting from '../global/UseRouting';
import MapControllers from '../global/MapControllers';
import UsePages from '../global/UsePages';

export interface ConfigOpts<R extends OutgoingMessage = OutgoingMessage> {
	app: IApplicationBuilder;

	UseEndpoints?: boolean;
	UseRouting?: boolean;
	RoutingOpts?: {
		caseSensitive?: boolean;
		mergeParams?: boolean;
		strict?: boolean;
	};
	EndpointOpts?: {
		path: string;
		logSetups?: boolean;
		apiName?: string;
	};
	PagesOpts?: {
		path: string;
	};
	UsePages?: boolean;
	PageOpts?: {
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
	};
	errorpage?: boolean;
}
export default abstract class Startup {
	public static readonly Configure = async (opts: ConfigOpts): Promise<void> => {
		try {
			opts.app.disable('etag');
			opts.app.disable('case sensitive routing');
			opts.app.enable('trust proxy');
			opts.app.disable('x-powered-by');
			opts.app.disable('strict routing');
			opts.app.use(cparser(), jparser(), bparser.urlencoded({ extended: false }));
			if (opts.UsePages) {
				await UsePages(opts.app, opts.PagesOpts, opts.PageOpts);
			}
			if (opts.UseRouting) {
				await UseRouting(opts.app, opts.RoutingOpts);
			}
			if (opts.UseEndpoints) {
				await MapControllers(opts.app, opts.EndpointOpts);
			}
			if (opts.errorpage) {
				await DeveloperExceptionPage(opts.app);
			}
		} catch (err) {
			throw new Error(err);
		}
	};
}
