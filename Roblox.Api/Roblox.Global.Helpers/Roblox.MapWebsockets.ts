/*
	FileName: MapWebsockets.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Looks in a folder for websockets

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

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

import ws from 'ws';
import filestream from 'fs';
import { _dirname } from '../Roblox.Helpers/Roblox.Constants/Roblox.Directories';
import { IncomingMessage, Server as httperver } from 'http';
import { FASTLOG3, FASTLOG6, FLog } from '../Roblox.Helpers/Roblox.Helpers/Roblox.Util/Roblox.Util.FastLog';
import { Server as httpServer } from 'http';

interface wssOpts {
	path?: string;
	shouldHandleUpgrade?: boolean;
	apiName?: string;
	logSetups?: boolean;
}

export = (
	httperver: { on: (arg0: string, arg1: (r: any, s: any, h: any) => any) => void },
	httpServer?: { on: (arg0: string, arg1: (r: any, s: any, h: any) => any) => void },
	opts?: { path: filestream.PathLike; apiName: string; logSetups: any } | wssOpts,
): Promise<void> => {
	return new Promise<void>((resolve: (value?: PromiseLike<void> | void) => void, reject: (reason?: any) => void) => {
		let Controllers: string[];
		const maps: {
			dir: string;
			func: (request: ws, Response: IncomingMessage) => unknown;
		}[] = [];
		try {
			Controllers = filestream.readdirSync((opts !== undefined ? opts.path : _dirname + '\\sockets') || _dirname + '\\sockets');
		} catch (err) {
			return FASTLOG6(FLog[opts.apiName], err.message, true);
		}
		Controllers.forEach((v) => {
			if (!v.includes('.js.map') || !v.includes('.d.ts')) {
				let map: {
					default: { dir: string; func: (request: ws, Response: IncomingMessage) => unknown };
				};

				try {
					map = require(((opts !== undefined ? opts.path + '\\' : _dirname + '\\sockets\\') || _dirname + '\\sockets\\') + v);
				} catch (err) {
					return console.error(err);
				}

				if (map.default) {
					if (!map.default.dir) return;
					if (!map.default.func) return;
					maps.push(map.default);
				} else {
					return reject(`${v} had no default export.`);
				}
			}
		});
		if (httpServer) {
			const wssServer = new ws.Server({ server: <httpServer>httpServer, port: 8000, host: opts.apiName });
			if (opts.logSetups) FASTLOG3(FLog[opts.apiName], `Mapping UPGRADE https://${opts.apiName}:8000`);
			httpServer.on('upgrade', (r, s, h) => {
				let isValid = false;
				maps.forEach((v) => {
					if (r.url.split('?').shift() === v.dir) {
						wssServer.handleUpgrade(r, s, h, (s2) => {
							wssServer.emit('connection', s2, r);
						});
						isValid = true;
					}
				});
				if (!isValid) {
					s.write('HTTP/3.0 404 Socket Not Found\r\n\r\n');
					return s.destroy();
				}
			});
			if (opts.logSetups) FASTLOG3(FLog[opts.apiName], `Mapping CONNECT https://${opts.apiName}:8000`);
			wssServer.on('connection', (s, r) => {
				maps.forEach((v) => {
					if (r.url.split('?').shift() === v.dir) {
						return v.func(s, r);
					}
				});
			});
		}
		const wsServer = new ws.Server({ server: <httperver>httperver, port: 5000, host: opts.apiName });
		if (opts.logSetups) FASTLOG3(FLog[opts.apiName], `Mapping UPGRADE https://${opts.apiName}:5000`);
		httperver.on('upgrade', (r, s, h) => {
			let isValid = false;
			maps.forEach((v) => {
				if (r.url.split('?').shift() === v.dir) {
					wsServer.handleUpgrade(r, s, h, (s2) => {
						wsServer.emit('connection', s2, r);
					});
					isValid = true;
				}
			});
			if (!isValid) {
				s.write('HTTP/3.0 404 Socket Not Found\r\n\r\n');
				return s.destroy();
			}
		});
		if (opts.logSetups) FASTLOG3(FLog[opts.apiName], `Mapping CONNECT https://${opts.apiName}:5000`);
		wsServer.on('connection', (s, r) => {
			maps.forEach((v) => {
				if (r.url.split('?').shift() === v.dir) {
					return v.func(s, r);
				}
			});
		});
		resolve();
	});
};
