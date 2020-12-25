/*
	FileName: MapControllers.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Looks in a given folder for files that match the structure.

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

import { Express as IApplicationBuilder, Request, Response } from 'express-serve-static-core';
import filestream from 'fs';
import { FASTLOG3, FASTLOG6, FLog, LOGGROUP } from '../modules/Helpers/Log';
import { _dirname } from '../modules/constants/directories';

interface EndpointOpts {
	path?: string;
	logSetups?: boolean;
	apiName?: string;
}
const MapControllers = (app?: IApplicationBuilder, opts?: EndpointOpts): Promise<void> => {
	LOGGROUP(opts.apiName);

	return new Promise((r) => {
		let controllers: string[];

		try {
			controllers = filestream.readdirSync(
				(opts !== undefined ? opts.path : _dirname + '\\controllers') || _dirname + '\\controllers',
			);
		} catch (err) {
			return FASTLOG6(FLog[opts.apiName], err);
		}
		controllers.forEach((v) => {
			if (!v.includes('.js.map') || !v.includes('.d.ts')) {
				let map: {
					default: { dir: string; func: (request: Request, Response: Response) => unknown; method: string };
				};

				try {
					map = require(((opts !== undefined ? opts.path + '\\' : _dirname + '\\controllers\\') || _dirname + '\\controllers\\') +
						v);
				} catch (err) {
					return FASTLOG6(FLog[opts.apiName], err);
				}

				let dir: string;
				let func: (request: Request, Response: Response) => unknown;
				let method: string;
				if (map.default) {
					if (map.default.dir) dir = map.default.dir;
					else return;
					if (map.default.func) func = map.default.func;
					else return;
					if (map.default.method) method = map.default.method.toLowerCase();
					else return;

					try {
						if (method === 'get') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping GET ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.get(dir, func);
						} else if (method === 'head') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping HEAD ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.head(dir, func);
						} else if (method === 'post') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping POST ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.post(dir, func);
						} else if (method === 'put') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping PUT ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.put(dir, func);
						} else if (method === 'delete') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping DELETE ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.delete(dir, func);
						} else if (method === 'connect') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping CONNECT ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.connect(dir, func);
						} else if (method === 'options') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping OPTIONS ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.options(dir, func);
						} else if (method === 'trace') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping TRACE ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.trace(dir, func);
						} else if (method === 'patch') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping PATCH ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.patch(dir, func);
						} else if (method === 'all') {
							if (opts.logSetups)
								FASTLOG3(FLog[opts.apiName], `Mapping ALL ${(opts.apiName ? 'https://' + opts.apiName : '') + dir}`);
							app.all(dir, func);
						} else {
							return FASTLOG6(FLog[opts.apiName], 'Error in requesting controller');
						}
					} catch (err) {
						return FASTLOG6(FLog[opts.apiName], err);
					}
				} else {
					return FASTLOG6(FLog[opts.apiName], `${v} had no default export.`);
				}
			}
		});
		r();
	});
};
export default MapControllers;
