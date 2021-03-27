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

SYNCHRONIZED_LOGGROUP(Urls['RobloxWebsite']);
SYNCHRONIZED_LOGGROUP(Urls['ApiProxy']);
SYNCHRONIZED_LOGGROUP(Urls['StaticCDN']);
SYNCHRONIZED_LOGGROUP(Urls['JavaScriptCDN']);
SYNCHRONIZED_LOGGROUP(Urls['CSSCDN']);
SYNCHRONIZED_LOGGROUP(Urls['ImagesCDN']);
SYNCHRONIZED_LOGGROUP(Urls['SetupCDN']);
SYNCHRONIZED_LOGGROUP(Urls['EphemeralCountersService']);
SYNCHRONIZED_LOGGROUP(Urls['TemporaryImagesCDN']);
SYNCHRONIZED_LOGGROUP(Urls['VersionCompatibilityService']);
SYNCHRONIZED_LOGGROUP(Urls['ClientSettingsService']);
SYNCHRONIZED_LOGGROUP(Urls['GameWebsite']);
SYNCHRONIZED_LOGGROUP(Urls['EphemeralCountersV2']);
SYNCHRONIZED_LOGGROUP(Urls['GamePersistenceApi']);
SYNCHRONIZED_LOGGROUP(Urls['ROBLOX_DOSARREST_ORIGIN_CORP']);
SYNCHRONIZED_LOGGROUP(Urls['MarketplaceService']);
SYNCHRONIZED_LOGGROUP(Urls['MetricsApi']);
SYNCHRONIZED_LOGGROUP(Urls['AuthApi']);
SYNCHRONIZED_LOGGROUP(Urls['ApiGatewayService']);
SYNCHRONIZED_LOGGROUP(Urls['LocaleApi']);
SYNCHRONIZED_LOGGROUP(Urls['AbTestingApi']);
SYNCHRONIZED_LOGGROUP(Urls['AbTestingService']);
SYNCHRONIZED_LOGGROUP(Urls['UsersApi']);
SYNCHRONIZED_LOGGROUP(Urls['TwoStepVerificationApi']);
SYNCHRONIZED_LOGGROUP(Urls['LatencyMeasurementsInternalService']);
SYNCHRONIZED_LOGGROUP(Urls['ChatApi']);
SYNCHRONIZED_LOGGROUP(Urls['ContactsApi']);
SYNCHRONIZED_LOGGROUP(Urls['NotificationsApi']);
SYNCHRONIZED_LOGGROUP(Urls['AccountSettingsApi']);
SYNCHRONIZED_LOGGROUP(Urls['AdsApi']);
SYNCHRONIZED_LOGGROUP(Urls['TradesApi']);
SYNCHRONIZED_LOGGROUP(Urls['FriendsApi']);
SYNCHRONIZED_LOGGROUP(Urls['PrivateMessagesApi']);
SYNCHRONIZED_LOGGROUP(Urls['EconomyApi']);
SYNCHRONIZED_LOGGROUP(Urls['GamesApi']);
SYNCHRONIZED_LOGGROUP(Urls['RealTimeApi']);
SYNCHRONIZED_LOGGROUP(Urls['ThumbnailsApi']);
SYNCHRONIZED_LOGGROUP(Urls['PresenceApi']);
SYNCHRONIZED_LOGGROUP(Urls['GroupsApi']);
SYNCHRONIZED_LOGGROUP(Urls['AccountInformationApi']);
SYNCHRONIZED_LOGGROUP(Urls['BadgesApi']);
SYNCHRONIZED_LOGGROUP(Urls['DeveloperForumWebsite']);
SYNCHRONIZED_LOGGROUP(Urls['PremiumFeaturesApi']);
SYNCHRONIZED_LOGGROUP(Urls['ClientSettingsApi']);
SYNCHRONIZED_LOGGROUP(Urls['ClientSettingsCDNApi']);
SYNCHRONIZED_LOGGROUP(Urls['AdConfigurationApi']);
SYNCHRONIZED_LOGGROUP(Urls['ClientTelementryService']);
SYNCHRONIZED_LOGGROUP(Urls['AssetsApi']);
SYNCHRONIZED_LOGGROUP(Urls['AvatarApi']);
SYNCHRONIZED_LOGGROUP(Urls['BillingApi']);
SYNCHRONIZED_LOGGROUP(Urls['CatalogApi']);
SYNCHRONIZED_LOGGROUP(Urls['CdnProvidersApi']);
SYNCHRONIZED_LOGGROUP(Urls['ChatModerationApi']);
SYNCHRONIZED_LOGGROUP(Urls['ContentStoreApi']);
SYNCHRONIZED_LOGGROUP(Urls['DevelopApi']);
SYNCHRONIZED_LOGGROUP(Urls['DiscussionsApi']);
SYNCHRONIZED_LOGGROUP(Urls['EconomyCreatorStatsApi']);
SYNCHRONIZED_LOGGROUP(Urls['EngagementPayoutsApi']);
SYNCHRONIZED_LOGGROUP(Urls['FollowingsApi']);
SYNCHRONIZED_LOGGROUP(Urls['GameInternationalizationApi']);
SYNCHRONIZED_LOGGROUP(Urls['GameJoinApi']);
SYNCHRONIZED_LOGGROUP(Urls['GroupsModerationApi']);
SYNCHRONIZED_LOGGROUP(Urls['InventoryApi']);
SYNCHRONIZED_LOGGROUP(Urls['ItemConfigurationApi']);
SYNCHRONIZED_LOGGROUP(Urls['LocalizationTablesApi']);
SYNCHRONIZED_LOGGROUP(Urls['PointsApi']);
SYNCHRONIZED_LOGGROUP(Urls['PublishApi']);
SYNCHRONIZED_LOGGROUP(Urls['PunishmentsService']);
SYNCHRONIZED_LOGGROUP(Urls['ShareApi']);
SYNCHRONIZED_LOGGROUP(Urls['TextFilterApi']);
SYNCHRONIZED_LOGGROUP(Urls['ThemesApi']);
SYNCHRONIZED_LOGGROUP(Urls['ThumbnailsResizerApi']);
SYNCHRONIZED_LOGGROUP(Urls['TranslationRolesApi']);
SYNCHRONIZED_LOGGROUP(Urls['TranslationsApi']);
SYNCHRONIZED_LOGGROUP(Urls['UserModerationApi']);
SYNCHRONIZED_LOGGROUP(Urls['VoiceApi']);
SYNCHRONIZED_LOGGROUP(Urls['FilesService']);
SYNCHRONIZED_LOGGROUP(Urls['MetricsInternalWebsite']);

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
