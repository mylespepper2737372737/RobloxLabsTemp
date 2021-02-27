/*
	FileName: MapControllers.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Looks in a given folder for files that match the structure.

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

import { Express as IApplicationBuilder, Request, Response } from 'express-serve-static-core';
import { FASTLOG2, FASTLOG3, FASTLOGS, SFLog, SYNCHRONIZED_LOGGROUP } from '../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { _dirname } from '../Helpers/Constants/Directories';
import { walk } from '../Helpers/WebHelpers/Roblox.Util/Roblox.FileWalker';
import filestream from 'fs';
import Urls from '../Helpers/Constants/Urls';

interface EndpointOpts {
	path?: string;
	logSetups?: boolean;
	apiName?: string;
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

const MapControllers = (app?: IApplicationBuilder, opts?: EndpointOpts): Promise<void> => {
	return new Promise(async (resumeFunc) => {
		const directory = (opts !== undefined ? opts.path : _dirname + '\\Controllers') || _dirname + '\\Controllers';
		if (!filestream.existsSync(directory)) {
			FASTLOG3(
				SFLog[opts.apiName],
				`[SFLog::%s] The directory %s for the api %s was not found, make sure you configured your directory correctly.`,
				opts.apiName,
				directory,
				opts.apiName,
			);
			return resumeFunc();
		}
		const r = walk(directory);
		let count = 0;
		r.forEach((v) => {
			let name = v.replace(directory, '');
			if (name.match(/.+\.js/)) {
				name = name.replace('.js', '');
				name = name.split('_P-').join(':');
				name = name.split('\\').join('/');
				if (name === '/__pageIndex') name = '/';
				let map: {
					default: { func: (request: Request, Response: Response) => unknown; method: string };
				};

				try {
					map = require(v);
				} catch (err) {
					return FASTLOG2(SFLog[opts.apiName], '[SFLog::%s] %s', opts.apiName, err.message);
				}
				let func: (request: Request, Response: Response) => unknown;
				let method: string;
				if (map.default) {
					if (map.default.func) func = map.default.func;
					else return;
					if (map.default.method) method = map.default.method.toLowerCase();
					else return;
					count++;
					try {
						if (method === 'get') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping GET %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.get(name, func);
						} else if (method === 'head') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping HEAD %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.head(name, func);
						} else if (method === 'post') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping POST %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.post(name, func);
						} else if (method === 'put') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping PUT %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.put(name, func);
						} else if (method === 'delete') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping DELETE %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.delete(name, func);
						} else if (method === 'connect') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping CONNECT %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.connect(name, func);
						} else if (method === 'options') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping OPTIONS %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.options(name, func);
						} else if (method === 'trace') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping TRACE %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.trace(name, func);
						} else if (method === 'patch') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping PATCH %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.patch(name, func);
						} else if (method === 'all') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping ALL %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.all(name, func);
						} else {
							return FASTLOGS(SFLog[opts.apiName], '[SFLog::%s] Error requesting Controller.', opts.apiName);
						}
					} catch (err) {
						return FASTLOG2(SFLog[opts.apiName], '[SFLog::%s] %s', opts.apiName, err.message);
					}
				} else {
					return FASTLOGS(SFLog[opts.apiName], '[SFLog::%s] This Controller had no default export.', opts.apiName);
				}
			}
		});
		FASTLOG3(SFLog[opts.apiName], `[SFLog::%s] https://%s has %d controller(s)`, opts.apiName, opts.apiName, count);
		resumeFunc();
	});
};
export default MapControllers;
