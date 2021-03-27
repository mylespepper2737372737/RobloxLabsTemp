/*
	FileName: Roblox.SSL.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Wrapper for SSL servers and https servers, used as a helper.

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

import https2 from 'spdy';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { Server as httpserver } from 'http';
import { Server as httpsServer } from 'https';
import dotenv from 'dotenv';
import filestream from 'fs';
import { FASTLOG2, SFLog, SYNCHRONIZED_LOGGROUP } from '../Roblox.Util/Roblox.Util.FastLog';
import { _dirname, _sslname } from '../../Constants/Directories';
import Urls from '../../Constants/Urls';

dotenv.config({ path: _dirname + '\\.env' });

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

export const ROBLOX_Starter = (app: IApplicationBuilder, name: string): [httpserver, httpsServer] => {
	try {
		const httpsServer = https2
			.createServer(
				{
					cert: filestream.readFileSync(_sslname + '\\ST4.crt', 'utf-8'),
					key: filestream.readFileSync(_sslname + '\\ST4.key', 'utf-8'),
					passphrase: process.env['ST4_pw'],
				},
				app,
			)
			.listen(443, name, () => FASTLOG2(SFLog[name], `[SFLog::%s] https://%s:443 Started`, name, name));
		const httpServer = app.listen(80, name, () => FASTLOG2(SFLog[name], `[SFLog::%s] http://%s:80 Started`, name, name));
		return [httpServer, httpsServer];
	} catch (err) {
		throw new Error(err);
	}
};
