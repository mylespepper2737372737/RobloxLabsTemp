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
import { Server as Httpserver } from 'http';
import https, { Server as HttpsServer } from 'https';
import dotenv from 'dotenv';
import filestream from 'fs';
import { DFFlag, FASTLOG3, SFLog, SYNCHRONIZED_LOGGROUP } from '../../Util/Roblox.Web.Util/Logging/FastLog';
import { __baseDirName, __sslDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';
import Urls from '../../../Common/Constants/Roblox.Common.Constants/Hosts';

dotenv.config({ path: __baseDirName + '/.env' });

SYNCHRONIZED_LOGGROUP(Urls['WebHost']);
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

export const ROBLOX_Starter = (
	app: IApplicationBuilder,
	name: string,
	useHttps: bool = true,
	httpPort: int = 80,
	httpsPort: int = 443,
): [Httpserver, HttpsServer] => {
	try {
		let httpsServer: HttpsServer;
		if (useHttps)
			httpsServer = (DFFlag('GlobalHTTP2Enabled') ? https2 : https)
				.createServer(
					{
						cert: filestream.readFileSync(__sslDirName + '/ST4.crt', 'utf-8'),
						key: filestream.readFileSync(__sslDirName + '/ST4.key', 'utf-8'),
						ca: [filestream.readFileSync(__sslDirName + '/rootCA.crt', 'utf-8')],
						passphrase: process.env['ST4_pw'],
					},
					app,
				)
				.listen(httpsPort, name, () => FASTLOG3(SFLog[name], `[SFLog::%s] https://%s:%d Started`, name, name, httpsPort));
		const httpServer = app.listen(httpPort, name, () =>
			FASTLOG3(SFLog[name], `[SFLog::%s] http://%s:%d Started`, name, name, httpPort),
		);
		return [httpServer, httpsServer];
	} catch (err) {
		throw new Error(err);
	}
};
