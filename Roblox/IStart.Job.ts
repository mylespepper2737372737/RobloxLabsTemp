/*
	FileName: Roblox.IStart.Job.ts
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
	Description: Copy of ROBLOX's Roblox.IStart.Job.cs

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
	ROBLOX_404_DOSARREST_ORIGIN_CORP,
	SIMULPONG_404,
	ROBLOX_404_AB_TESTING,
	Kestrel_404,
} from './ErrorResponders';
import { RobloxLegacy } from './Api';
import IServer from 'express';
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
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_WWW'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_API'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_STATIC_CDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_JS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CSS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_IMAGES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_SETUP_CDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_API'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['DEPRECATED_ROBLOX_TEMPORARY_IMAGES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_VERSION_COMPATIBILITY_API'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_API'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_ASSET_GAME'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_VERSION_2'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_GAME_PERSISTENCE'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_DOSARREST_ORIGIN_CORP'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_MARKETPLACE_API'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_METRICS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_AUTH'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_APIS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_LOCALE'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_AB_TESTING'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_AB_TESTING_API'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_USERS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_TWO_STEP_VERIFICATION'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['SIMULPONG_LATENCY_MEASUREMENTS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CHAT'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CONTACTS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_NOTIFICATIONS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_ACCOUNT_SETTINGS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_ADS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_TRADES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_FRIENDS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_PRIVATE_MESSAGES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_ECONOMY'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_GAMES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_REAL_TIME'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_THUMB_NAILS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_PRESENCE'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_GROUPS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_ACCOUNT_INFORMATION'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_BADGES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_DEVELOPER_FORUM'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_PREMIUM_FEATURES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_CDN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_AD_CONFIGURATION'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_TELEMENTRY'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_ASSET_DELIVERY'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_AVATAR'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_BILLING'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CATALOG'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CDN_PROVIDERS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CHAT_MODERATION'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_CONTENT_STORE'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_DEVELOP'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_DISCUSSIONS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_ECONOMY_CREATOR_STATS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_ENGAGEMENT_PAYOUTS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_FOLLOWINGS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_GAME_INTERNATIONALIZATION'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_GAME_JOIN'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_GROUPS_MODERATION'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_INVENTORY'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_ITEM_CONFIGURATION'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_LOCALIZATION_TABLES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_POINTS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_PUBLISH'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_PUNISHMENTS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_SHARE'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_TEXT_FILTER'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_THEMES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_THUMBNAILS_RESIZER'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_TRANSLATION_ROLES'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_TRANSLATIONS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_USER_MODERATION'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_VOICE'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_FILES_API'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['SIMULPONG_ROBLOX_TEAM_CITY'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ADMIN_WEB_SITE'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['COM_APIS'], 6);
SYNCHRONIZED_LOGVARIABLE(RobloxLegacy.Api.Constants.URLS['ROBLOX_POINTS_API'], 6);

FASTFLAGVARIABLE('RequireGlobalHTTPS', true);

(async () => {
	try {
		await RobloxLegacy.Api.Helpers.Helpers.Sessions.ClearCachedSessions();

		const ROBLOX_WWW_SERVER = IServer();
		const ROBLOX_STATIC_CDN_SERVER = IServer();
		const ROBLOX_JS_SERVER = IServer();
		const ROBLOX_CSS_SERVER = IServer();
		const ROBLOX_IMAGES_SERVER = IServer();
		const ROBLOX_SETUP_CDN_SERVER = IServer();
		const ROBLOX_API_SERVER = IServer();
		const ROBLOX_EPHEMERAL_COUNTERS_API_SERVER = IServer();
		const ROBLOX_EPHEMERAL_COUNTERS_VERSION_2_SERVER = IServer();
		const DEPRECATED_ROBLOX_TEMPORARY_IMAGES_SERVER = IServer();
		const ROBLOX_VERSION_COMPATIBILITY_API_SERVER = IServer();
		const ROBLOX_CLIENT_SETTINGS_API_SERVER = IServer();
		const ROBLOX_ASSET_GAME_SERVER = IServer();
		const ROBLOX_GAME_PERSISTENCE_SERVER = IServer();
		const ROBLOX_DOSARREST_ORIGIN_CORP_SERVER = IServer();
		const ROBLOX_MARKETPLACE_API_SERVER = IServer();
		const ROBLOX_METRICS_SERVER = IServer();
		const ROBLOX_APIS_SERVER = IServer();
		const ROBLOX_LOCALE_SERVER = IServer();
		const ROBLOX_AUTH_SERVER = IServer();
		const ROBLOX_AB_TESTING_SERVER = IServer();
		const ROBLOX_AB_TESTING_API_SERVER = IServer();
		const ROBLOX_USERS_SERVER = IServer();
		const ROBLOX_TWO_STEP_VERIFICATION_SERVER = IServer();
		const SIMULPONG_LATENCY_MEASUREMENTS_SERVER = IServer();
		const ROBLOX_CHAT_SERVER = IServer();
		const ROBLOX_CONTACTS_SERVER = IServer();
		const ROBLOX_NOTIFICATIONS_SERVER = IServer();
		const ROBLOX_ACCOUNT_SETTINGS_SERVER = IServer();
		const ROBLOX_ADS_SERVER = IServer();
		const ROBLOX_TRADES_SERVER = IServer();
		const ROBLOX_FRIENDS_SERVER = IServer();
		const ROBLOX_PRIVATE_MESSAGES_SERVER = IServer();
		const ROBLOX_ECONOMY_SERVER = IServer();
		const ROBLOX_GAMES_SERVER = IServer();
		const ROBLOX_REAL_TIME_SERVER = IServer();
		const ROBLOX_THUMBNAILS_SERVER = IServer();
		const ROBLOX_PRESENCE_SERVER = IServer();
		const ROBLOX_GROUPS_SERVER = IServer();
		const ROBLOX_ACCOUNT_INFORMATION_SERVER = IServer();
		const ROBLOX_BADGES_SERVER = IServer();
		const ROBLOX_DEVELOPER_FORUM_SERVER = IServer();
		const ROBLOX_PREMIUM_FEATURES_SERVER = IServer();
		const ROBLOX_CLIENT_SETTINGS_SERVER = IServer();
		const ROBLOX_CLIENT_SETTINGS_CDN_SERVER = IServer();
		const ROBLOX_AD_CONFIGURATION_SERVER = IServer();
		const ROBLOX_CLIENT_TELEMENTRY_SERVER = IServer();
		const ROBLOX_ASSET_DELIVERY_SERVER = IServer();
		const ROBLOX_AVATAR_SERVER = IServer();
		const ROBLOX_BILLING_SERVER = IServer();
		const ROBLOX_CATALOG_SERVER = IServer();
		const ROBLOX_CDN_PROVIDERS_SERVER = IServer();
		const ROBLOX_CHAT_MODERATION_SERVER = IServer();
		const ROBLOX_CONTENT_STORE_SERVER = IServer();
		const ROBLOX_DEVELOP_SERVER = IServer();
		const ROBLOX_DISCUSSIONS_SERVER = IServer();
		const ROBLOX_ECONOMY_CREATOR_STATS_SERVER = IServer();
		const ROBLOX_ENGAGEMENT_PAYOUTS_SERVER = IServer();
		const ROBLOX_FOLLOWINGS_SERVER = IServer();
		const ROBLOX_GAME_INTERNATIONALIZATION_SERVER = IServer();
		const ROBLOX_GAME_JOIN_SERVER = IServer();
		const ROBLOX_GROUPS_MODERATION_SERVER = IServer();
		const ROBLOX_INVENTORY_SERVER = IServer();
		const ROBLOX_ITEM_CONFIGURATION_SERVER = IServer();
		const ROBLOX_LOCALIZATION_TABLES_SERVER = IServer();
		const ROBLOX_POINTS_SERVER = IServer();
		const ROBLOX_PUBLISH_SERVER = IServer();
		const ROBLOX_PUNISHMENTS_SERVER = IServer();
		const ROBLOX_SHARE_SERVER = IServer();
		const ROBLOX_TEXT_FILTER_SERVER = IServer();
		const ROBLOX_THEMES_SERVER = IServer();
		const ROBLOX_THUMBNAILS_RESIZER_SERVER = IServer();
		const ROBLOX_TRANSLATION_ROLES_SERVER = IServer();
		const ROBLOX_TRANSLATIONS_SERVER = IServer();
		const ROBLOX_USER_MODERATION = IServer();
		const ROBLOX_VOICE_SERVER = IServer();
		const ROBLOX_FILES_API_SERVER = IServer();
		const SIMULPONG_ROBLOX_TEAM_CITY_SERVER = IServer();
		const ADMIN_WEB_SITE_SERVER = IServer();
		const COM_APIS_SERVER = IServer();
		const ROBLOX_POINTS_API_SERVER = IServer();

		ROBLOX_WWW_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_STATIC_CDN_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_JS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CSS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_IMAGES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_SETUP_CDN_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_API_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_EPHEMERAL_COUNTERS_API_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_EPHEMERAL_COUNTERS_VERSION_2_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		DEPRECATED_ROBLOX_TEMPORARY_IMAGES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_VERSION_COMPATIBILITY_API_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CLIENT_SETTINGS_API_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ASSET_GAME_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_GAME_PERSISTENCE_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GAMEPERSISTENCE);
		ROBLOX_DOSARREST_ORIGIN_CORP_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_MARKETPLACE_API_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_METRICS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_APIS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.KESTREL);
		ROBLOX_LOCALE_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_AUTH_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_AB_TESTING_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.ABTESTING);
		ROBLOX_AB_TESTING_API_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.ABTESTING);
		ROBLOX_USERS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_TWO_STEP_VERIFICATION_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		SIMULPONG_LATENCY_MEASUREMENTS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.SIMULPONG);
		ROBLOX_CHAT_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CONTACTS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_NOTIFICATIONS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ACCOUNT_SETTINGS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ADS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_TRADES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_FRIENDS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_PRIVATE_MESSAGES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ECONOMY_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_GAMES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_REAL_TIME_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_THUMBNAILS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_PRESENCE_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_GROUPS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ACCOUNT_INFORMATION_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_BADGES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_DEVELOPER_FORUM_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_PREMIUM_FEATURES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CLIENT_SETTINGS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CLIENT_SETTINGS_CDN_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_AD_CONFIGURATION_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CLIENT_TELEMENTRY_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ASSET_DELIVERY_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_AVATAR_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_BILLING_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CATALOG_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CDN_PROVIDERS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CHAT_MODERATION_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CONTENT_STORE_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_DEVELOP_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_DISCUSSIONS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ECONOMY_CREATOR_STATS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ENGAGEMENT_PAYOUTS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_FOLLOWINGS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_GAME_INTERNATIONALIZATION_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_GAME_JOIN_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_GROUPS_MODERATION_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_INVENTORY_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ITEM_CONFIGURATION_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_LOCALIZATION_TABLES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_POINTS_SERVER.use(ApiServiceIsAliveValidator, Points);
		ROBLOX_PUNISHMENTS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_SHARE_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_TEXT_FILTER_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_THEMES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_THUMBNAILS_RESIZER_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_TRANSLATION_ROLES_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_TRANSLATIONS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_USER_MODERATION.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_PUBLISH_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_VOICE_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_FILES_API_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.GLOBAL);
		SIMULPONG_ROBLOX_TEAM_CITY_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.SIMULPONG);
		ADMIN_WEB_SITE_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.ADMINWEBSITE);
		COM_APIS_SERVER.use(RobloxLegacy.Api.Helpers.BeforeNext.Middle.KESTREL);
		ROBLOX_POINTS_API_SERVER.use(PointsApi);

		ROBLOX_APIS_SERVER.set('views', RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\TestViews');
		ROBLOX_APIS_SERVER.set('view engine', 'jsx');
		ROBLOX_APIS_SERVER.engine('jsx', require('express-react-views').createEngine());

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_STATIC_CDN_SERVER,
				'\\StaticPages\\Roblox.StaticCDN',
				'\\Assemblies\\Controllers\\Roblox.StaticCDN',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_STATIC_CDN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_JS_SERVER,
				'\\StaticPages\\Roblox.JS.Distribution',
				'\\Assemblies\\Controllers\\Roblox.JS',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_JS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CSS_SERVER,
				'\\StaticPages\\Roblox.CSS',
				'\\Assemblies\\Controllers\\Roblox.CSS',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CSS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_IMAGES_SERVER,
				'\\StaticPages\\Roblox.Images',
				'\\Assemblies\\Controllers\\Roblox.Images',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_IMAGES'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_API_SERVER,
				'\\StaticPages\\Roblox.Api',
				'\\Assemblies\\Controllers\\Roblox.Api',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_API'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_SETUP_CDN_SERVER,
				'\\StaticPages\\Roblox.SetupCDN',
				'\\Assemblies\\Controllers\\Roblox.SetupCDN',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_SETUP_CDN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_WWW_SERVER,
				'\\StaticPages\\Roblox.WWWRoot',
				'\\Assemblies\\Controllers\\Roblox.WWWRoot',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_WWW'],
				false,
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_EPHEMERAL_COUNTERS_API_SERVER,
				'\\StaticPages\\Roblox.EphemeralCountersApi',
				'\\Assemblies\\Controllers\\Roblox.EphemeralCountersApi',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_API'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_EPHEMERAL_COUNTERS_VERSION_2_SERVER,
				'\\StaticPages\\Roblox.EphemeralCounters.Version_2',
				'\\Assemblies\\Controllers\\Roblox.EphemeralCounters.Version_2',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_VERSION_2'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				DEPRECATED_ROBLOX_TEMPORARY_IMAGES_SERVER,
				'\\StaticPages\\Roblox.TemporaryImages',
				'\\Assemblies\\Controllers\\Roblox.TemporaryImages',
				RobloxLegacy.Api.Constants.URLS['DEPRECATED_ROBLOX_TEMPORARY_IMAGES'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_VERSION_COMPATIBILITY_API_SERVER,
				'\\StaticPages\\Roblox.VersionCompatibilityApi',
				'\\Assemblies\\Controllers\\Roblox.VersionCompatibilityApi',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_VERSION_COMPATIBILITY_API'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CLIENT_SETTINGS_API_SERVER,
				'\\StaticPages\\Roblox.ClientSettingsApi',
				'\\Assemblies\\Controllers\\Roblox.ClientSettingsApi',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_API'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_ASSET_GAME_SERVER,
				'\\StaticPages\\Roblox.AssetGame',
				'\\Assemblies\\Controllers\\Roblox.AssetGame',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_ASSET_GAME'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_GAME_PERSISTENCE_SERVER,
				'\\StaticPages\\Roblox.GamePersistence',
				'\\Assemblies\\Controllers\\Roblox.GamePersistence',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_GAME_PERSISTENCE'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_DOSARREST_ORIGIN_CORP_SERVER,
				'\\StaticPages\\Roblox.DOSArrest',
				'\\Assemblies\\Controllers\\Roblox.DOSArrest',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_DOSARREST_ORIGIN_CORP'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_MARKETPLACE_API_SERVER,
				'\\StaticPages\\Roblox.MarketPlaceApi',
				'\\Assemblies\\Controllers\\Roblox.MarketPlaceApi',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_MARKETPLACE_API'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_METRICS_SERVER,
				'\\StaticPages\\Roblox.Metrics',
				'\\Assemblies\\Controllers\\Roblox.Metrics',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_METRICS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_AUTH_SERVER,
				'\\StaticPages\\Roblox.Auth',
				'\\Assemblies\\Controllers\\Roblox.Auth',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_AUTH'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_APIS_SERVER,
				'\\StaticPages\\Roblox.Apis',
				'\\Assemblies\\Controllers\\Roblox.Apis',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_APIS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_LOCALE_SERVER,
				'\\StaticPages\\Roblox.Locale',
				'\\Assemblies\\Controllers\\Roblox.Locale',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_LOCALE'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_AB_TESTING_SERVER,
				'\\StaticPages\\Roblox.AbTesting',
				'\\Assemblies\\Controllers\\Roblox.AbTesting',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_AB_TESTING'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_AB_TESTING_API_SERVER,
				'\\StaticPages\\Roblox.AbTestingApi',
				'\\Assemblies\\Controllers\\Roblox.AbTestingApi',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_AB_TESTING_API'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_USERS_SERVER,
				'\\StaticPages\\Roblox.Users',
				'\\Assemblies\\Controllers\\Roblox.Users',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_USERS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_TWO_STEP_VERIFICATION_SERVER,
				'\\StaticPages\\Roblox.TwoStepVerification',
				'\\Assemblies\\Controllers\\Roblox.TwoStepVerification',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_TWO_STEP_VERIFICATION'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				SIMULPONG_LATENCY_MEASUREMENTS_SERVER,
				'\\StaticPages\\SimulPong.LatencyMeasurements',
				'\\Assemblies\\Controllers\\SimulPong.LatencyMeasurements',
				RobloxLegacy.Api.Constants.URLS['SIMULPONG_LATENCY_MEASUREMENTS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CHAT_SERVER,
				'\\StaticPages\\Roblox.Chat',
				'\\Assemblies\\Controllers\\Roblox.Chat',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CHAT'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CONTACTS_SERVER,
				'\\StaticPages\\Roblox.Contacts',
				'\\Assemblies\\Controllers\\Roblox.Contacts',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CONTACTS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_NOTIFICATIONS_SERVER,
				'\\StaticPages\\Roblox.Notifications',
				'\\Assemblies\\Controllers\\Roblox.Notifications',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_NOTIFICATIONS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_ACCOUNT_SETTINGS_SERVER,
				'\\StaticPages\\Roblox.AccountSettings',
				'\\Assemblies\\Controllers\\Roblox.AccountSettings',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_ACCOUNT_SETTINGS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_ADS_SERVER,
				'\\StaticPages\\Roblox.Ads',
				'\\Assemblies\\Controllers\\Roblox.Ads',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_ADS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_TRADES_SERVER,
				'\\StaticPages\\Roblox.Trades',
				'\\Assemblies\\Controllers\\Roblox.Trades',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_TRADES'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_FRIENDS_SERVER,
				'\\StaticPages\\Roblox.Friends',
				'\\Assemblies\\Controllers\\Roblox.Friends',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_FRIENDS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_PRIVATE_MESSAGES_SERVER,
				'\\StaticPages\\Roblox.PrivateMessages',
				'\\Assemblies\\Controllers\\Roblox.PrivateMessages',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_PRIVATE_MESSAGES'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_ECONOMY_SERVER,
				'\\StaticPages\\Roblox.Economy',
				'\\Assemblies\\Controllers\\Roblox.Economy',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_ECONOMY'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_GAMES_SERVER,
				'\\StaticPages\\Roblox.Games',
				'\\Assemblies\\Controllers\\Roblox.Games',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_GAMES'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_REAL_TIME_SERVER,
				'\\StaticPages\\Roblox.RealTime',
				'\\Assemblies\\Controllers\\Roblox.RealTime',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_REAL_TIME'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_THUMBNAILS_SERVER,
				'\\StaticPages\\Roblox.ThumbNails',
				'\\Assemblies\\Controllers\\Roblox.ThumbNails',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_THUMB_NAILS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_PRESENCE_SERVER,
				'\\StaticPages\\Roblox.Presence',
				'\\Assemblies\\Controllers\\Roblox.Presence',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_PRESENCE'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_GROUPS_SERVER,
				'\\StaticPages\\Roblox.Groups',
				'\\Assemblies\\Controllers\\Roblox.Groups',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_GROUPS'],
			),
		);

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_ACCOUNT_INFORMATION_SERVER,
				'\\StaticPages\\Roblox.AccountInformation',
				'\\Assemblies\\Controllers\\Roblox.AccountInformation',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_ACCOUNT_INFORMATION'],
			),
		);

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_BADGES_SERVER,
				'\\StaticPages\\Roblox.Badges',
				'\\Assemblies\\Controllers\\Roblox.Badges',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_BADGES'],
			),
		);

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_DEVELOPER_FORUM_SERVER,
				'\\StaticPages\\Roblox.DeveloperForum',
				'\\Assemblies\\Controllers\\Roblox.DeveloperForum',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_DEVELOPER_FORUM'],
			),
		);

		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_PREMIUM_FEATURES_SERVER,
				'\\StaticPages\\Roblox.PremiumFeatures',
				'\\Assemblies\\Controllers\\Roblox.PremiumFeatures',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_PREMIUM_FEATURES'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CLIENT_SETTINGS_SERVER,
				'\\StaticPages\\Roblox.ClientSettings',
				'\\Assemblies\\Controllers\\Roblox.ClientSettings',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CLIENT_SETTINGS_CDN_SERVER,
				'\\StaticPages\\Roblox.ClientSettingsCDN',
				'\\Assemblies\\Controllers\\Roblox.ClientSettingsCDN',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_CDN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_AD_CONFIGURATION_SERVER,
				'\\StaticPages\\Roblox.AdConfiguration',
				'\\Assemblies\\Controllers\\Roblox.AdConfiguration',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_AD_CONFIGURATION'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CLIENT_TELEMENTRY_SERVER,
				'\\StaticPages\\Roblox.ClientTelementry',
				'\\Assemblies\\Controllers\\Roblox.ClientTelementry',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_TELEMENTRY'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_ASSET_DELIVERY_SERVER,
				'\\StaticPages\\Roblox.AssetDelivery',
				'\\Assemblies\\Controllers\\Roblox.AssetDelivery',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_ASSET_DELIVERY'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_AVATAR_SERVER,
				'\\StaticPages\\Roblox.Avatar',
				'\\Assemblies\\Controllers\\Roblox.Avatar',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_AVATAR'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_BILLING_SERVER,
				'\\StaticPages\\Roblox.Billing',
				'\\Assemblies\\Controllers\\Roblox.Billing',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_BILLING'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CATALOG_SERVER,
				'\\StaticPages\\Roblox.Catalog',
				'\\Assemblies\\Controllers\\Roblox.Catalog',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CATALOG'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CDN_PROVIDERS_SERVER,
				'\\StaticPages\\Roblox.CdnProviders',
				'\\Assemblies\\Controllers\\Roblox.CdnProviders',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CDN_PROVIDERS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CHAT_MODERATION_SERVER,
				'\\StaticPages\\Roblox.ChatModeration',
				'\\Assemblies\\Controllers\\Roblox.ChatModeration',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CHAT_MODERATION'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_CONTENT_STORE_SERVER,
				'\\StaticPages\\Roblox.ContentStore',
				'\\Assemblies\\Controllers\\Roblox.ContentStore',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_CONTENT_STORE'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_DEVELOP_SERVER,
				'\\StaticPages\\Roblox.Develop',
				'\\Assemblies\\Controllers\\Roblox.Develop',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_DEVELOP'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_DISCUSSIONS_SERVER,
				'\\StaticPages\\Roblox.Discussions',
				'\\Assemblies\\Controllers\\Roblox.Discussions',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_DISCUSSIONS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_ECONOMY_CREATOR_STATS_SERVER,
				'\\StaticPages\\Roblox.EconomyCreatorStats',
				'\\Assemblies\\Controllers\\Roblox.EconomyCreatorStats',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_ECONOMY_CREATOR_STATS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_ENGAGEMENT_PAYOUTS_SERVER,
				'\\StaticPages\\Roblox.EngagementPayouts',
				'\\Assemblies\\Controllers\\Roblox.EngagementPayouts',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_ENGAGEMENT_PAYOUTS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_FOLLOWINGS_SERVER,
				'\\StaticPages\\Roblox.Followings',
				'\\Assemblies\\Controllers\\Roblox.Followings',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_FOLLOWINGS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_GAME_INTERNATIONALIZATION_SERVER,
				'\\StaticPages\\Roblox.GameInternationalization',
				'\\Assemblies\\Controllers\\Roblox.GameInternationalization',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_GAME_INTERNATIONALIZATION'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_GAME_JOIN_SERVER,
				'\\StaticPages\\Roblox.GameJoin',
				'\\Assemblies\\Controllers\\Roblox.GameJoin',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_GAME_JOIN'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_GROUPS_MODERATION_SERVER,
				'\\StaticPages\\Roblox.GroupsModeration',
				'\\Assemblies\\Controllers\\Roblox.GroupsModeration',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_GROUPS_MODERATION'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_INVENTORY_SERVER,
				'\\StaticPages\\Roblox.Inventory',
				'\\Assemblies\\Controllers\\Roblox.Inventory',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_AD_CONFIGURATION'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_ITEM_CONFIGURATION_SERVER,
				'\\StaticPages\\Roblox.ItemConfiguration',
				'\\Assemblies\\Controllers\\Roblox.ItemConfiguration',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_ITEM_CONFIGURATION'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_AD_CONFIGURATION_SERVER,
				'\\StaticPages\\Roblox.AdConfiguration',
				'\\Assemblies\\Controllers\\Roblox.AdConfiguration',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_AD_CONFIGURATION'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_LOCALIZATION_TABLES_SERVER,
				'\\StaticPages\\Roblox.LocalizationTables',
				'\\Assemblies\\Controllers\\Roblox.LocalizationTables',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_LOCALIZATION_TABLES'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_POINTS_SERVER,
				'\\StaticPages\\Roblox.Points',
				'\\Assemblies\\Controllers\\Roblox.Points',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_POINTS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_PUBLISH_SERVER,
				'\\StaticPages\\Roblox.Publish',
				'\\Assemblies\\Controllers\\Roblox.Publish',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_PUBLISH'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_PUNISHMENTS_SERVER,
				'\\StaticPages\\Roblox.Punishments',
				'\\Assemblies\\Controllers\\Roblox.Punishments',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_PUNISHMENTS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_SHARE_SERVER,
				'\\StaticPages\\Roblox.Share',
				'\\Assemblies\\Controllers\\Roblox.Share',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_SHARE'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_TEXT_FILTER_SERVER,
				'\\StaticPages\\Roblox.TextFilter',
				'\\Assemblies\\Controllers\\Roblox.TextFilter',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_TEXT_FILTER'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_THEMES_SERVER,
				'\\StaticPages\\Roblox.Themes',
				'\\Assemblies\\Controllers\\Roblox.Themes',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_THEMES'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_THUMBNAILS_RESIZER_SERVER,
				'\\StaticPages\\Roblox.ThumbnailsResizer',
				'\\Assemblies\\Controllers\\Roblox.ThumbnailsResizer',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_THUMBNAILS_RESIZER'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_TRANSLATION_ROLES_SERVER,
				'\\StaticPages\\Roblox.TranslationRoles',
				'\\Assemblies\\Controllers\\Roblox.TranslationRoles',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_TRANSLATION_ROLES'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_TRANSLATIONS_SERVER,
				'\\StaticPages\\Roblox.Translations',
				'\\Assemblies\\Controllers\\Roblox.Translations',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_TRANSLATIONS'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_USER_MODERATION,
				'\\StaticPages\\Roblox.UserModeration',
				'\\Assemblies\\Controllers\\Roblox.UserModeration',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_USER_MODERATION'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_VOICE_SERVER,
				'\\StaticPages\\Roblox.Voice',
				'\\Assemblies\\Controllers\\Roblox.Voice',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_VOICE'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_FILES_API_SERVER,
				'\\StaticPages\\Roblox.FilesApi',
				'\\Assemblies\\Controllers\\Roblox.FilesApi',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_FILES_API'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				SIMULPONG_ROBLOX_TEAM_CITY_SERVER,
				'\\StaticPages\\SimulPong.TeamCity',
				'\\Assemblies\\Controllers\\SimulPong.TeamCity',
				RobloxLegacy.Api.Constants.URLS['SIMULPONG_ROBLOX_TEAM_CITY'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ADMIN_WEB_SITE_SERVER,
				'\\StaticPages\\AdminWebsite',
				'\\Assemblies\\Controllers\\AdminWebsite',
				RobloxLegacy.Api.Constants.URLS['ADMIN_WEB_SITE'],
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				COM_APIS_SERVER,
				'\\StaticPages\\Com.Apis',
				'\\Assemblies\\Controllers\\Com.Apis',
				RobloxLegacy.Api.Constants.URLS['COM_APIS'],
				false,
				true,
			),
		);
		await RobloxLegacy.Api.Library.IStartup.Configure(
			RobloxLegacy.Api.Helpers.Config.CONFIG(
				ROBLOX_POINTS_API_SERVER,
				'\\StaticPages\\Roblox.PointsApi',
				'\\Assemblies\\Controllers\\Roblox.PointsApi',
				RobloxLegacy.Api.Constants.URLS['ROBLOX_POINTS_API'],
			),
		);

		ROBLOX_API_SERVER.use(ROBLOX_404_API);
		ROBLOX_STATIC_CDN_SERVER.use(ROBLOX_404_STATIC_CDN);
		ROBLOX_JS_SERVER.use(ROBLOX_404_JS);
		ROBLOX_CSS_SERVER.use(ROBLOX_404_CSS);
		ROBLOX_IMAGES_SERVER.use(ROBLOX_404_IMAGES);
		ROBLOX_SETUP_CDN_SERVER.use(ROBLOX_404_SETUP_CDN);
		ROBLOX_WWW_SERVER.use(ROBLOX_404_WWW);
		ROBLOX_EPHEMERAL_COUNTERS_API_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_EPHEMERAL_COUNTERS_VERSION_2_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		DEPRECATED_ROBLOX_TEMPORARY_IMAGES_SERVER.use(DEPRECATED_404_TEMPORARY_IMAGES);
		ROBLOX_VERSION_COMPATIBILITY_API_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_CLIENT_SETTINGS_API_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_ASSET_GAME_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_GAME_PERSISTENCE_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_DOSARREST_ORIGIN_CORP_SERVER.use(ROBLOX_404_DOSARREST_ORIGIN_CORP);
		ROBLOX_MARKETPLACE_API_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_METRICS_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_AUTH_SERVER.use(ROBLOX_404_API);
		ROBLOX_APIS_SERVER.use(Kestrel_404);
		ROBLOX_LOCALE_SERVER.use(ROBLOX_404_API);
		ROBLOX_AB_TESTING_SERVER.use(ROBLOX_404_AB_TESTING);
		ROBLOX_AB_TESTING_API_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_USERS_SERVER.use(ROBLOX_404_API);
		SIMULPONG_LATENCY_MEASUREMENTS_SERVER.use(SIMULPONG_404);
		ROBLOX_CHAT_SERVER.use(ROBLOX_404_API);
		ROBLOX_CONTACTS_SERVER.use(ROBLOX_404_API);
		ROBLOX_NOTIFICATIONS_SERVER.use(ROBLOX_404_API);
		ROBLOX_ACCOUNT_SETTINGS_SERVER.use(ROBLOX_404_API);
		ROBLOX_ADS_SERVER.use(ROBLOX_404_API);
		ROBLOX_TRADES_SERVER.use(ROBLOX_404_API);
		ROBLOX_FRIENDS_SERVER.use(ROBLOX_404_API);
		ROBLOX_PRIVATE_MESSAGES_SERVER.use(ROBLOX_404_API);
		ROBLOX_ECONOMY_SERVER.use(ROBLOX_404_API);
		ROBLOX_GAMES_SERVER.use(ROBLOX_404_API);
		ROBLOX_REAL_TIME_SERVER.use(ROBLOX_404_API);
		ROBLOX_THUMBNAILS_SERVER.use(ROBLOX_404_API);
		ROBLOX_PRESENCE_SERVER.use(ROBLOX_404_API);
		ROBLOX_GROUPS_SERVER.use(ROBLOX_404_API);
		ROBLOX_ACCOUNT_INFORMATION_SERVER.use(ROBLOX_404_API);
		ROBLOX_BADGES_SERVER.use(ROBLOX_404_API);
		ROBLOX_DEVELOPER_FORUM_SERVER.use(ROBLOX_404_API);
		ROBLOX_PREMIUM_FEATURES_SERVER.use(ROBLOX_404_API);
		ROBLOX_CLIENT_SETTINGS_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_CLIENT_SETTINGS_CDN_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_AD_CONFIGURATION_SERVER.use(ROBLOX_404_API);
		ROBLOX_CLIENT_TELEMENTRY_SERVER.use(ROBLOX_404_API);
		ROBLOX_ASSET_DELIVERY_SERVER.use(ROBLOX_404_API);
		ROBLOX_AVATAR_SERVER.use(ROBLOX_404_API);
		ROBLOX_BILLING_SERVER.use(ROBLOX_404_API);
		ROBLOX_CATALOG_SERVER.use(ROBLOX_404_API);
		ROBLOX_CDN_PROVIDERS_SERVER.use(ROBLOX_404_API);
		ROBLOX_CHAT_MODERATION_SERVER.use(ROBLOX_404_API);
		ROBLOX_CONTENT_STORE_SERVER.use(ROBLOX_404_API);
		ROBLOX_DEVELOP_SERVER.use(ROBLOX_404_API);
		ROBLOX_DISCUSSIONS_SERVER.use(ROBLOX_404_API);
		ROBLOX_ECONOMY_CREATOR_STATS_SERVER.use(ROBLOX_404_API);
		ROBLOX_ENGAGEMENT_PAYOUTS_SERVER.use(ROBLOX_404_API);
		ROBLOX_FOLLOWINGS_SERVER.use(ROBLOX_404_API);
		ROBLOX_GAME_INTERNATIONALIZATION_SERVER.use(ROBLOX_404_API);
		ROBLOX_GAME_JOIN_SERVER.use(ROBLOX_404_API);
		ROBLOX_GROUPS_MODERATION_SERVER.use(ROBLOX_404_API);
		ROBLOX_INVENTORY_SERVER.use(ROBLOX_404_API);
		ROBLOX_ITEM_CONFIGURATION_SERVER.use(ROBLOX_404_API);
		ROBLOX_LOCALIZATION_TABLES_SERVER.use(ROBLOX_404_API);
		ROBLOX_POINTS_SERVER.use(DefaultApi404);
		ROBLOX_PUNISHMENTS_SERVER.use(ROBLOX_404_API);
		ROBLOX_SHARE_SERVER.use(ROBLOX_404_API);
		ROBLOX_TEXT_FILTER_SERVER.use(ROBLOX_404_API);
		ROBLOX_THEMES_SERVER.use(ROBLOX_404_API);
		ROBLOX_THUMBNAILS_RESIZER_SERVER.use(ROBLOX_404_API);
		ROBLOX_TRANSLATION_ROLES_SERVER.use(ROBLOX_404_API);
		ROBLOX_TRANSLATIONS_SERVER.use(ROBLOX_404_API);
		ROBLOX_USER_MODERATION.use(ROBLOX_404_API);
		ROBLOX_PUBLISH_SERVER.use(ROBLOX_404_API);
		ROBLOX_VOICE_SERVER.use(ROBLOX_404_API);
		ROBLOX_FILES_API_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		SIMULPONG_ROBLOX_TEAM_CITY_SERVER.use(SIMULPONG_404);
		ADMIN_WEB_SITE_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		COM_APIS_SERVER.use(Kestrel_404);
		ROBLOX_POINTS_API_SERVER.use(DefaultAsp404);

		await (async () => {
			try {
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_IMAGES_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_IMAGES']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_WWW_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_WWW']);
				const [ROBLOX_API_HTTP, ROBLOX_API_HTTPS] = RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_API_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_API'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_STATIC_CDN_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_STATIC_CDN'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_JS_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_JS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_CSS_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_CSS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_SETUP_CDN_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_SETUP_CDN'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					DEPRECATED_ROBLOX_TEMPORARY_IMAGES_SERVER,
					RobloxLegacy.Api.Constants.URLS['DEPRECATED_ROBLOX_TEMPORARY_IMAGES'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_VERSION_COMPATIBILITY_API_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_VERSION_COMPATIBILITY_API'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CLIENT_SETTINGS_API_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_API'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_ASSET_GAME_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_ASSET_GAME'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_EPHEMERAL_COUNTERS_API_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_API'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_EPHEMERAL_COUNTERS_VERSION_2_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_VERSION_2'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_GAME_PERSISTENCE_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_GAME_PERSISTENCE'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_DOSARREST_ORIGIN_CORP_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_DOSARREST_ORIGIN_CORP'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_METRICS_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_METRICS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_AUTH_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_AUTH']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_APIS_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_APIS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_LOCALE_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_LOCALE']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_MARKETPLACE_API_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_MARKETPLACE_API'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_AB_TESTING_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_AB_TESTING'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_AB_TESTING_API_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_AB_TESTING_API'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_USERS_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_USERS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_TWO_STEP_VERIFICATION_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_TWO_STEP_VERIFICATION'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					SIMULPONG_LATENCY_MEASUREMENTS_SERVER,
					RobloxLegacy.Api.Constants.URLS['SIMULPONG_LATENCY_MEASUREMENTS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_CHAT_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_CHAT']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CONTACTS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_CONTACTS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_NOTIFICATIONS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_NOTIFICATIONS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_ACCOUNT_SETTINGS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_ACCOUNT_SETTINGS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_ADS_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_ADS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_TRADES_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_TRADES']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_FRIENDS_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_FRIENDS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_PRIVATE_MESSAGES_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_PRIVATE_MESSAGES'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_ECONOMY_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_ECONOMY']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_GAMES_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_GAMES']);
				const [ROBLOX_REAL_TIME_HTTP, ROBLOX_REAL_TIME_HTTPS] = RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_REAL_TIME_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_REAL_TIME'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_THUMBNAILS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_THUMB_NAILS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_PRESENCE_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_PRESENCE'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_GROUPS_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_GROUPS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_ACCOUNT_INFORMATION_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_ACCOUNT_INFORMATION'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_BADGES_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_BADGES']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_DEVELOPER_FORUM_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_DEVELOPER_FORUM'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_PREMIUM_FEATURES_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_PREMIUM_FEATURES'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CLIENT_SETTINGS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CLIENT_SETTINGS_CDN_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_CDN'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_AD_CONFIGURATION_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_AD_CONFIGURATION'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CLIENT_TELEMENTRY_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_CLIENT_TELEMENTRY'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_ASSET_DELIVERY_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_ASSET_DELIVERY'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_AVATAR_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_AVATAR']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_BILLING_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_BILLING']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_CATALOG_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_CATALOG']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CDN_PROVIDERS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_CDN_PROVIDERS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CHAT_MODERATION_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_CHAT_MODERATION'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CONTENT_STORE_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_CONTENT_STORE'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_DEVELOP_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_DEVELOP']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_DISCUSSIONS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_DISCUSSIONS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_ECONOMY_CREATOR_STATS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_ECONOMY_CREATOR_STATS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_ENGAGEMENT_PAYOUTS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_ENGAGEMENT_PAYOUTS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_FOLLOWINGS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_FOLLOWINGS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_GAME_INTERNATIONALIZATION_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_GAME_INTERNATIONALIZATION'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_GAME_JOIN_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_GAME_JOIN'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_GROUPS_MODERATION_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_GROUPS_MODERATION'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_INVENTORY_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_INVENTORY'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_ITEM_CONFIGURATION_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_ITEM_CONFIGURATION'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_LOCALIZATION_TABLES_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_LOCALIZATION_TABLES'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_POINTS_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_POINTS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_PUBLISH_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_PUBLISH']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_PUNISHMENTS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_PUNISHMENTS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_SHARE_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_SHARE']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_TEXT_FILTER_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_TEXT_FILTER'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_THEMES_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_THEMES']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_THUMBNAILS_RESIZER_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_THUMBNAILS_RESIZER'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_TRANSLATION_ROLES_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_TRANSLATION_ROLES'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_TRANSLATIONS_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_TRANSLATIONS'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_USER_MODERATION,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_USER_MODERATION'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_VOICE_SERVER, RobloxLegacy.Api.Constants.URLS['ROBLOX_VOICE']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_FILES_API_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_FILES_API'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					SIMULPONG_ROBLOX_TEAM_CITY_SERVER,
					RobloxLegacy.Api.Constants.URLS['SIMULPONG_ROBLOX_TEAM_CITY'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(ADMIN_WEB_SITE_SERVER, RobloxLegacy.Api.Constants.URLS['ADMIN_WEB_SITE']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(COM_APIS_SERVER, RobloxLegacy.Api.Constants.URLS['COM_APIS']);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_POINTS_API_SERVER,
					RobloxLegacy.Api.Constants.URLS['ROBLOX_POINTS_API'],
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_SignalR_Config_Helper(
					ROBLOX_API_HTTP,
					ROBLOX_API_HTTPS,
					'\\Assemblies\\WebSockets\\Roblox.Api',
					RobloxLegacy.Api.Constants.URLS.ROBLOX_API,
				);
				RobloxLegacy.Api.Helpers.Web.Util.ROBLOX_SignalR_Config_Helper(
					ROBLOX_REAL_TIME_HTTP,
					ROBLOX_REAL_TIME_HTTPS,
					'\\Assemblies\\WebSockets\\Roblox.RealTime',
					RobloxLegacy.Api.Constants.URLS.ROBLOX_REAL_TIME,
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
