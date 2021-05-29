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
import { DFLog, DYNAMIC_LOGGROUP, FASTLOG2, FASTLOG3, FASTLOGS, SFLog, SYNCHRONIZED_LOGGROUP } from '../../Logging/FastLog';
import { __baseDirName } from '../../../../../Common/Constants/Roblox.Common.Constants/Directories';
import filestream from 'fs';
import Urls from '../../../../../Common/Constants/Roblox.Common.Constants/Hosts';
import { Walkers } from '../../Walkers';

interface EndpointOpts {
	path?: string;
	logSetups?: boolean;
	apiName?: string;
}

SYNCHRONIZED_LOGGROUP(Urls['BaseHost']);
SYNCHRONIZED_LOGGROUP(Urls['ApiProxyHost']);
SYNCHRONIZED_LOGGROUP(Urls['StaticCDN']);
SYNCHRONIZED_LOGGROUP(Urls['JavaScriptCDN']);
SYNCHRONIZED_LOGGROUP(Urls['CSSCDN']);
SYNCHRONIZED_LOGGROUP(Urls['ImagesCDN']);
SYNCHRONIZED_LOGGROUP(Urls['SetupCDN']);
SYNCHRONIZED_LOGGROUP(Urls['EphemeralCountersService']);
SYNCHRONIZED_LOGGROUP(Urls['TemporaryImagesCDN']);
SYNCHRONIZED_LOGGROUP(Urls['VersionCompatibilityService']);
SYNCHRONIZED_LOGGROUP(Urls['ClientSettingsService']);
SYNCHRONIZED_LOGGROUP(Urls['AssetGameHost']);
SYNCHRONIZED_LOGGROUP(Urls['EphemeralCountersV2']);
SYNCHRONIZED_LOGGROUP(Urls['GamePersistenceHost']);
SYNCHRONIZED_LOGGROUP(Urls['MarketplaceService']);
SYNCHRONIZED_LOGGROUP(Urls['MetricsHost']);
SYNCHRONIZED_LOGGROUP(Urls['AuthenticationHost']);
SYNCHRONIZED_LOGGROUP(Urls['ApiGatewayHost']);
SYNCHRONIZED_LOGGROUP(Urls['LocaleHost']);
SYNCHRONIZED_LOGGROUP(Urls['AbTestingHost']);
SYNCHRONIZED_LOGGROUP(Urls['AbTestingService']);
SYNCHRONIZED_LOGGROUP(Urls['UsersHost']);
SYNCHRONIZED_LOGGROUP(Urls['TSVHost']);
SYNCHRONIZED_LOGGROUP(Urls['LatencyMeasurementsInternalService']);
SYNCHRONIZED_LOGGROUP(Urls['ChatHost']);
SYNCHRONIZED_LOGGROUP(Urls['ContactsHost']);
SYNCHRONIZED_LOGGROUP(Urls['NotificationsHost']);
SYNCHRONIZED_LOGGROUP(Urls['AccountSettingsHost']);
SYNCHRONIZED_LOGGROUP(Urls['AdsHost']);
SYNCHRONIZED_LOGGROUP(Urls['TradesHost']);
SYNCHRONIZED_LOGGROUP(Urls['FriendsHost']);
SYNCHRONIZED_LOGGROUP(Urls['PrivateMessagesHost']);
SYNCHRONIZED_LOGGROUP(Urls['EconomyHost']);
SYNCHRONIZED_LOGGROUP(Urls['GamesHost']);
SYNCHRONIZED_LOGGROUP(Urls['RealTimeHost']);
SYNCHRONIZED_LOGGROUP(Urls['ThumbsHost']);
SYNCHRONIZED_LOGGROUP(Urls['PresenceHost']);
SYNCHRONIZED_LOGGROUP(Urls['GroupsHost']);
SYNCHRONIZED_LOGGROUP(Urls['AccountInformationHost']);
SYNCHRONIZED_LOGGROUP(Urls['BadgesHost']);
SYNCHRONIZED_LOGGROUP(Urls['DeveloperForumHost']);
SYNCHRONIZED_LOGGROUP(Urls['PremiumFeaturesHost']);
SYNCHRONIZED_LOGGROUP(Urls['ClientSettingsHost']);
SYNCHRONIZED_LOGGROUP(Urls['ClientSettingsCDNHost']);
SYNCHRONIZED_LOGGROUP(Urls['AdConfigurationHost']);
SYNCHRONIZED_LOGGROUP(Urls['ClientTelementryService']);
SYNCHRONIZED_LOGGROUP(Urls['AssetsHost']);
SYNCHRONIZED_LOGGROUP(Urls['AvatarHost']);
SYNCHRONIZED_LOGGROUP(Urls['BillingHost']);
SYNCHRONIZED_LOGGROUP(Urls['CatalogHost']);
SYNCHRONIZED_LOGGROUP(Urls['CdnProvidersHost']);
SYNCHRONIZED_LOGGROUP(Urls['ChatModerationHost']);
SYNCHRONIZED_LOGGROUP(Urls['ContentStoreHost']);
SYNCHRONIZED_LOGGROUP(Urls['DevelopHost']);
SYNCHRONIZED_LOGGROUP(Urls['DiscussionsHost']);
SYNCHRONIZED_LOGGROUP(Urls['EconomyCreatorStatsHost']);
SYNCHRONIZED_LOGGROUP(Urls['EngagementPayoutsHost']);
SYNCHRONIZED_LOGGROUP(Urls['FollowingsHost']);
SYNCHRONIZED_LOGGROUP(Urls['G18NHost']);
SYNCHRONIZED_LOGGROUP(Urls['GameJoinHost']);
SYNCHRONIZED_LOGGROUP(Urls['GroupsModerationHost']);
SYNCHRONIZED_LOGGROUP(Urls['InventoryHost']);
SYNCHRONIZED_LOGGROUP(Urls['ItemConfigurationHost']);
SYNCHRONIZED_LOGGROUP(Urls['LocalizationTablesHost']);
SYNCHRONIZED_LOGGROUP(Urls['PointsHost']);
SYNCHRONIZED_LOGGROUP(Urls['PublishHost']);
SYNCHRONIZED_LOGGROUP(Urls['PunishmentsService']);
SYNCHRONIZED_LOGGROUP(Urls['ShareHost']);
SYNCHRONIZED_LOGGROUP(Urls['TextFilterHost']);
SYNCHRONIZED_LOGGROUP(Urls['ThemesHost']);
SYNCHRONIZED_LOGGROUP(Urls['ThumbnailsResizerHost']);
SYNCHRONIZED_LOGGROUP(Urls['TranslationRolesHost']);
SYNCHRONIZED_LOGGROUP(Urls['TranslationsHost']);
SYNCHRONIZED_LOGGROUP(Urls['UserModerationHost']);
SYNCHRONIZED_LOGGROUP(Urls['VoiceHost']);
SYNCHRONIZED_LOGGROUP(Urls['FilesService']);
SYNCHRONIZED_LOGGROUP(Urls['MetricsInternalWebsite']);

DYNAMIC_LOGGROUP('Tasks');

const MapControllers = (app?: IApplicationBuilder, opts?: EndpointOpts): Promise<void> => {
	return new Promise(async (resumeFunc) => {
		const directory = (opts !== undefined ? opts.path : __baseDirName + '/Controllers') || __baseDirName + '/Controllers';
		if (!filestream.existsSync(directory)) {
			FASTLOG2(
				DFLog('Tasks'),
				`[DFLog::Tasks] The directory %s for the api %s was not found, make sure you configured your directory correctly.`,
				directory,
				opts.apiName,
			);
			return resumeFunc();
		}
		const r = Walkers.FileWalker(directory);
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
