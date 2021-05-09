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

	NOTICE This Application Programming Interface will be hosted on both https://*.sitetest4.robloxlabs.com:443 and http://*.sitetest4.robloxlabs.com:80.
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

import IServer, { NextFunction, Request, Response } from 'express';
import {
	DFFlag,
	DFLog,
	DFString,
	DYNAMIC_LOGVARIABLE,
	FASTFLAGVARIABLE,
	FASTLOG1F,
	FASTLOG2,
	FASTLOGS,
	LOGVARIABLE,
	SYNCHRONIZED_LOGVARIABLE,
} from './Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { DefaultApi404 } from './Assemblies/Web/Errors/Roblox.Web.Errors/DefaultApi404';
import { DefaultAsp404 } from './Assemblies/Web/Errors/Roblox.Web.Errors/aspError404';
import { Points } from './Assemblies/Web/Handling/Roblox.Web.Handling/Points';
import { PointsApi } from './Assemblies/Web/Handling/Roblox.Web.Handling/PointsApi';
import { ApiServiceIsAliveValidator } from './Assemblies/Web/Handling/Roblox.Web.Handling/ApiServiceIsAliveValidator';
import ssl from 'sslkeylog';
import { User } from './Assemblies/Platform/Membership/Roblox.Platform.Membership/User';
import { GetValueFromFormDataString } from './Assemblies/Common/KeyValueMapping/Roblox.Common.KeyValueMapping/GetValueFromFormDataString';
import { UsersApi } from './Assemblies/Web/Handling/Roblox.Web.Handling/UsersApi';
import { EphemeralCountersApi } from './Assemblies/Web/Handling/Roblox.Web.Handling/EphemeralCountersApi';
import { DataWebsite } from './Assemblies/Web/Handling/Roblox.Web.Handling/DataWebsite';
import { NotFoundRedirect } from './Assemblies/Web/Errors/Roblox.Web.Errors/NotFoundRedirect';
import { DefaultAspx404 } from './Assemblies/Web/Errors/Roblox.Web.Errors/aspxError404';
import { InternalModerationWebsitesMiddleware } from './Assemblies/Web/Handling/Roblox.Web.Handling/InternalModerationWebsitesMiddleware';
import { Kestrel } from './Assemblies/Web/Handling/Roblox.Web.Handling/Kestrel';
import { SimulPingMiddleware } from './Assemblies/Web/Handling/Roblox.Web.Handling/SimulPingMiddleWare';
import { Blank } from './Assemblies/Web/Errors/Roblox.Web.Errors/Blank';
import { VCS } from './Assemblies/Web/Handling/Roblox.Web.Handling/VCS';
import { DefaultServiceError } from './Assemblies/Web/Errors/Roblox.Web.Errors/ServiceError';
import { RCSS } from './Assemblies/Web/Handling/Roblox.Web.Handling/RCSS';
import { ApiProxy404 } from './Assemblies/Web/Errors/Roblox.Web.Errors/ApiProxy404';
import { ApiProxyHandler } from './Assemblies/Web/Handling/Roblox.Web.Handling/ApiProxyHandler';
import { CookieHandler } from './Assemblies/Web/Handling/Roblox.Web.Handling/CookieHandler';
import stack from 'stack-trace';
import { ErrorsClient } from './Assemblies/Web/Util/Roblox.Web.Util/ErrorsClient';
import { GlobalMiddleware } from './Assemblies/Web/Handling/Roblox.Web.Handling/SiteTest4.Global.Middleware';
import { GamePersistenceMiddleware } from './Assemblies/Web/Handling/Roblox.Web.Handling/GamePersistenceMiddleWare';
import { AbTestingMiddleWare } from './Assemblies/Web/Handling/Roblox.Web.Handling/AbTestingMiddleWare';
import { MetadataBuilder } from './Assemblies/Common/Configuration/Roblox.Common.Configuration/MetadataBuilder';
import { SystemSDK } from './Assemblies/Web/Util/Roblox.Web.Util/Setup/Lib/SystemSDK';
import { ClearCachedSessions } from './Assemblies/Caching/Sessions/Roblox.Caching.Sessions/ClearCachedSessions';
import { ROBLOX_Starter } from './Assemblies/Web/Servers/Roblox.Web.Servers/ServerStarterUtil';
import { SignalRSetup } from './Assemblies/Web/SignalR/Roblox.Web,SignalR/SignalRSetup';
import { __baseDirName } from './Assemblies/Common/Constants/Roblox.Common.Constants/Directories';
import { CDN } from './Assemblies/Web/Errors/Roblox.Web.Errors/CDN';
import { WWW } from './Assemblies/Web/Errors/Roblox.Web.Errors/WWW';
import Urls from './Assemblies/Common/Constants/Roblox.Common.Constants/Urls';
import { Kestrel404 } from './Assemblies/Web/Errors/Roblox.Web.Errors/Kestrel';
import { Exception } from './System/Exception';
ssl.hookAll();

