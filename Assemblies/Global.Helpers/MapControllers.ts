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
import {
	DFLog,
	DYNAMIC_LOGGROUP,
	FASTLOG2,
	FASTLOG3,
	FASTLOGS,
	SFLog,
	SYNCHRONIZED_LOGGROUP,
} from '../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { _dirname } from '../Helpers/Constants/Directories';
import { walk } from '../Helpers/WebHelpers/Roblox.Util/Roblox.FileWalker';
import filestream from 'fs';
import Urls from '../Helpers/Constants/Urls';

interface EndpointOpts {
	path?: string;
	logSetups?: boolean;
	apiName?: string;
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

DYNAMIC_LOGGROUP('Tasks');

const MapControllers = (app?: IApplicationBuilder, opts?: EndpointOpts): Promise<void> => {
	return new Promise(async (resumeFunc) => {
		const directory = (opts !== undefined ? opts.path : _dirname + '\\Controllers') || _dirname + '\\Controllers';
		if (!filestream.existsSync(directory)) {
			FASTLOG2(
				DFLog('Tasks'),
				`[DFLog::Tasls] The directory %s for the api %s was not found, make sure you configured your directory correctly.`,
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
