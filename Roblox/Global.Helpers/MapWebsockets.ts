/*
	FileName: MapWebsockets.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Looks in a folder for websockets

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

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
import { _dirname } from '../Helpers/Constants/Directories';
import { IncomingMessage, Server as httpserver } from 'http';
import { FASTLOG2, FASTLOG3, SFLog, SYNCHRONIZED_LOGGROUP } from '../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { Server as httpsServer } from 'https';
import Urls from '../Helpers/Constants/Urls';

interface wssOpts {
	path?: string;
	shouldHandleUpgrade?: boolean;
	apiName?: string;
	logSetups?: boolean;
}

SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_WWW']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_API']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_STATIC_CDN']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_JS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CSS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_IMAGES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_SETUP_CDN']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_EPHEMERAL_COUNTERS_API']);
SYNCHRONIZED_LOGGROUP(Urls['DEPRECATED_ROBLOX_TEMPORARY_IMAGES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_VERSION_COMPATIBILITY_API']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CLIENT_SETTINGS_API']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_ASSET_GAME']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_EPHEMERAL_COUNTERS_VERSION_2']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_GAME_PERSISTENCE']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_DOSARREST_ORIGIN_CORP']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_MARKETPLACE_API']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_METRICS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_AUTH']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_APIS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_LOCALE']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_AB_TESTING']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_AB_TESTING_API']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_USERS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_TWO_STEP_VERIFICATION']);
SYNCHRONIZED_LOGGROUP(Urls['SIMULPONG_LATENCY_MEASUREMENTS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CHAT']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CONTACTS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_NOTIFICATIONS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_ACCOUNT_SETTINGS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_ADS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_TRADES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_FRIENDS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_PRIVATE_MESSAGES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_ECONOMY']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_GAMES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_REAL_TIME']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_THUMB_NAILS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_PRESENCE']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_GROUPS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_ACCOUNT_INFORMATION']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_BADGES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_DEVELOPER_FORUM']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_PREMIUM_FEATURES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CLIENT_SETTINGS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CLIENT_SETTINGS_CDN']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_AD_CONFIGURATION']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CLIENT_TELEMENTRY']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_ASSET_DELIVERY']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_AVATAR']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_BILLING']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CATALOG']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CDN_PROVIDERS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CHAT_MODERATION']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_CONTENT_STORE']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_DEVELOP']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_DISCUSSIONS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_ECONOMY_CREATOR_STATS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_ENGAGEMENT_PAYOUTS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_FOLLOWINGS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_GAME_INTERNATIONALIZATION']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_GAME_JOIN']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_GROUPS_MODERATION']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_INVENTORY']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_ITEM_CONFIGURATION']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_LOCALIZATION_TABLES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_POINTS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_PUBLISH']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_PUNISHMENTS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_SHARE']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_TEXT_FILTER']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_THEMES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_THUMBNAILS_RESIZER']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_TRANSLATION_ROLES']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_TRANSLATIONS']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_USER_MODERATION']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_VOICE']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_FILES_API']);
SYNCHRONIZED_LOGGROUP(Urls['SIMULPONG_ROBLOX_TEAM_CITY']);

export = (
	httpserver: { on: (arg0: string, arg1: (r: any, s: any, h: any) => any) => void },
	httpsServer?: { on: (arg0: string, arg1: (r: any, s: any, h: any) => any) => void },
	opts?: { path: filestream.PathLike; apiName: string; logSetups: any } | wssOpts,
): Promise<void> => {
	return new Promise<void>((resolve: (value?: PromiseLike<void> | void) => void, reject: (reason?: any) => void) => {
		let Sockets: string[];
		const maps: {
			dir: string;
			func: (request: ws, Response: IncomingMessage) => unknown;
		}[] = [];
		try {
			Sockets = filestream.readdirSync((opts !== undefined ? opts.path : _dirname + '\\sockets') || _dirname + '\\sockets');
		} catch (err) {
			return FASTLOG2(SFLog[opts.apiName], '[SFLog::%s] %s', opts.apiName, err.message);
		}
		FASTLOG3(SFLog[opts.apiName], `[SFLog::%s] https://%s has %d websocket(s)`, opts.apiName, opts.apiName, Sockets.length);
		Sockets.forEach((v) => {
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
					FASTLOG3(SFLog[opts.apiName], `[SFLog::%s] MAPPING WEBSOCKET wss://%s%s`, opts.apiName, opts.apiName, map.default.dir);
					maps.push(map.default);
				} else {
					return reject(`${v} had no default export.`);
				}
			}
		});
		if (httpsServer) {
			const wssServer = new ws.Server({ server: <httpsServer>httpsServer, port: 8000, host: opts.apiName });
			if (opts.logSetups) FASTLOG2(SFLog[opts.apiName], `[SFLog::%s] MAPPING UPGRADE https://%s:8000`, opts.apiName, opts.apiName);
			httpsServer.on('upgrade', (r, s, h) => {
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
					s.write('https/3.0 404 Socket Not Found\r\n\r\n');
					return s.destroy();
				}
			});
			if (opts.logSetups) FASTLOG2(SFLog[opts.apiName], `[SFLog::%s] MAPPING CONNECT https://%s:8000`, opts.apiName, opts.apiName);
			wssServer.on('connection', (s, r) => {
				maps.forEach((v) => {
					if (r.url.split('?').shift() === v.dir) {
						return v.func(s, r);
					}
				});
			});
		}
		const wsServer = new ws.Server({ server: <httpserver>httpserver, port: 5000, host: opts.apiName });
		if (opts.logSetups) FASTLOG2(SFLog[opts.apiName], `[SFLog::%s] MAPPING UPGRADE http://%s:5000`, opts.apiName, opts.apiName);
		httpserver.on('upgrade', (r, s, h) => {
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
				s.write('https/3.0 404 Socket Not Found\r\n\r\n');
				return s.destroy();
			}
		});
		if (opts.logSetups) FASTLOG2(SFLog[opts.apiName], `[SFLog::%s] MAPPING CONNECT http://%s:5000`, opts.apiName, opts.apiName);
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
