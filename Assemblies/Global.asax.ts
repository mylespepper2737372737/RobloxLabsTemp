/*
	FileName: Roblox.Global.asax.ts
	Written By: Nikita Nikolaevich Petko,
				Ivan Ivanov Gregrovnich,
				Aleksej Pushnik Grasnich,
				Tomska Arnold Vandrej,
				Tomska Poshkiom Lanska,
				Aleksej Brovim Pushnak,
				Ishka Alemdak Rejor,
				Jack Daniels Alan,
				Alanska Ivanski Vosproshchniki
	File Type: Script
	Description: Copy of ROBLOX's Roblox.Global.asax.cs

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	NOTICE This Application Programming Interface will be hosted on both https://*.sitetest4.robloxlabs.com:443 and https://*.sitetest4.robloxlabs.com:80.
	DEPRECATED DO NOT USE OutgoingMessage.prototype._headers, silence with --no-deprecation

	TODO Add 404 MiddleWare for each individual API

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

// import Roblox.Api.Helpers.Web.Util.ROBLOX_Starter from './Roblox.Helpers/Roblox.Helpers/Roblox.Web.Util/Roblox.Server.Starter';
import {
	ROBLOX_404_API,
	ROBLOX_404_CSS,
	ROBLOX_404_EPHEMERAL_COUNTERS,
	ROBLOX_404_IMAGES,
	ROBLOX_404_JS,
	ROBLOX_404_SETUP_CDN,
	ROBLOX_404_STATIC_CDN,
	DEPRECATED_404_TEMPORARY_IMAGES,
	ROBLOX_404_WWW,
	SIMULPONG_404,
	ROBLOX_404_AB_TESTING,
	Kestrel_404,
} from './ErrorResponders';
import { RobloxLegacy } from './Api';
import IServer, { NextFunction, Request, Response } from 'express';
import {
	DFLog,
	DYNAMIC_LOGVARIABLE,
	FASTFLAGVARIABLE,
	FASTLOG1F,
	FASTLOG2,
	FASTLOGS,
	LOGVARIABLE,
	SYNCHRONIZED_LOGVARIABLE,
} from './Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { DefaultApi404 } from './ErrorResponders/DefaultApi404';
import { DefaultAsp404 } from './ErrorResponders/aspError404';
import { Points } from './MiddleWare/Points';
import { PointsApi } from './MiddleWare/PointsApi';
import { ApiServiceIsAliveValidator } from './MiddleWare/ApiServiceIsAliveValidator';
import ssl from 'sslkeylog';
import { User } from './Platform/Membership/User';
ssl.hookAll();

LOGVARIABLE('GumePersistince', 6);
LOGVARIABLE('TheAdminsPog', 6);
LOGVARIABLE('AandBTusting', 6);
LOGVARIABLE('SIMPLEPING', 6);
LOGVARIABLE('Protocol77', 6);
LOGVARIABLE('DataStoreV2', 7);
LOGVARIABLE('DataStore', 7);
LOGVARIABLE('EphemeralCountersV2', 7);
LOGVARIABLE('EphemeralCounters', 7);
LOGVARIABLE('Stats', 7);
LOGVARIABLE('Grid', 7);
LOGVARIABLE('dmp', 7);
LOGVARIABLE('CsrfAPIV1', 7);
LOGVARIABLE('ClientSettingsAPIV1', 7);
LOGVARIABLE('WWWAuthV1', 7);
LOGVARIABLE('ClientTelementry', 7);
DYNAMIC_LOGVARIABLE('Tasks', 7);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['RobloxWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ApiProxy'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['StaticCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['JavaScriptCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['CSSCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ImagesCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['SetupCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['EphemeralCountersService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['TemporaryImagesCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['VersionCompatibilityService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ClientSettingsService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['GameWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['EphemeralCountersV2'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['GamePersistenceApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_DOSARREST_ORIGIN_CORP'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['MarketplaceService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['MetricsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AuthApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ApiGatewayService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['LocaleApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AbTestingApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AbTestingService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['UsersApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['TwoStepVerificationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['LatencyMeasurementsInternalService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ChatApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ContactsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['NotificationsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AccountSettingsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AdsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['TradesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['FriendsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['PrivateMessagesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['EconomyApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['GamesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['RealTimeApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ThumbnailsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['PresenceApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['GroupsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AccountInformationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['BadgesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['DeveloperForumWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['PremiumFeaturesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ClientSettingsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ClientSettingsCDNApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AdConfigurationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ClientTelementryService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AssetsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AvatarApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['BillingApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['CatalogApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['CdnProvidersApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ChatModerationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ContentStoreApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['DevelopApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['DiscussionsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['EconomyCreatorStatsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['EngagementPayoutsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['FollowingsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['GameInternationalizationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['GameJoinApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['GroupsModerationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['InventoryApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ItemConfigurationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['LocalizationTablesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['PointsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['PublishApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['PunishmentsService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ShareApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['TextFilterApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ThemesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ThumbnailsResizerApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['TranslationRolesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['TranslationsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['UserModerationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['VoiceApi'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['FilesService'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['MetricsInternalWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['AdminWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ComApisCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['PointsService'], 6);

FASTFLAGVARIABLE('RequireGlobalHTTPS', true);

(async () => {
	try {
		await RobloxLegacy.Api.Helpers.Helpers.Sessions.ClearCachedSessions();

		const RobloxWebsiteServer = IServer();
		const StaticCDNServer = IServer();
		const JavaScriptCDNServer = IServer();
		const CSSCDNServer = IServer();
		const ImagesCDNServer = IServer();
		const SetupCDNServer = IServer();
		const ApiProxyServer = IServer();
		const EphemeralCountersServiceServer = IServer();
		const EphemeralCountersV2Server = IServer();
		const TemporaryImagesCDNServer = IServer();
		const VersionCompatibilityServiceServer = IServer();
		const ClientSettingsServiceServer = IServer();
		const RobloxGameWebsiteServer = IServer();
		const GamePersistenceApiServer = IServer();
		const MarketplaceServiceServer = IServer();
		const MetricsApiServer = IServer();
		const ApiGatewayServer = IServer();
		const LocaleApiServer = IServer();
		const AuthApiServer = IServer();
		const AbTestingApiServer = IServer();
		const AbTestingServiceServer = IServer();
		const UsersApiServer = IServer();
		const TwoStepVerficationApiServer = IServer();
		const LatencyMeasurementsInternalServiceServer = IServer();
		const ChatApiServer = IServer();
		const ContactsApiServer = IServer();
		const NotificationsApiServer = IServer();
		const AccountSettingsApiServer = IServer();
		const AdsApiServer = IServer();
		const TradesApiServer = IServer();
		const FriendsApiServer = IServer();
		const PrivateMessagesApiServer = IServer();
		const EconomyApiServer = IServer();
		const GamesApiServer = IServer();
		const RealTimeApiServer = IServer();
		const ThumbnailsApiServer = IServer();
		const PresenceApiServer = IServer();
		const GroupsApiServer = IServer();
		const AccountInformationServer = IServer();
		const BadgesApiServer = IServer();
		const DeveloperForumWebsiteServer = IServer();
		const PremiumFeaturesApiServer = IServer();
		const ClientSettingsApiServer = IServer();
		const ClientSettingsCDNApiServer = IServer();
		const AdConfigurationApiServer = IServer();
		const ClientTelementryServiceServer = IServer();
		const AssetsApi = IServer();
		const AvatarApiServer = IServer();
		const BillingApiServer = IServer();
		const CatalogApiServer = IServer();
		const CdnProvidersApiServer = IServer();
		const ChatModerationServiceServer = IServer();
		const ContentStoreApiServer = IServer();
		const DevelopApiServer = IServer();
		const DiscussionsApiServer = IServer();
		const EconomyCreatorStatsApiServer = IServer();
		const EngagementPayoutsServiceServer = IServer();
		const FollowingsApiServer = IServer();
		const GameInternationalizationApiServer = IServer();
		const GameJoinApiServer = IServer();
		const GroupsModerationServiceServer = IServer();
		const InventoryApiServer = IServer();
		const ItemConfigurationApiService = IServer();
		const LocalizationTablesApiServer = IServer();
		const PointsApiServer = IServer();
		const PublishApiServer = IServer();
		const PunishmentsServiceServer = IServer();
		const MidasShareApiServer = IServer();
		const TextFilterApiServer = IServer();
		const ThemesApiServer = IServer();
		const ThumbnailsResizerApiServer = IServer();
		const TranslationRolesApiServer = IServer();
		const TranslationsApiServer = IServer();
		const UserModerationServiceServer = IServer();
		const VoiceApiServer = IServer();
		const FilesServiceServer = IServer();
		const MetricsInternalWebsiteServer = IServer();
		const AdminWebsiteServer = IServer();
		const ComApisCDNServer = IServer();
		const PointsServiceServer = IServer();

		RobloxWebsiteServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		StaticCDNServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		JavaScriptCDNServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		CSSCDNServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ImagesCDNServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		SetupCDNServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ApiProxyServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		EphemeralCountersServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		EphemeralCountersV2Server.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		TemporaryImagesCDNServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		VersionCompatibilityServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ClientSettingsServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		RobloxGameWebsiteServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		GamePersistenceApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GAMEPERSISTENCE);
		MarketplaceServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		MetricsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ApiGatewayServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.KESTREL);
		LocaleApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		AuthApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		AbTestingApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.ABTESTING);
		AbTestingServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.ABTESTING);
		UsersApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		TwoStepVerficationApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		LatencyMeasurementsInternalServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.SIMULPONG);
		ChatApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ContactsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		NotificationsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		AccountSettingsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		AdsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		TradesApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		FriendsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		PrivateMessagesApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		EconomyApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		GamesApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		RealTimeApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ThumbnailsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		PresenceApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		GroupsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		AccountInformationServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		BadgesApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		DeveloperForumWebsiteServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		PremiumFeaturesApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ClientSettingsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ClientSettingsCDNApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		AdConfigurationApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ClientTelementryServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		AssetsApi.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		AvatarApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		BillingApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		CatalogApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		CdnProvidersApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ChatModerationServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ContentStoreApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		DevelopApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		DiscussionsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		EconomyCreatorStatsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		EngagementPayoutsServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		FollowingsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		GameInternationalizationApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		GameJoinApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		GroupsModerationServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		InventoryApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ItemConfigurationApiService.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		LocalizationTablesApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		PointsApiServer.use(ApiServiceIsAliveValidator, Points);
		PunishmentsServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		MidasShareApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		TextFilterApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ThemesApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ThumbnailsResizerApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		TranslationRolesApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		TranslationsApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		UserModerationServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		PublishApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		VoiceApiServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		FilesServiceServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		MetricsInternalWebsiteServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.SIMULPONG);
		AdminWebsiteServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.ADMINWEBSITE);
		ComApisCDNServer.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.KESTREL);
		PointsServiceServer.use(PointsApi);

		ApiGatewayServer.engine('html', require('ejs').renderFile);
		ApiGatewayServer.set('views', RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\TestViews');
		ApiGatewayServer.set('view engine', 'html');

		RobloxWebsiteServer.engine('html', require('ejs').renderFile);
		RobloxWebsiteServer.set('views', RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\Views\\Roblox.Website');
		RobloxWebsiteServer.set('view engine', 'html');

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				StaticCDNServer,
				'\\StaticPages\\CDN\\Roblox.StaticCDN',
				'\\Assemblies\\Bin\\CDN\\Roblox.StaticCDN\\Controllers',
				RobloxLegacy.Api.Constants.URLS['StaticCDN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				JavaScriptCDNServer,
				'\\StaticPages\\CDN\\Roblox.JavaScriptCDN',
				'\\Assemblies\\Bin\\CDN\\Roblox.JavaScriptCDN\\Controllers',
				RobloxLegacy.Api.Constants.URLS['JavaScriptCDN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				CSSCDNServer,
				'\\StaticPages\\CDN\\Roblox.CSSCDN',
				'\\Assemblies\\Bin\\CDN\\Roblox.CSSCDN\\Controllers',
				RobloxLegacy.Api.Constants.URLS['CSSCDN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ImagesCDNServer,
				'\\StaticPages\\CDN\\Roblox.ImagesCDN',
				'\\Assemblies\\Bin\\CDN\\Roblox.ImagesCDN\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ImagesCDN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ApiProxyServer,
				'\\StaticPages\\Services\\Roblox.ApiProxy.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.ApiProxy.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ApiProxy'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				SetupCDNServer,
				'\\StaticPages\\CDN\\Roblox.SetupCDN',
				'\\Assemblies\\Bin\\CDN\\Roblox.SetupCDN\\Controllers',
				RobloxLegacy.Api.Constants.URLS['SetupCDN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				RobloxWebsiteServer,
				'\\StaticPages\\Websites\\Roblox.Website',
				'\\Assemblies\\Bin\\Websites\\Roblox.Website\\Controllers',
				RobloxLegacy.Api.Constants.URLS['RobloxWebsite'],
				false,
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				EphemeralCountersServiceServer,
				'\\StaticPages\\Services\\Roblox.EphemeralCounters.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.EphemeralCounters.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['EphemeralCountersService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				EphemeralCountersV2Server,
				'\\StaticPages\\ApiSites\\Roblox.EphemeralCounters.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.EphemeralCounters.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['EphemeralCountersV2'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				TemporaryImagesCDNServer,
				'\\StaticPages\\CDN\\Roblox.TemporaryImagesCDN',
				'\\Assemblies\\Bin\\CDN\\Roblox.TemporaryImagesCDN\\Controllers',
				RobloxLegacy.Api.Constants.URLS['TemporaryImagesCDN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				VersionCompatibilityServiceServer,
				'\\StaticPages\\Services\\Roblox.VersionCompatibility.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.VersionCompatibility.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['VersionCompatibilityService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ClientSettingsServiceServer,
				'\\StaticPages\\Services\\Roblox.ClientSettings.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.ClientSettings.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ClientSettingsService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				RobloxGameWebsiteServer,
				'\\StaticPages\\Websites\\Roblox.GameWebsite',
				'\\Assemblies\\Bin\\Websites\\Roblox.GameWebsite\\Controllers',
				RobloxLegacy.Api.Constants.URLS['GameWebsite'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				GamePersistenceApiServer,
				'\\StaticPages\\ApiSites\\Roblox.GamePersistence.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.GamePersistence.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['GamePersistenceApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				MarketplaceServiceServer,
				'\\StaticPages\\Services\\Roblox.Marketplace.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.Marketplace.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['MarketplaceService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				MetricsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Metrics.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Metrics.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['MetricsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AuthApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Auth.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Auth.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AuthApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ApiGatewayServer,
				'\\StaticPages\\Services\\Roblox.ApiGateway.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.ApiGateway.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ApiGatewayService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				LocaleApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Locale.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Locale.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['LocaleApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AbTestingApiServer,
				'\\StaticPages\\ApiSites\\Roblox.AbTesting.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.AbTesting.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AbTestingApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AbTestingServiceServer,
				'\\StaticPages\\Services\\Roblox.AbTesting.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.AbTesting.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AbTestingService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				UsersApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Users.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Users.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['UsersApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				TwoStepVerficationApiServer,
				'\\StaticPages\\ApiSites\\Roblox.TwoStepVerification.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.TwoStepVerification.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['TwoStepVerificationApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				LatencyMeasurementsInternalServiceServer,
				'\\StaticPages\\InternalWebsites\\LatencyMeasurements',
				'\\Assemblies\\Bin\\InternalWebsites\\LatencyMeasurements\\Controllers',
				RobloxLegacy.Api.Constants.URLS['LatencyMeasurementsInternalService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ChatApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Chat.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Chat.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ChatApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ContactsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Contacts.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Contacts.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ContactsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				NotificationsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Notifications.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Notifications.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['NotificationsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AccountSettingsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.AccountSettings.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.AccountSettings.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AccountSettingsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AdsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Ads.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Ads.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AdsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				TradesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Trades.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Trades.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['TradesApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				FriendsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Friends.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Friends.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['FriendsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				PrivateMessagesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.PrivateMessages.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.PrivateMessages.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['PrivateMessagesApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				EconomyApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Economy.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Economy.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['EconomyApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				GamesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Games.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Games.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['GamesApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				RealTimeApiServer,
				'\\StaticPages\\ApiSites\\Roblox.RealTime.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.RealTime.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['RealTimeApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ThumbnailsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Thumbnails.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Thumbnails.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ThumbnailsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				PresenceApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Presence.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Presence.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['PresenceApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				GroupsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Groups.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Groups.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['GroupsApi'],
			),
		);

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AccountInformationServer,
				'\\StaticPages\\ApiSites\\Roblox.AccountInformation.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.AccountInformation.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AccountInformationApi'],
			),
		);

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				BadgesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Badges.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Badges.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['BadgesApi'],
			),
		);

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				DeveloperForumWebsiteServer,
				'\\StaticPages\\Websites\\Roblox.DeveloperForumWebsite',
				'\\Assemblies\\Bin\\Websites\\Roblox.DeveloperForumWebsite\\Controllers',
				RobloxLegacy.Api.Constants.URLS['DeveloperForumWebsite'],
			),
		);

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				PremiumFeaturesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.PremiumFeatures.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.PremiumFeatures.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['PremiumFeaturesApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ClientSettingsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.ClientSettings.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.ClientSettings.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ClientSettingsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ClientSettingsCDNApiServer,
				'\\StaticPages\\ApiSites\\Roblox.ClientSettingsCDN.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.ClientSettingsCDN.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ClientSettingsCDNApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AdConfigurationApiServer,
				'\\StaticPages\\ApiSites\\Roblox.AdConfiguration.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.AdConfiguration.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AdConfigurationApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ClientTelementryServiceServer,
				'\\StaticPages\\Services\\Roblox.ClientTelementry.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.ClientTelementry.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ClientTelementryService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AssetsApi,
				'\\StaticPages\\ApiSites\\Roblox.Assets.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Assets.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AssetsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AvatarApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Avatar.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Avatar.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AvatarApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				BillingApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Billing.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Billing.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['BillingApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				CatalogApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Catalog.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Catalog.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['CatalogApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				CdnProvidersApiServer,
				'\\StaticPages\\ApiSites\\Roblox.CdnProviders.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.CdnProviders.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['CdnProvidersApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ChatModerationServiceServer,
				'\\StaticPages\\ApiSites\\Roblox.ChatModeration.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.ChatModeration.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ChatModerationApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ContentStoreApiServer,
				'\\StaticPages\\ApiSites\\Roblox.ContentStore.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.ContentStore.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ContentStoreApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				DevelopApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Develop.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Develop.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['DevelopApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				DiscussionsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Discussions.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Discussions.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['DiscussionsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				EconomyCreatorStatsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.EconomyCreatorStats.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.EconomyCreatorStats.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['EconomyCreatorStatsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				EngagementPayoutsServiceServer,
				'\\StaticPages\\ApiSites\\Roblox.EngagementPayouts.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.EngagementPayouts.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['EngagementPayoutsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				FollowingsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Followings.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Followings.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['FollowingsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				GameInternationalizationApiServer,
				'\\StaticPages\\ApiSites\\Roblox.GameInternationalization.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.GameInternationalization.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['GameInternationalizationApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				GameJoinApiServer,
				'\\StaticPages\\ApiSites\\Roblox.GameJoin.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.GameJoin.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['GameJoinApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				GroupsModerationServiceServer,
				'\\StaticPages\\ApiSites\\Roblox.GroupsModeration.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.GroupsModeration.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['GroupsModerationApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				InventoryApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Inventory.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Inventory.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['InventoryApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ItemConfigurationApiService,
				'\\StaticPages\\ApiSites\\Roblox.ItemConfiguration.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.ItemConfiguration.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ItemConfigurationApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AdConfigurationApiServer,
				'\\StaticPages\\ApiSites\\Roblox.AdConfiguration.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.AdConfiguration.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AdConfigurationApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				LocalizationTablesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.LocalizationTables.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.LocalizationTables.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['LocalizationTablesApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				PointsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Points.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Points.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['PointsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				PublishApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Publish.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Publish.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['PublishApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				PunishmentsServiceServer,
				'\\StaticPages\\Services\\Roblox.Punishments.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.Punishments.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['PunishmentsService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				MidasShareApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Share.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Share.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ShareApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				TextFilterApiServer,
				'\\StaticPages\\ApiSites\\Roblox.TextFilter.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.TextFilter.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['TextFilterApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ThemesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Themes.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Themes.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ThemesApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ThumbnailsResizerApiServer,
				'\\StaticPages\\ApiSites\\Roblox.ThumbnailsResizer.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.ThumbnailsResizer.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ThumbnailsResizerApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				TranslationRolesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.TranslationRoles.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.TranslationRoles.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['TranslationRolesApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				TranslationsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Translations.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Translations.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['TranslationsApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				UserModerationServiceServer,
				'\\StaticPages\\ApiSites\\Roblox.UserModeration.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.UserModeration.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['UserModerationApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				VoiceApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Voice.Api',
				'\\Assemblies\\Bin\\ApiSites\\Roblox.Voice.Api\\Controllers',
				RobloxLegacy.Api.Constants.URLS['VoiceApi'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				FilesServiceServer,
				'\\StaticPages\\Services\\Roblox.Files.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.Files.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['FilesService'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				MetricsInternalWebsiteServer,
				'\\StaticPages\\InternalWebsites\\MetricsWebsite',
				'\\Assemblies\\Bin\\InternalWebsites\\MetricsWebsite\\Controllers',
				RobloxLegacy.Api.Constants.URLS['MetricsInternalWebsite'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				AdminWebsiteServer,
				'\\StaticPages\\InternalWebsites\\AdminWebsite',
				'\\Assemblies\\Bin\\InternalWebsites\\AdminWebsite\\Controllers',
				RobloxLegacy.Api.Constants.URLS['AdminWebsite'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ComApisCDNServer,
				'\\StaticPages\\CDN\\Roblox.COMApisCDN',
				'\\Assemblies\\Bin\\CDN\\Roblox.COMApisCDN\\Controllers',
				RobloxLegacy.Api.Constants.URLS['ComApisCDN'],
				false,
				true,
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				PointsServiceServer,
				'\\StaticPages\\Services\\Roblox.Points.Service',
				'\\Assemblies\\Bin\\Services\\Roblox.Points.Service\\Controllers',
				RobloxLegacy.Api.Constants.URLS['PointsService'],
			),
		);

		ApiProxyServer.use(ROBLOX_404_API);
		StaticCDNServer.use(ROBLOX_404_STATIC_CDN);
		JavaScriptCDNServer.use(ROBLOX_404_JS);
		CSSCDNServer.use(ROBLOX_404_CSS);
		ImagesCDNServer.use(ROBLOX_404_IMAGES);
		SetupCDNServer.use(ROBLOX_404_SETUP_CDN);
		RobloxWebsiteServer.use(ROBLOX_404_WWW);
		EphemeralCountersServiceServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		EphemeralCountersV2Server.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		TemporaryImagesCDNServer.use(DEPRECATED_404_TEMPORARY_IMAGES);
		VersionCompatibilityServiceServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ClientSettingsServiceServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		RobloxGameWebsiteServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		GamePersistenceApiServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		MarketplaceServiceServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		MetricsApiServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		AuthApiServer.use(ROBLOX_404_API);
		ApiGatewayServer.use(Kestrel_404);
		LocaleApiServer.use(ROBLOX_404_API);
		AbTestingApiServer.use(ROBLOX_404_AB_TESTING);
		AbTestingServiceServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		UsersApiServer.use(ROBLOX_404_API);
		LatencyMeasurementsInternalServiceServer.use(SIMULPONG_404);
		ChatApiServer.use(ROBLOX_404_API);
		ContactsApiServer.use(ROBLOX_404_API);
		NotificationsApiServer.use(ROBLOX_404_API);
		AccountSettingsApiServer.use(ROBLOX_404_API);
		AdsApiServer.use(ROBLOX_404_API);
		TradesApiServer.use(ROBLOX_404_API);
		FriendsApiServer.use(ROBLOX_404_API);
		PrivateMessagesApiServer.use(ROBLOX_404_API);
		EconomyApiServer.use(ROBLOX_404_API);
		GamesApiServer.use(ROBLOX_404_API);
		RealTimeApiServer.use(ROBLOX_404_API);
		ThumbnailsApiServer.use(ROBLOX_404_API);
		PresenceApiServer.use(ROBLOX_404_API);
		GroupsApiServer.use(ROBLOX_404_API);
		AccountInformationServer.use(ROBLOX_404_API);
		BadgesApiServer.use(ROBLOX_404_API);
		DeveloperForumWebsiteServer.use(ROBLOX_404_API);
		PremiumFeaturesApiServer.use(ROBLOX_404_API);
		ClientSettingsApiServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ClientSettingsCDNApiServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		AdConfigurationApiServer.use(ROBLOX_404_API);
		ClientTelementryServiceServer.use(ROBLOX_404_API);
		AssetsApi.use(ROBLOX_404_API);
		AvatarApiServer.use(ROBLOX_404_API);
		BillingApiServer.use(ROBLOX_404_API);
		CatalogApiServer.use(ROBLOX_404_API);
		CdnProvidersApiServer.use(ROBLOX_404_API);
		ChatModerationServiceServer.use(ROBLOX_404_API);
		ContentStoreApiServer.use(ROBLOX_404_API);
		DevelopApiServer.use(ROBLOX_404_API);
		DiscussionsApiServer.use(ROBLOX_404_API);
		EconomyCreatorStatsApiServer.use(ROBLOX_404_API);
		EngagementPayoutsServiceServer.use(ROBLOX_404_API);
		FollowingsApiServer.use(ROBLOX_404_API);
		GameInternationalizationApiServer.use(ROBLOX_404_API);
		GameJoinApiServer.use(ROBLOX_404_API);
		GroupsModerationServiceServer.use(ROBLOX_404_API);
		InventoryApiServer.use(ROBLOX_404_API);
		ItemConfigurationApiService.use(ROBLOX_404_API);
		LocalizationTablesApiServer.use(ROBLOX_404_API);
		PointsApiServer.use(DefaultApi404);
		PunishmentsServiceServer.use(ROBLOX_404_API);
		MidasShareApiServer.use(ROBLOX_404_API);
		TextFilterApiServer.use(ROBLOX_404_API);
		ThemesApiServer.use(ROBLOX_404_API);
		ThumbnailsResizerApiServer.use(ROBLOX_404_API);
		TranslationRolesApiServer.use(ROBLOX_404_API);
		TranslationsApiServer.use(ROBLOX_404_API);
		UserModerationServiceServer.use(ROBLOX_404_API);
		PublishApiServer.use(ROBLOX_404_API);
		VoiceApiServer.use(ROBLOX_404_API);
		FilesServiceServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		MetricsInternalWebsiteServer.use(SIMULPONG_404);
		AdminWebsiteServer.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ComApisCDNServer.use(Kestrel_404);
		PointsServiceServer.use(DefaultAsp404);

		RobloxWebsiteServer.use(async (error: Error, request: Request, response: Response, next: NextFunction) => {
			const user = await User.GetById(1);
			return response.status(500).render('Error/InternalServerError', {
				isUserAuthenicated: user !== null,
				authenticatedUser: { ...user, LanguageCode: 'en_us', LanguageName: 'English', Theme: 'dark' } || null,
				sessionUser: {
					LanguageCode: 'en_us',
					LanguageName: 'English',
					Device: {
						DeviceName: 'computer',
						IsInApp: false,
						IsDesktop: true,
						IsPhone: false,
						IsTablet: false,
						IsConsole: false,
						IsAndroidApp: false,
						IsIosApp: false,
						IsUWPApp: false,
						IsXboxApp: false,
						IsAmazonApp: false,
						IsWin32App: false,
						IsStudio: false,
						IsGameClientBrowser: false,
						IsIosDevice: false,
						IsAndroidDevice: false,
						IsUniversalApp: false,
					},
				},
				MachineId: 'AWA-1447',
				Error: {
					/* Place a generic stack in here until the request-error-id gets utilized. */
					Message: error.message,
					Stack: error.stack,
					Source: 'Roblox.Web.RobloxWebSite.Controllers.RequestErrorController',
					Function: 'Void RequestError(System.String, System.String, System.Int32)',
				},
				globalMeta: {
					Experiments: {
						DisplayNamesEnabled: true,
					},
				},
			});
		});

		await (async () => {
			try {
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ImagesCDNServer, RobloxLegacy.Api.Constants.URLS['ImagesCDN']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(RobloxWebsiteServer, RobloxLegacy.Api.Constants.URLS['RobloxWebsite']);
				const [ROBLOX_API_HTTP, ROBLOX_API_HTTPS] = RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ApiProxyServer,
					RobloxLegacy.Api.Constants.URLS['ApiProxy'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(StaticCDNServer, RobloxLegacy.Api.Constants.URLS['StaticCDN']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(JavaScriptCDNServer, RobloxLegacy.Api.Constants.URLS['JavaScriptCDN']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(CSSCDNServer, RobloxLegacy.Api.Constants.URLS['CSSCDN']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(SetupCDNServer, RobloxLegacy.Api.Constants.URLS['SetupCDN']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					TemporaryImagesCDNServer,
					RobloxLegacy.Api.Constants.URLS['TemporaryImagesCDN'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					VersionCompatibilityServiceServer,
					RobloxLegacy.Api.Constants.URLS['VersionCompatibilityService'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ClientSettingsServiceServer,
					RobloxLegacy.Api.Constants.URLS['ClientSettingsService'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(RobloxGameWebsiteServer, RobloxLegacy.Api.Constants.URLS['GameWebsite']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					EphemeralCountersServiceServer,
					RobloxLegacy.Api.Constants.URLS['EphemeralCountersService'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					EphemeralCountersV2Server,
					RobloxLegacy.Api.Constants.URLS['EphemeralCountersV2'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					GamePersistenceApiServer,
					RobloxLegacy.Api.Constants.URLS['GamePersistenceApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(MetricsApiServer, RobloxLegacy.Api.Constants.URLS['MetricsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(AuthApiServer, RobloxLegacy.Api.Constants.URLS['AuthApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ApiGatewayServer, RobloxLegacy.Api.Constants.URLS['ApiGatewayService']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(LocaleApiServer, RobloxLegacy.Api.Constants.URLS['LocaleApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					MarketplaceServiceServer,
					RobloxLegacy.Api.Constants.URLS['MarketplaceService'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(AbTestingApiServer, RobloxLegacy.Api.Constants.URLS['AbTestingApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					AbTestingServiceServer,
					RobloxLegacy.Api.Constants.URLS['AbTestingService'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(UsersApiServer, RobloxLegacy.Api.Constants.URLS['UsersApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					TwoStepVerficationApiServer,
					RobloxLegacy.Api.Constants.URLS['TwoStepVerificationApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					LatencyMeasurementsInternalServiceServer,
					RobloxLegacy.Api.Constants.URLS['LatencyMeasurementsInternalService'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ChatApiServer, RobloxLegacy.Api.Constants.URLS['ChatApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ContactsApiServer, RobloxLegacy.Api.Constants.URLS['ContactsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					NotificationsApiServer,
					RobloxLegacy.Api.Constants.URLS['NotificationsApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					AccountSettingsApiServer,
					RobloxLegacy.Api.Constants.URLS['AccountSettingsApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(AdsApiServer, RobloxLegacy.Api.Constants.URLS['AdsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(TradesApiServer, RobloxLegacy.Api.Constants.URLS['TradesApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(FriendsApiServer, RobloxLegacy.Api.Constants.URLS['FriendsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					PrivateMessagesApiServer,
					RobloxLegacy.Api.Constants.URLS['PrivateMessagesApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(EconomyApiServer, RobloxLegacy.Api.Constants.URLS['EconomyApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(GamesApiServer, RobloxLegacy.Api.Constants.URLS['GamesApi']);
				const [ROBLOX_REAL_TIME_HTTP, ROBLOX_REAL_TIME_HTTPS] = RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					RealTimeApiServer,
					RobloxLegacy.Api.Constants.URLS['RealTimeApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ThumbnailsApiServer, RobloxLegacy.Api.Constants.URLS['ThumbnailsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(PresenceApiServer, RobloxLegacy.Api.Constants.URLS['PresenceApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(GroupsApiServer, RobloxLegacy.Api.Constants.URLS['GroupsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					AccountInformationServer,
					RobloxLegacy.Api.Constants.URLS['AccountInformationApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(BadgesApiServer, RobloxLegacy.Api.Constants.URLS['BadgesApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					DeveloperForumWebsiteServer,
					RobloxLegacy.Api.Constants.URLS['DeveloperForumWebsite'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					PremiumFeaturesApiServer,
					RobloxLegacy.Api.Constants.URLS['PremiumFeaturesApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ClientSettingsApiServer,
					RobloxLegacy.Api.Constants.URLS['ClientSettingsApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ClientSettingsCDNApiServer,
					RobloxLegacy.Api.Constants.URLS['ClientSettingsCDNApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					AdConfigurationApiServer,
					RobloxLegacy.Api.Constants.URLS['AdConfigurationApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ClientTelementryServiceServer,
					RobloxLegacy.Api.Constants.URLS['ClientTelementryService'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(AssetsApi, RobloxLegacy.Api.Constants.URLS['AssetsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(AvatarApiServer, RobloxLegacy.Api.Constants.URLS['AvatarApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(BillingApiServer, RobloxLegacy.Api.Constants.URLS['BillingApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(CatalogApiServer, RobloxLegacy.Api.Constants.URLS['CatalogApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(CdnProvidersApiServer, RobloxLegacy.Api.Constants.URLS['CdnProvidersApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ChatModerationServiceServer,
					RobloxLegacy.Api.Constants.URLS['ChatModerationApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ContentStoreApiServer, RobloxLegacy.Api.Constants.URLS['ContentStoreApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(DevelopApiServer, RobloxLegacy.Api.Constants.URLS['DevelopApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(DiscussionsApiServer, RobloxLegacy.Api.Constants.URLS['DiscussionsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					EconomyCreatorStatsApiServer,
					RobloxLegacy.Api.Constants.URLS['EconomyCreatorStatsApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					EngagementPayoutsServiceServer,
					RobloxLegacy.Api.Constants.URLS['EngagementPayoutsApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(FollowingsApiServer, RobloxLegacy.Api.Constants.URLS['FollowingsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					GameInternationalizationApiServer,
					RobloxLegacy.Api.Constants.URLS['GameInternationalizationApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(GameJoinApiServer, RobloxLegacy.Api.Constants.URLS['GameJoinApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					GroupsModerationServiceServer,
					RobloxLegacy.Api.Constants.URLS['GroupsModerationApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(InventoryApiServer, RobloxLegacy.Api.Constants.URLS['InventoryApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ItemConfigurationApiService,
					RobloxLegacy.Api.Constants.URLS['ItemConfigurationApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					LocalizationTablesApiServer,
					RobloxLegacy.Api.Constants.URLS['LocalizationTablesApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(PointsApiServer, RobloxLegacy.Api.Constants.URLS['PointsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(PublishApiServer, RobloxLegacy.Api.Constants.URLS['PublishApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					PunishmentsServiceServer,
					RobloxLegacy.Api.Constants.URLS['PunishmentsService'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(MidasShareApiServer, RobloxLegacy.Api.Constants.URLS['ShareApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(TextFilterApiServer, RobloxLegacy.Api.Constants.URLS['TextFilterApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ThemesApiServer, RobloxLegacy.Api.Constants.URLS['ThemesApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ThumbnailsResizerApiServer,
					RobloxLegacy.Api.Constants.URLS['ThumbnailsResizerApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					TranslationRolesApiServer,
					RobloxLegacy.Api.Constants.URLS['TranslationRolesApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(TranslationsApiServer, RobloxLegacy.Api.Constants.URLS['TranslationsApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					UserModerationServiceServer,
					RobloxLegacy.Api.Constants.URLS['UserModerationApi'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(VoiceApiServer, RobloxLegacy.Api.Constants.URLS['VoiceApi']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(FilesServiceServer, RobloxLegacy.Api.Constants.URLS['FilesService']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					MetricsInternalWebsiteServer,
					RobloxLegacy.Api.Constants.URLS['MetricsInternalWebsite'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(AdminWebsiteServer, RobloxLegacy.Api.Constants.URLS['AdminWebsite']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ComApisCDNServer, RobloxLegacy.Api.Constants.URLS['ComApisCDN']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(PointsServiceServer, RobloxLegacy.Api.Constants.URLS['PointsService']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_SignalR_Config_Helper(
					ROBLOX_API_HTTP,
					ROBLOX_API_HTTPS,
					'\\Assemblies\\Bin\\WebSockets\\Roblox.Api',
					RobloxLegacy.Api.Constants.URLS.ApiProxy,
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_SignalR_Config_Helper(
					ROBLOX_REAL_TIME_HTTP,
					ROBLOX_REAL_TIME_HTTPS,
					'\\Assemblies\\Bin\\WebSockets\\Roblox.RealTime',
					RobloxLegacy.Api.Constants.URLS.RealTimeApi,
				);
				FASTLOG1F(
					DFLog('Tasks'),
					'[DFLog::Tasks] There are %d Services running...',
					Object.keys(RobloxLegacy.Api.Constants.URLS).length,
				);
			} catch (e) {
				return FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Error: %s, Stack Trace: %s`, e.message, e.stack);
			}
		})();
	} catch (e) {
		return FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Error: %s, Stack Trace: %s`, e.message, e.stack);
	}
})();

process.stdin.resume();
function exitHandler(options: { exit: boolean; error: boolean; message?: string; code?: number }) {
	if (options.exit) {
		if (options.error) FASTLOGS(DFLog('Tasks'), `[DFLog::Tasks] %s`, options.message);
		if (options.message) FASTLOGS(DFLog('Tasks'), `[DFLog::Tasks] %s`, options.message);
		process.exit();
	}
}
process.on('SIGINT', exitHandler.bind(null, { exit: true, message: 'SIGINT on server' }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true, message: 'SIGUSR1 on server' }));
process.on('beforeExit', exitHandler.bind(null, { exit: true, message: 'Exit Services' }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true, message: 'SIGUSR2 on server' }));
process.on('uncaughtException', (e) => {
	exitHandler({ exit: true, error: true, message: `Name: ${e.name}, Reason: ${e.message}, Stack Trace: ${e.stack}` });
});