LOGVARIABLE('GumePersistince', 6);
LOGVARIABLE('TheInternalSystem', 6);
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
SYNCHRONIZED_LOGVARIABLE(Urls['RobloxWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ApiProxy'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['StaticCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['JavaScriptCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['CSSCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ImagesCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['SetupCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['EphemeralCountersService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['TemporaryImagesCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['VersionCompatibilityService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ClientSettingsService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['GameWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['EphemeralCountersV2'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['GamePersistenceApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['MarketplaceService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['MetricsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AuthApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ApiGatewayService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['LocaleApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AbTestingApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AbTestingService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['UsersApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['TwoStepVerificationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['LatencyMeasurementsInternalService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ChatApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ContactsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['NotificationsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AccountSettingsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AdsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['TradesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['FriendsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['PrivateMessagesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['EconomyApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['GamesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['RealTimeApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ThumbnailsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['PresenceApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['GroupsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AccountInformationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['BadgesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['DeveloperForumWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['PremiumFeaturesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ClientSettingsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ClientSettingsCDNApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AdConfigurationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ClientTelementryService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AssetsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AvatarApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['BillingApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['CatalogApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['CdnProvidersApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ChatModerationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ContentStoreApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['DevelopApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['DiscussionsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['EconomyCreatorStatsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['EngagementPayoutsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['FollowingsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['GameInternationalizationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['GameJoinApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['GroupsModerationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['InventoryApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ItemConfigurationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['LocalizationTablesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['PointsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['PublishApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['PunishmentsService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ShareApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['TextFilterApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ThemesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ThumbnailsResizerApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['TranslationRolesApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['TranslationsApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['UserModerationApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['VoiceApi'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['FilesService'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['MetricsInternalWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['AdminWebsite'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['ComApisCDN'], 6);
SYNCHRONIZED_LOGVARIABLE(Urls['PointsService'], 6);

FASTFLAGVARIABLE('RequireGlobalHTTPS', true);

(async () => {
	try {
		await ClearCachedSessions();

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
		const UsersServiceServer = IServer();
		const DataWebsiteServer = IServer();
		const CSWebsiteServer = IServer();

		RobloxWebsiteServer.use(GlobalMiddleware);
		StaticCDNServer.use(GlobalMiddleware);
		JavaScriptCDNServer.use(GlobalMiddleware);
		CSSCDNServer.use(GlobalMiddleware);
		ImagesCDNServer.use(GlobalMiddleware);
		SetupCDNServer.use(GlobalMiddleware);
		ApiProxyServer.use(CookieHandler, ApiServiceIsAliveValidator, ApiProxyHandler);
		EphemeralCountersServiceServer.use(EphemeralCountersApi);
		EphemeralCountersV2Server.use(EphemeralCountersApi);
		TemporaryImagesCDNServer.use(GlobalMiddleware);
		VersionCompatibilityServiceServer.use(VCS);
		ClientSettingsServiceServer.use(RCSS);
		RobloxGameWebsiteServer.use(GlobalMiddleware);
		GamePersistenceApiServer.use(GamePersistenceMiddleware);
		MarketplaceServiceServer.use(GlobalMiddleware);
		MetricsApiServer.use(GlobalMiddleware);
		ApiGatewayServer.use(Kestrel);
		LocaleApiServer.use(GlobalMiddleware);
		AuthApiServer.use(GlobalMiddleware);
		AbTestingApiServer.use(AbTestingMiddleWare);
		AbTestingServiceServer.use(AbTestingMiddleWare);
		UsersApiServer.use(GlobalMiddleware);
		TwoStepVerficationApiServer.use(GlobalMiddleware);
		LatencyMeasurementsInternalServiceServer.use(SimulPingMiddleware);
		ChatApiServer.use(GlobalMiddleware);
		ContactsApiServer.use(GlobalMiddleware);
		NotificationsApiServer.use(GlobalMiddleware);
		AccountSettingsApiServer.use(GlobalMiddleware);
		AdsApiServer.use(GlobalMiddleware);
		TradesApiServer.use(GlobalMiddleware);
		FriendsApiServer.use(GlobalMiddleware);
		PrivateMessagesApiServer.use(GlobalMiddleware);
		EconomyApiServer.use(GlobalMiddleware);
		GamesApiServer.use(GlobalMiddleware);
		RealTimeApiServer.use(GlobalMiddleware);
		ThumbnailsApiServer.use(GlobalMiddleware);
		PresenceApiServer.use(GlobalMiddleware);
		GroupsApiServer.use(GlobalMiddleware);
		AccountInformationServer.use(GlobalMiddleware);
		BadgesApiServer.use(GlobalMiddleware);
		DeveloperForumWebsiteServer.use(GlobalMiddleware);
		PremiumFeaturesApiServer.use(GlobalMiddleware);
		ClientSettingsApiServer.use(GlobalMiddleware);
		ClientSettingsCDNApiServer.use(GlobalMiddleware);
		AdConfigurationApiServer.use(GlobalMiddleware);
		ClientTelementryServiceServer.use(GlobalMiddleware);
		AssetsApi.use(GlobalMiddleware);
		AvatarApiServer.use(GlobalMiddleware);
		BillingApiServer.use(GlobalMiddleware);
		CatalogApiServer.use(GlobalMiddleware);
		CdnProvidersApiServer.use(GlobalMiddleware);
		ChatModerationServiceServer.use(GlobalMiddleware);
		ContentStoreApiServer.use(GlobalMiddleware);
		DevelopApiServer.use(GlobalMiddleware);
		DiscussionsApiServer.use(GlobalMiddleware);
		EconomyCreatorStatsApiServer.use(GlobalMiddleware);
		EngagementPayoutsServiceServer.use(GlobalMiddleware);
		FollowingsApiServer.use(GlobalMiddleware);
		GameInternationalizationApiServer.use(GlobalMiddleware);
		GameJoinApiServer.use(GlobalMiddleware);
		GroupsModerationServiceServer.use(GlobalMiddleware);
		InventoryApiServer.use(GlobalMiddleware);
		ItemConfigurationApiService.use(GlobalMiddleware);
		LocalizationTablesApiServer.use(GlobalMiddleware);
		PointsApiServer.use(ApiServiceIsAliveValidator, Points);
		PunishmentsServiceServer.use(GlobalMiddleware);
		MidasShareApiServer.use(GlobalMiddleware);
		TextFilterApiServer.use(GlobalMiddleware);
		ThemesApiServer.use(GlobalMiddleware);
		ThumbnailsResizerApiServer.use(GlobalMiddleware);
		TranslationRolesApiServer.use(GlobalMiddleware);
		TranslationsApiServer.use(GlobalMiddleware);
		UserModerationServiceServer.use(GlobalMiddleware);
		PublishApiServer.use(GlobalMiddleware);
		VoiceApiServer.use(GlobalMiddleware);
		FilesServiceServer.use(GlobalMiddleware);
		MetricsInternalWebsiteServer.use(SimulPingMiddleware);
		AdminWebsiteServer.use(InternalModerationWebsitesMiddleware);
		CSWebsiteServer.use(InternalModerationWebsitesMiddleware);
		ComApisCDNServer.use(Kestrel);
		PointsServiceServer.use(PointsApi);
		UsersServiceServer.use(UsersApi);
		DataWebsiteServer.use(DataWebsite);

		ApiGatewayServer.engine('html', require('ejs').renderFile);
		ApiGatewayServer.set('views', __baseDirName + '\\TestViews');
		ApiGatewayServer.set('view engine', 'html');

		RobloxWebsiteServer.engine('html', require('ejs').renderFile);
		RobloxWebsiteServer.set('views', __baseDirName + '\\Views\\Roblox.Website');
		RobloxWebsiteServer.set('view engine', 'html');

		AdminWebsiteServer.engine('html', require('ejs').renderFile);
		AdminWebsiteServer.set('views', [__baseDirName + '\\Views\\ASPX', __baseDirName + '\\Views\\Roblox.AdminWebsite']);
		AdminWebsiteServer.set('view engine', 'html');

		MetricsInternalWebsiteServer.engine('html', require('ejs').renderFile);
		MetricsInternalWebsiteServer.set('views', [__baseDirName + '\\Views\\ASPX']);
		MetricsInternalWebsiteServer.set('view engine', 'html');

		CSWebsiteServer.engine('html', require('ejs').renderFile);
		CSWebsiteServer.set('views', [__baseDirName + '\\Views\\ASPX', __baseDirName + '\\Views\\Roblox.CSWebsite']);
		CSWebsiteServer.set('view engine', 'html');

		EphemeralCountersServiceServer.engine('html', require('ejs').renderFile);
		EphemeralCountersServiceServer.set('views', [
			__baseDirName + '\\Views\\ASPX',
			__baseDirName + '\\Views\\Roblox.EphemeralCounters.Service',
		]);
		EphemeralCountersServiceServer.set('view engine', 'html');

		EphemeralCountersV2Server.engine('html', require('ejs').renderFile);
		EphemeralCountersV2Server.set('views', [
			__baseDirName + '\\Views\\ASPX',
			__baseDirName + '\\Views\\Roblox.EphemeralCounters.Service',
		]);
		EphemeralCountersV2Server.set('view engine', 'html');

		UsersServiceServer.engine('html', require('ejs').renderFile);
		UsersServiceServer.set('views', [__baseDirName + '\\Views\\ASPX', __baseDirName + '\\Views\\Roblox.Users.Service']);
		UsersServiceServer.set('view engine', 'html');

		ClientSettingsServiceServer.engine('html', require('ejs').renderFile);
		ClientSettingsServiceServer.set('views', [__baseDirName + '\\Views\\ASPX']);
		ClientSettingsServiceServer.set('view engine', 'html');

		VersionCompatibilityServiceServer.engine('html', require('ejs').renderFile);
		VersionCompatibilityServiceServer.set('views', [__baseDirName + '\\Views\\ASPX']);
		VersionCompatibilityServiceServer.set('view engine', 'html');

		AbTestingServiceServer.engine('html', require('ejs').renderFile);
		AbTestingServiceServer.set('views', [__baseDirName + '\\Views\\ASPX']);
		AbTestingServiceServer.set('view engine', 'html');

		ComApisCDNServer.engine('html', require('ejs').renderFile);
		ComApisCDNServer.set('views', [__baseDirName + '\\Views\\ASPX']);
		ComApisCDNServer.set('view engine', 'html');

		await SystemSDK.Configure(
			MetadataBuilder(
				StaticCDNServer,
				'\\StaticPages\\CDN\\Roblox.StaticCDN',
				'\\Source\\Bin\\CDN\\Roblox.StaticCDN\\Controllers',
				Urls['StaticCDN'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				JavaScriptCDNServer,
				'\\StaticPages\\CDN\\Roblox.JavaScriptCDN',
				'\\Source\\Bin\\CDN\\Roblox.JavaScriptCDN\\Controllers',
				Urls['JavaScriptCDN'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				CSSCDNServer,
				'\\StaticPages\\CDN\\Roblox.CSSCDN',
				'\\Source\\Bin\\CDN\\Roblox.CSSCDN\\Controllers',
				Urls['CSSCDN'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ImagesCDNServer,
				'\\StaticPages\\CDN\\Roblox.ImagesCDN',
				'\\Source\\Bin\\CDN\\Roblox.ImagesCDN\\Controllers',
				Urls['ImagesCDN'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ApiProxyServer,
				'\\StaticPages\\Services\\Roblox.ApiProxy.Service',
				'\\Source\\Bin\\Services\\Roblox.ApiProxy.Service\\Controllers',
				Urls['ApiProxy'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				SetupCDNServer,
				'\\StaticPages\\CDN\\Roblox.SetupCDN',
				'\\Source\\Bin\\CDN\\Roblox.SetupCDN\\Controllers',
				Urls['SetupCDN'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				RobloxWebsiteServer,
				'\\StaticPages\\Websites\\Roblox.Website',
				'\\Source\\Bin\\Websites\\Roblox.Website\\Controllers',
				Urls['RobloxWebsite'],
				false,
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				EphemeralCountersServiceServer,
				'\\StaticPages\\Services\\Roblox.EphemeralCounters.Service',
				'\\Source\\Bin\\Services\\Roblox.EphemeralCounters.Service\\Controllers',
				Urls['EphemeralCountersService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				EphemeralCountersV2Server,
				'\\StaticPages\\ApiSites\\Roblox.EphemeralCounters.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.EphemeralCounters.Api\\Controllers',
				Urls['EphemeralCountersV2'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				TemporaryImagesCDNServer,
				'\\StaticPages\\CDN\\Roblox.TemporaryImagesCDN',
				'\\Source\\Bin\\CDN\\Roblox.TemporaryImagesCDN\\Controllers',
				Urls['TemporaryImagesCDN'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				VersionCompatibilityServiceServer,
				'\\StaticPages\\Services\\Roblox.VersionCompatibility.Service',
				'\\Source\\Bin\\Services\\Roblox.VersionCompatibility.Service\\Controllers',
				Urls['VersionCompatibilityService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ClientSettingsServiceServer,
				'\\StaticPages\\Services\\Roblox.ClientSettings.Service',
				'\\Source\\Bin\\Services\\Roblox.ClientSettings.Service\\Controllers',
				Urls['ClientSettingsService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				RobloxGameWebsiteServer,
				'\\StaticPages\\Websites\\Roblox.GameWebsite',
				'\\Source\\Bin\\Websites\\Roblox.GameWebsite\\Controllers',
				Urls['GameWebsite'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				GamePersistenceApiServer,
				'\\StaticPages\\ApiSites\\Roblox.GamePersistence.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.GamePersistence.Api\\Controllers',
				Urls['GamePersistenceApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				MarketplaceServiceServer,
				'\\StaticPages\\Services\\Roblox.Marketplace.Service',
				'\\Source\\Bin\\Services\\Roblox.Marketplace.Service\\Controllers',
				Urls['MarketplaceService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				MetricsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Metrics.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Metrics.Api\\Controllers',
				Urls['MetricsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AuthApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Auth.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Auth.Api\\Controllers',
				Urls['AuthApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ApiGatewayServer,
				'\\StaticPages\\Services\\Roblox.ApiGateway.Service',
				'\\Source\\Bin\\Services\\Roblox.ApiGateway.Service\\Controllers',
				Urls['ApiGatewayService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				LocaleApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Locale.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Locale.Api\\Controllers',
				Urls['LocaleApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AbTestingApiServer,
				'\\StaticPages\\ApiSites\\Roblox.AbTesting.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.AbTesting.Api\\Controllers',
				Urls['AbTestingApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AbTestingServiceServer,
				'\\StaticPages\\Services\\Roblox.AbTesting.Service',
				'\\Source\\Bin\\Services\\Roblox.AbTesting.Service\\Controllers',
				Urls['AbTestingService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				UsersApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Users.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Users.Api\\Controllers',
				Urls['UsersApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				TwoStepVerficationApiServer,
				'\\StaticPages\\ApiSites\\Roblox.TwoStepVerification.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.TwoStepVerification.Api\\Controllers',
				Urls['TwoStepVerificationApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				LatencyMeasurementsInternalServiceServer,
				'\\StaticPages\\InternalWebsites\\LatencyMeasurements',
				'\\Source\\Bin\\InternalWebsites\\LatencyMeasurements\\Controllers',
				Urls['LatencyMeasurementsInternalService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ChatApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Chat.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Chat.Api\\Controllers',
				Urls['ChatApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ContactsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Contacts.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Contacts.Api\\Controllers',
				Urls['ContactsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				NotificationsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Notifications.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Notifications.Api\\Controllers',
				Urls['NotificationsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AccountSettingsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.AccountSettings.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.AccountSettings.Api\\Controllers',
				Urls['AccountSettingsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AdsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Ads.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Ads.Api\\Controllers',
				Urls['AdsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				TradesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Trades.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Trades.Api\\Controllers',
				Urls['TradesApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				FriendsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Friends.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Friends.Api\\Controllers',
				Urls['FriendsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				PrivateMessagesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.PrivateMessages.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.PrivateMessages.Api\\Controllers',
				Urls['PrivateMessagesApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				EconomyApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Economy.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Economy.Api\\Controllers',
				Urls['EconomyApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				GamesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Games.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Games.Api\\Controllers',
				Urls['GamesApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				RealTimeApiServer,
				'\\StaticPages\\ApiSites\\Roblox.RealTime.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.RealTime.Api\\Controllers',
				Urls['RealTimeApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ThumbnailsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Thumbnails.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Thumbnails.Api\\Controllers',
				Urls['ThumbnailsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				PresenceApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Presence.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Presence.Api\\Controllers',
				Urls['PresenceApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				GroupsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Groups.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Groups.Api\\Controllers',
				Urls['GroupsApi'],
			),
		);

		await SystemSDK.Configure(
			MetadataBuilder(
				AccountInformationServer,
				'\\StaticPages\\ApiSites\\Roblox.AccountInformation.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.AccountInformation.Api\\Controllers',
				Urls['AccountInformationApi'],
			),
		);

		await SystemSDK.Configure(
			MetadataBuilder(
				BadgesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Badges.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Badges.Api\\Controllers',
				Urls['BadgesApi'],
			),
		);

		await SystemSDK.Configure(
			MetadataBuilder(
				DeveloperForumWebsiteServer,
				'\\StaticPages\\Websites\\Roblox.DeveloperForumWebsite',
				'\\Source\\Bin\\Websites\\Roblox.DeveloperForumWebsite\\Controllers',
				Urls['DeveloperForumWebsite'],
			),
		);

		await SystemSDK.Configure(
			MetadataBuilder(
				PremiumFeaturesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.PremiumFeatures.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.PremiumFeatures.Api\\Controllers',
				Urls['PremiumFeaturesApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ClientSettingsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.ClientSettings.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.ClientSettings.Api\\Controllers',
				Urls['ClientSettingsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ClientSettingsCDNApiServer,
				'\\StaticPages\\ApiSites\\Roblox.ClientSettingsCDN.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.ClientSettingsCDN.Api\\Controllers',
				Urls['ClientSettingsCDNApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AdConfigurationApiServer,
				'\\StaticPages\\ApiSites\\Roblox.AdConfiguration.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.AdConfiguration.Api\\Controllers',
				Urls['AdConfigurationApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ClientTelementryServiceServer,
				'\\StaticPages\\Services\\Roblox.ClientTelementry.Service',
				'\\Source\\Bin\\Services\\Roblox.ClientTelementry.Service\\Controllers',
				Urls['ClientTelementryService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AssetsApi,
				'\\StaticPages\\ApiSites\\Roblox.Assets.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Assets.Api\\Controllers',
				Urls['AssetsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AvatarApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Avatar.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Avatar.Api\\Controllers',
				Urls['AvatarApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				BillingApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Billing.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Billing.Api\\Controllers',
				Urls['BillingApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				CatalogApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Catalog.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Catalog.Api\\Controllers',
				Urls['CatalogApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				CdnProvidersApiServer,
				'\\StaticPages\\ApiSites\\Roblox.CdnProviders.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.CdnProviders.Api\\Controllers',
				Urls['CdnProvidersApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ChatModerationServiceServer,
				'\\StaticPages\\ApiSites\\Roblox.ChatModeration.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.ChatModeration.Api\\Controllers',
				Urls['ChatModerationApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ContentStoreApiServer,
				'\\StaticPages\\ApiSites\\Roblox.ContentStore.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.ContentStore.Api\\Controllers',
				Urls['ContentStoreApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				DevelopApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Develop.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Develop.Api\\Controllers',
				Urls['DevelopApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				DiscussionsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Discussions.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Discussions.Api\\Controllers',
				Urls['DiscussionsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				EconomyCreatorStatsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.EconomyCreatorStats.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.EconomyCreatorStats.Api\\Controllers',
				Urls['EconomyCreatorStatsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				EngagementPayoutsServiceServer,
				'\\StaticPages\\ApiSites\\Roblox.EngagementPayouts.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.EngagementPayouts.Api\\Controllers',
				Urls['EngagementPayoutsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				FollowingsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Followings.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Followings.Api\\Controllers',
				Urls['FollowingsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				GameInternationalizationApiServer,
				'\\StaticPages\\ApiSites\\Roblox.GameInternationalization.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.GameInternationalization.Api\\Controllers',
				Urls['GameInternationalizationApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				GameJoinApiServer,
				'\\StaticPages\\ApiSites\\Roblox.GameJoin.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.GameJoin.Api\\Controllers',
				Urls['GameJoinApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				GroupsModerationServiceServer,
				'\\StaticPages\\ApiSites\\Roblox.GroupsModeration.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.GroupsModeration.Api\\Controllers',
				Urls['GroupsModerationApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				InventoryApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Inventory.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Inventory.Api\\Controllers',
				Urls['InventoryApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ItemConfigurationApiService,
				'\\StaticPages\\ApiSites\\Roblox.ItemConfiguration.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.ItemConfiguration.Api\\Controllers',
				Urls['ItemConfigurationApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AdConfigurationApiServer,
				'\\StaticPages\\ApiSites\\Roblox.AdConfiguration.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.AdConfiguration.Api\\Controllers',
				Urls['AdConfigurationApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				LocalizationTablesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.LocalizationTables.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.LocalizationTables.Api\\Controllers',
				Urls['LocalizationTablesApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				PointsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Points.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Points.Api\\Controllers',
				Urls['PointsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				PublishApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Publish.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Publish.Api\\Controllers',
				Urls['PublishApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				PunishmentsServiceServer,
				'\\StaticPages\\Services\\Roblox.Punishments.Service',
				'\\Source\\Bin\\Services\\Roblox.Punishments.Service\\Controllers',
				Urls['PunishmentsService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				MidasShareApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Share.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Share.Api\\Controllers',
				Urls['ShareApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				TextFilterApiServer,
				'\\StaticPages\\ApiSites\\Roblox.TextFilter.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.TextFilter.Api\\Controllers',
				Urls['TextFilterApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ThemesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Themes.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Themes.Api\\Controllers',
				Urls['ThemesApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ThumbnailsResizerApiServer,
				'\\StaticPages\\ApiSites\\Roblox.ThumbnailsResizer.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.ThumbnailsResizer.Api\\Controllers',
				Urls['ThumbnailsResizerApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				TranslationRolesApiServer,
				'\\StaticPages\\ApiSites\\Roblox.TranslationRoles.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.TranslationRoles.Api\\Controllers',
				Urls['TranslationRolesApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				TranslationsApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Translations.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Translations.Api\\Controllers',
				Urls['TranslationsApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				UserModerationServiceServer,
				'\\StaticPages\\ApiSites\\Roblox.UserModeration.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.UserModeration.Api\\Controllers',
				Urls['UserModerationApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				VoiceApiServer,
				'\\StaticPages\\ApiSites\\Roblox.Voice.Api',
				'\\Source\\Bin\\ApiSites\\Roblox.Voice.Api\\Controllers',
				Urls['VoiceApi'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				FilesServiceServer,
				'\\StaticPages\\Services\\Roblox.Files.Service',
				'\\Source\\Bin\\Services\\Roblox.Files.Service\\Controllers',
				Urls['FilesService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				MetricsInternalWebsiteServer,
				'\\StaticPages\\InternalWebsites\\MetricsWebsite',
				'\\Source\\Bin\\InternalWebsites\\MetricsWebsite\\Controllers',
				Urls['MetricsInternalWebsite'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				AdminWebsiteServer,
				'\\StaticPages\\InternalWebsites\\AdminWebsite',
				'\\Source\\Bin\\InternalWebsites\\AdminWebsite\\Controllers',
				Urls['AdminWebsite'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				CSWebsiteServer,
				'\\StaticPages\\InternalWebsites\\CSWebsite',
				'\\Source\\Bin\\InternalWebsites\\CSWebsite\\Controllers',
				Urls['CSWebsite'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				ComApisCDNServer,
				'\\StaticPages\\CDN\\Roblox.COMApisCDN',
				'\\Source\\Bin\\CDN\\Roblox.COMApisCDN\\Controllers',
				Urls['ComApisCDN'],
				false,
				false,
				true,
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				PointsServiceServer,
				'\\StaticPages\\Services\\Roblox.Points.Service',
				'\\Source\\Bin\\Services\\Roblox.Points.Service\\Controllers',
				Urls['PointsService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				UsersServiceServer,
				'\\StaticPages\\Services\\Roblox.Users.Service',
				'\\Source\\Bin\\Services\\Roblox.Users.Service\\Controllers',
				Urls['UsersService'],
			),
		);
		await SystemSDK.Configure(
			MetadataBuilder(
				DataWebsiteServer,
				'\\StaticPages\\Websites\\Roblox.Data.Website',
				'\\Source\\Bin\\Websites\\Roblox.Data.Website\\Controllers',
				Urls['DataWebsite'],
			),
		);

		ApiProxyServer.use(ApiProxy404);
		StaticCDNServer.use(CDN);
		JavaScriptCDNServer.use(CDN);
		CSSCDNServer.use(CDN);
		ImagesCDNServer.use(CDN);
		SetupCDNServer.use(CDN);
		RobloxWebsiteServer.use(WWW);
		EphemeralCountersServiceServer.use(DefaultAsp404);
		EphemeralCountersV2Server.use(DefaultAsp404);
		TemporaryImagesCDNServer.use(CDN);
		VersionCompatibilityServiceServer.use(DefaultServiceError);
		ClientSettingsServiceServer.use(DefaultAsp404);
		RobloxGameWebsiteServer.use(NotFoundRedirect);
		GamePersistenceApiServer.use(DefaultAsp404);
		MarketplaceServiceServer.use(DefaultAsp404);
		MetricsApiServer.use(DefaultAsp404);
		AuthApiServer.use(DefaultApi404);
		ApiGatewayServer.use(Kestrel404);
		LocaleApiServer.use(DefaultApi404);
		AbTestingApiServer.use(DefaultApi404);
		AbTestingServiceServer.use(DefaultAsp404);
		UsersApiServer.use(DefaultApi404);
		LatencyMeasurementsInternalServiceServer.use(Blank);
		ChatApiServer.use(DefaultApi404);
		ContactsApiServer.use(DefaultApi404);
		NotificationsApiServer.use(DefaultApi404);
		AccountSettingsApiServer.use(DefaultApi404);
		AdsApiServer.use(DefaultApi404);
		TradesApiServer.use(DefaultApi404);
		FriendsApiServer.use(DefaultApi404);
		PrivateMessagesApiServer.use(DefaultApi404);
		EconomyApiServer.use(DefaultApi404);
		GamesApiServer.use(DefaultApi404);
		RealTimeApiServer.use(DefaultApi404);
		ThumbnailsApiServer.use(DefaultApi404);
		PresenceApiServer.use(DefaultApi404);
		GroupsApiServer.use(DefaultApi404);
		AccountInformationServer.use(DefaultApi404);
		BadgesApiServer.use(DefaultApi404);
		DeveloperForumWebsiteServer.use(DefaultApi404);
		PremiumFeaturesApiServer.use(DefaultApi404);
		ClientSettingsApiServer.use(DefaultAsp404);
		ClientSettingsCDNApiServer.use(DefaultAsp404);
		AdConfigurationApiServer.use(DefaultApi404);
		ClientTelementryServiceServer.use(DefaultApi404);
		AssetsApi.use(DefaultApi404);
		AvatarApiServer.use(DefaultApi404);
		BillingApiServer.use(DefaultApi404);
		CatalogApiServer.use(DefaultApi404);
		CdnProvidersApiServer.use(DefaultApi404);
		ChatModerationServiceServer.use(DefaultApi404);
		ContentStoreApiServer.use(DefaultApi404);
		DevelopApiServer.use(DefaultApi404);
		DiscussionsApiServer.use(DefaultApi404);
		EconomyCreatorStatsApiServer.use(DefaultApi404);
		EngagementPayoutsServiceServer.use(DefaultApi404);
		FollowingsApiServer.use(DefaultApi404);
		GameInternationalizationApiServer.use(DefaultApi404);
		GameJoinApiServer.use(DefaultApi404);
		GroupsModerationServiceServer.use(DefaultApi404);
		InventoryApiServer.use(DefaultApi404);
		ItemConfigurationApiService.use(DefaultApi404);
		LocalizationTablesApiServer.use(DefaultApi404);
		PointsApiServer.use(DefaultApi404);
		PunishmentsServiceServer.use(DefaultApi404);
		MidasShareApiServer.use(DefaultApi404);
		TextFilterApiServer.use(DefaultApi404);
		ThemesApiServer.use(DefaultApi404);
		ThumbnailsResizerApiServer.use(DefaultApi404);
		TranslationRolesApiServer.use(DefaultApi404);
		TranslationsApiServer.use(DefaultApi404);
		UserModerationServiceServer.use(DefaultApi404);
		PublishApiServer.use(DefaultApi404);
		VoiceApiServer.use(DefaultApi404);
		FilesServiceServer.use(DefaultAsp404);
		MetricsInternalWebsiteServer.use(DefaultAspx404);
		AdminWebsiteServer.use(DefaultAsp404);
		CSWebsiteServer.use(DefaultAsp404);
		ComApisCDNServer.use(Kestrel404);
		PointsServiceServer.use(DefaultAsp404);
		UsersServiceServer.use(DefaultAsp404);
		DataWebsiteServer.use(NotFoundRedirect);

		EphemeralCountersServiceServer.use((error: Error, request: Request, response: Response, next: NextFunction) => {
			const StackTrace = stack.parse(error);
			response.status(500).render('ASPXDetailed500', {
				pageMeta: {
					Exception: {
						Type: error.toString().split(':').shift(),
						What: error.message,
						StackTrace: error.stack.replace(error.toString() + '\n', ''),
						Code: ErrorsClient.GetErrorLine(error),
						ShowCode: true,
						SourceFile: StackTrace[0].getFileName(),
						SourceLine: StackTrace[0].getLineNumber(),
					},
				},
			});
		});

		UsersServiceServer.use((error: Error, request: Request, response: Response, next: NextFunction) => {
			const StackTrace = stack.parse(error);
			response.status(500).render('ASPXDetailed500', {
				pageMeta: {
					Exception: {
						Type: error.toString().split(':').shift(),
						What: error.message,
						StackTrace: error.stack.replace(error.toString() + '\n', ''),
						Code: ErrorsClient.GetErrorLine(error),
						ShowCode: true,
						SourceFile: StackTrace[0].getFileName(),
						SourceLine: StackTrace[0].getLineNumber(),
					},
				},
			});
		});

		AbTestingServiceServer.use((error: Error, request: Request, response: Response, next: NextFunction) => {
			const StackTrace = stack.parse(error);
			response.status(500).render('ASPXDetailed500', {
				pageMeta: {
					Exception: {
						Type: error.toString().split(':').shift(),
						What: error.message,
						StackTrace: error.stack.replace(error.toString() + '\n', ''),
						Code: ErrorsClient.GetErrorLine(error),
						ShowCode: true,
						SourceFile: StackTrace[0].getFileName(),
						SourceLine: StackTrace[0].getLineNumber(),
					},
				},
			});
		});

		ComApisCDNServer.use((error: Error, request: Request, response: Response, next: NextFunction) => {
			const StackTrace = stack.parse(error);
			response.status(500).render('ASPXDetailed500', {
				pageMeta: {
					Exception: {
						Type: error.toString().split(':').shift(),
						What: error.message,
						StackTrace: error.stack.replace(error.toString() + '\n', ''),
						Code: ErrorsClient.GetErrorLine(error),
						ShowCode: true,
						SourceFile: StackTrace[0].getFileName(),
						SourceLine: StackTrace[0].getLineNumber(),
					},
				},
			});
		});

		AdminWebsiteServer.use((error: Error, request: Request, response: Response, next: NextFunction) => {
			const StackTrace = stack.parse(error);
			response.status(500).render('ASPXDetailed500', {
				pageMeta: {
					Exception: {
						Type: error.toString().split(':').shift(),
						What: error.message,
						StackTrace: error.stack.replace(error.toString() + '\n', ''),
						Code: ErrorsClient.GetErrorLine(error),
						ShowCode: true,
						SourceFile: StackTrace[0].getFileName(),
						SourceLine: StackTrace[0].getLineNumber(),
					},
				},
			});
		});

		RobloxWebsiteServer.use(async (error: Error, request: Request, response: Response, next: NextFunction) => {
			FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Error: %s, Stack Trace: %s`, error.message, error.stack);

			let cookie = GetValueFromFormDataString('.ROBLOSECURITY', request.headers.cookie);
			const authenticatedUser = await User.GetByCookie(cookie);
			if (!authenticatedUser && cookie !== undefined) response.clearCookie('.ROBLOSECURITY', { domain: 'sitetest4.robloxlabs.com' });
			return response.status(500).render('Error/InternalServerError', {
				isUserAuthenicated: authenticatedUser !== null,
				authenticatedUser: { ...authenticatedUser, LanguageCode: 'en_us', LanguageName: 'English', Theme: 'dark' } || null,
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
				MachineId: 'WEB1447',
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
				pageMeta: {
					banner: {
						Enabled: DFFlag('IsBannerEnabled'),
						Text: DFString('SiteBanner'),
					},
				},
			});
		});

		await (async () => {
			try {
				ROBLOX_Starter(ImagesCDNServer, Urls['ImagesCDN']);
				ROBLOX_Starter(RobloxWebsiteServer, Urls['RobloxWebsite']);
				const [ROBLOX_API_HTTP, ROBLOX_API_HTTPS] = ROBLOX_Starter(ApiProxyServer, Urls['ApiProxy']);
				ROBLOX_Starter(StaticCDNServer, Urls['StaticCDN']);
				ROBLOX_Starter(JavaScriptCDNServer, Urls['JavaScriptCDN']);
				ROBLOX_Starter(CSSCDNServer, Urls['CSSCDN']);
				ROBLOX_Starter(SetupCDNServer, Urls['SetupCDN']);
				ROBLOX_Starter(TemporaryImagesCDNServer, Urls['TemporaryImagesCDN']);
				ROBLOX_Starter(VersionCompatibilityServiceServer, Urls['VersionCompatibilityService']);
				ROBLOX_Starter(ClientSettingsServiceServer, Urls['ClientSettingsService']);
				ROBLOX_Starter(RobloxGameWebsiteServer, Urls['GameWebsite']);
				ROBLOX_Starter(EphemeralCountersServiceServer, Urls['EphemeralCountersService']);
				ROBLOX_Starter(EphemeralCountersV2Server, Urls['EphemeralCountersV2']);
				ROBLOX_Starter(GamePersistenceApiServer, Urls['GamePersistenceApi']);
				ROBLOX_Starter(MetricsApiServer, Urls['MetricsApi']);
				ROBLOX_Starter(AuthApiServer, Urls['AuthApi']);
				ROBLOX_Starter(ApiGatewayServer, Urls['ApiGatewayService']);
				ROBLOX_Starter(LocaleApiServer, Urls['LocaleApi']);
				ROBLOX_Starter(MarketplaceServiceServer, Urls['MarketplaceService']);
				ROBLOX_Starter(AbTestingApiServer, Urls['AbTestingApi']);
				ROBLOX_Starter(AbTestingServiceServer, Urls['AbTestingService']);
				ROBLOX_Starter(UsersApiServer, Urls['UsersApi']);
				ROBLOX_Starter(TwoStepVerficationApiServer, Urls['TwoStepVerificationApi']);
				ROBLOX_Starter(LatencyMeasurementsInternalServiceServer, Urls['LatencyMeasurementsInternalService']);
				ROBLOX_Starter(ChatApiServer, Urls['ChatApi']);
				ROBLOX_Starter(ContactsApiServer, Urls['ContactsApi']);
				ROBLOX_Starter(NotificationsApiServer, Urls['NotificationsApi']);
				ROBLOX_Starter(AccountSettingsApiServer, Urls['AccountSettingsApi']);
				ROBLOX_Starter(AdsApiServer, Urls['AdsApi']);
				ROBLOX_Starter(TradesApiServer, Urls['TradesApi']);
				ROBLOX_Starter(FriendsApiServer, Urls['FriendsApi']);
				ROBLOX_Starter(PrivateMessagesApiServer, Urls['PrivateMessagesApi']);
				ROBLOX_Starter(EconomyApiServer, Urls['EconomyApi']);
				ROBLOX_Starter(GamesApiServer, Urls['GamesApi']);
				const [ROBLOX_REAL_TIME_HTTP, ROBLOX_REAL_TIME_HTTPS] = ROBLOX_Starter(RealTimeApiServer, Urls['RealTimeApi']);
				ROBLOX_Starter(ThumbnailsApiServer, Urls['ThumbnailsApi']);
				ROBLOX_Starter(PresenceApiServer, Urls['PresenceApi']);
				ROBLOX_Starter(GroupsApiServer, Urls['GroupsApi']);
				ROBLOX_Starter(AccountInformationServer, Urls['AccountInformationApi']);
				ROBLOX_Starter(BadgesApiServer, Urls['BadgesApi']);
				ROBLOX_Starter(DeveloperForumWebsiteServer, Urls['DeveloperForumWebsite']);
				ROBLOX_Starter(PremiumFeaturesApiServer, Urls['PremiumFeaturesApi']);
				ROBLOX_Starter(ClientSettingsApiServer, Urls['ClientSettingsApi']);
				ROBLOX_Starter(ClientSettingsCDNApiServer, Urls['ClientSettingsCDNApi']);
				ROBLOX_Starter(AdConfigurationApiServer, Urls['AdConfigurationApi']);
				ROBLOX_Starter(ClientTelementryServiceServer, Urls['ClientTelementryService']);
				ROBLOX_Starter(AssetsApi, Urls['AssetsApi']);
				ROBLOX_Starter(AvatarApiServer, Urls['AvatarApi']);
				ROBLOX_Starter(BillingApiServer, Urls['BillingApi']);
				ROBLOX_Starter(CatalogApiServer, Urls['CatalogApi']);
				ROBLOX_Starter(CdnProvidersApiServer, Urls['CdnProvidersApi']);
				ROBLOX_Starter(ChatModerationServiceServer, Urls['ChatModerationApi']);
				ROBLOX_Starter(ContentStoreApiServer, Urls['ContentStoreApi']);
				ROBLOX_Starter(DevelopApiServer, Urls['DevelopApi']);
				ROBLOX_Starter(DiscussionsApiServer, Urls['DiscussionsApi']);
				ROBLOX_Starter(EconomyCreatorStatsApiServer, Urls['EconomyCreatorStatsApi']);
				ROBLOX_Starter(EngagementPayoutsServiceServer, Urls['EngagementPayoutsApi']);
				ROBLOX_Starter(FollowingsApiServer, Urls['FollowingsApi']);
				ROBLOX_Starter(GameInternationalizationApiServer, Urls['GameInternationalizationApi']);
				ROBLOX_Starter(GameJoinApiServer, Urls['GameJoinApi']);
				ROBLOX_Starter(GroupsModerationServiceServer, Urls['GroupsModerationApi']);
				ROBLOX_Starter(InventoryApiServer, Urls['InventoryApi']);
				ROBLOX_Starter(ItemConfigurationApiService, Urls['ItemConfigurationApi']);
				ROBLOX_Starter(LocalizationTablesApiServer, Urls['LocalizationTablesApi']);
				ROBLOX_Starter(PointsApiServer, Urls['PointsApi']);
				ROBLOX_Starter(PublishApiServer, Urls['PublishApi']);
				ROBLOX_Starter(PunishmentsServiceServer, Urls['PunishmentsService']);
				ROBLOX_Starter(MidasShareApiServer, Urls['ShareApi']);
				ROBLOX_Starter(TextFilterApiServer, Urls['TextFilterApi']);
				ROBLOX_Starter(ThemesApiServer, Urls['ThemesApi']);
				ROBLOX_Starter(ThumbnailsResizerApiServer, Urls['ThumbnailsResizerApi']);
				ROBLOX_Starter(TranslationRolesApiServer, Urls['TranslationRolesApi']);
				ROBLOX_Starter(TranslationsApiServer, Urls['TranslationsApi']);
				ROBLOX_Starter(UserModerationServiceServer, Urls['UserModerationApi']);
				ROBLOX_Starter(VoiceApiServer, Urls['VoiceApi']);
				ROBLOX_Starter(FilesServiceServer, Urls['FilesService']);
				ROBLOX_Starter(MetricsInternalWebsiteServer, Urls['MetricsInternalWebsite']);
				ROBLOX_Starter(AdminWebsiteServer, Urls['AdminWebsite']);
				ROBLOX_Starter(CSWebsiteServer, Urls['CSWebsite']);
				ROBLOX_Starter(ComApisCDNServer, Urls['ComApisCDN']);
				ROBLOX_Starter(PointsServiceServer, Urls['PointsService']);
				ROBLOX_Starter(UsersServiceServer, Urls['UsersService']);
				ROBLOX_Starter(DataWebsiteServer, Urls['DataWebsite']);
				SignalRSetup(ROBLOX_API_HTTP, ROBLOX_API_HTTPS, '\\Source\\Bin\\WebSockets\\Roblox.Api', Urls.ApiProxy);
				SignalRSetup(ROBLOX_REAL_TIME_HTTP, ROBLOX_REAL_TIME_HTTPS, '\\Source\\Bin\\WebSockets\\Roblox.RealTime', Urls.RealTimeApi);
				FASTLOG1F(DFLog('Tasks'), '[DFLog::Tasks] There are %d Services running...', Object.keys(Urls).length);
			} catch (e) {
				return reportDebatableError(e);
			}
		})();
	} catch (e) {
		return reportDebatableError(e);
	}
})();

process.stdin.resume();
function exitHandler(options: { exit: boolean; error: boolean; message?: string; code?: number; ex?: Exception }) {
	if (options.exit) {
		if (options.error) {
			return reportDebatableError(options.ex);
		}
		if (options.message) FASTLOGS(DFLog('Tasks'), `[DFLog::Tasks] %s`, options.message);
		process.exit();
	}
}
process.on('SIGINT', exitHandler.bind(null, { exit: true, message: 'SIGINT on server' }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true, message: 'SIGUSR1 on server' }));
process.on('beforeExit', exitHandler.bind(null, { exit: true, message: 'Exit Services' }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true, message: 'SIGUSR2 on server' }));
process.on('uncaughtException', (e) => {
	exitHandler({ exit: true, error: true, message: `Name: ${e.name}, Reason: ${e.message}, Stack Trace: ${e.stack}`, ex: e });
});

function reportDebatableError(e: Exception) {
	return FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Error: %s, Stack Trace: %s`, e.message, e.stack);
}
