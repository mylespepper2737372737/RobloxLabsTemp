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
	FIXME https redirection is broken, use a different module.

	***

	Copyright 2015-2020 MFD

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://ROBLOX_WWW.apache.org/licenses/LICENSE-2.0

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
} from './Roblox.Helpers/Roblox.AfterNext.Middle';
import { Roblox } from './Roblox.Api';
import IServer from 'express';
import { FASTLOG4, FASTLOG7 /* , LOGGROUP  */, LOGGROUP } from './Roblox.Helpers/Roblox.Helpers/Roblox.Util/Roblox.Util.FastLog';

// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('Protocol77', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('DataStoreV2', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('DataStore', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('EphemeralCountersV2', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('EphemeralCounters', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('Stats', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('universes', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('grid', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('dmp', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('CsrfAPIV1', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('ClientSettingsAPIV1', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('WWWAuthV1', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE('Tasks', 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_WWW'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_API'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_STATIC_CDN'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_JS'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_CSS'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_IMAGES'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_SETUP_CDN'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_API'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['DEPRECATED_ROBLOX_TEMPORARY_IMAGES'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_VERSION_COMPATIBILITY_API'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_API'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_ASSET_GAME'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_VERSION_2'], 7);
// Roblox.Api.Helpers.Util.FastLog.LOGVARIABLE(Roblox.Api.Constants.URLS['ROBLOX_GAME_PERSISTENCE'], 7);

LOGGROUP('Protocol77');
LOGGROUP('DataStoreV2');
LOGGROUP('DataStore');
LOGGROUP('EphemeralCountersV2');
LOGGROUP('EphemeralCounters');
LOGGROUP('Stats');
LOGGROUP('universes');
LOGGROUP('grid');
LOGGROUP('dmp');
LOGGROUP('CsrfAPIV1');
LOGGROUP('ClientSettingsAPIV1');
LOGGROUP('WWWAuthV1');
LOGGROUP('Tasks');
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_WWW']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_API']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_STATIC_CDN']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_JS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_CSS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_IMAGES']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_SETUP_CDN']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_API']);
LOGGROUP(Roblox.Api.Constants.URLS['DEPRECATED_ROBLOX_TEMPORARY_IMAGES']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_VERSION_COMPATIBILITY_API']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_API']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_ASSET_GAME']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_VERSION_2']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_GAME_PERSISTENCE']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_DOSARREST_ORIGIN_CORP']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_MARKETPLACE_API']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_METRICS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_AUTH']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_APIS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_LOCALE']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_AB_TESTING']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_USERS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_TWO_STEP_VERIFICATION']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_LATENCY_MEASUREMENTS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_CHAT']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_CONTACTS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_NOTIFICATIONS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_ACCOUNT_SETTINGS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_ADS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_TRADES']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_FRIENDS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_PRIVATE_MESSAGES']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_ECONOMY']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_GAMES']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_REAL_TIME']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_THUMB_NAILS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_PRESENCE']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_GROUPS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_ACCOUNT_INFORMATION']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_BADGES']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_DEVELOPER_FORUM']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_PREMIUM_FEATURES']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS']);
LOGGROUP(Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_CDN']);

(async () => {
	try {
		await Roblox.Api.Helpers.Helpers.Sessions.ClearCachedSessions();

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
		const ROBLOX_USERS_SERVER = IServer();
		const ROBLOX_TWO_STEP_VERIFICATION_SERVER = IServer();
		const ROBLOX_LATENCY_MEASUREMENTS_SERVER = IServer();
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
		const ROBLOX_THUMB_NAILS_SERVER = IServer();
		const ROBLOX_PRESENCE_SERVER = IServer();
		const ROBLOX_GROUPS_SERVER = IServer();
		const ROBLOX_ACCOUNT_INFORMATION_SERVER = IServer();
		const ROBLOX_BADGES_SERVER = IServer();
		const ROBLOX_DEVELOPER_FORUM_SERVER = IServer();
		const ROBLOX_PREMIUM_FEATURES_SERVER = IServer();
		const ROBLOX_CLIENT_SETTINGS_SERVER = IServer();
		const ROBLOX_CLIENT_SETTINGS_CDN_SERVER = IServer();

		ROBLOX_WWW_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_STATIC_CDN_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_JS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CSS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_IMAGES_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_SETUP_CDN_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_API_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_EPHEMERAL_COUNTERS_API_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_EPHEMERAL_COUNTERS_VERSION_2_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		DEPRECATED_ROBLOX_TEMPORARY_IMAGES_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_VERSION_COMPATIBILITY_API_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CLIENT_SETTINGS_API_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ASSET_GAME_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_GAME_PERSISTENCE_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_DOSARREST_ORIGIN_CORP_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_MARKETPLACE_API_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_METRICS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_APIS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_LOCALE_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_AUTH_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_AB_TESTING_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_USERS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_TWO_STEP_VERIFICATION_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_LATENCY_MEASUREMENTS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CHAT_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CONTACTS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_NOTIFICATIONS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ACCOUNT_SETTINGS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ADS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_TRADES_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_FRIENDS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_PRIVATE_MESSAGES_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ECONOMY_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_GAMES_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_REAL_TIME_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_THUMB_NAILS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_PRESENCE_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_GROUPS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_ACCOUNT_INFORMATION_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_BADGES_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_DEVELOPER_FORUM_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_PREMIUM_FEATURES_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CLIENT_SETTINGS_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);
		ROBLOX_CLIENT_SETTINGS_CDN_SERVER.use(Roblox.Api.Helpers.BeforeNext.Middle.GLOBAL);

		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_STATIC_CDN_SERVER,
				'\\Roblox.StaticPages\\Roblox.StaticCDN',
				'\\Implementation\\Roblox.Controllers\\Roblox.StaticCDN',
				Roblox.Api.Constants.URLS['ROBLOX_STATIC_CDN'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_JS_SERVER,
				'\\Roblox.StaticPages\\Roblox.JS.Distribution',
				'\\Implementation\\Roblox.Controllers\\Roblox.JS',
				Roblox.Api.Constants.URLS['ROBLOX_JS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_CSS_SERVER,
				'\\Roblox.StaticPages\\Roblox.CSS',
				'\\Implementation\\Roblox.Controllers\\Roblox.CSS',
				Roblox.Api.Constants.URLS['ROBLOX_CSS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_IMAGES_SERVER,
				'\\Roblox.StaticPages\\Roblox.Images',
				'\\Implementation\\Roblox.Controllers\\Roblox.Images',
				Roblox.Api.Constants.URLS['ROBLOX_IMAGES'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_API_SERVER,
				'\\Roblox.StaticPages\\Roblox.Api',
				'\\Implementation\\Roblox.Controllers\\Roblox.Api',
				Roblox.Api.Constants.URLS['ROBLOX_API'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_SETUP_CDN_SERVER,
				'\\Roblox.StaticPages\\Roblox.SetupCDN',
				'\\Implementation\\Roblox.Controllers\\Roblox.SetupCDN',
				Roblox.Api.Constants.URLS['ROBLOX_SETUP_CDN'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_WWW_SERVER,
				'\\Roblox.StaticPages\\Roblox.WWWRoot',
				'\\Implementation\\Roblox.Controllers\\Roblox.WWWRoot',
				Roblox.Api.Constants.URLS['ROBLOX_WWW'],
				false,
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_EPHEMERAL_COUNTERS_API_SERVER,
				'\\Roblox.StaticPages\\Roblox.EphemeralCountersApi',
				'\\Implementation\\Roblox.Controllers\\Roblox.EphemeralCountersApi',
				Roblox.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_API'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_EPHEMERAL_COUNTERS_VERSION_2_SERVER,
				'\\Roblox.StaticPages\\Roblox.EphemeralCounters.Version_2',
				'\\Implementation\\Roblox.Controllers\\Roblox.EphemeralCounters.Version_2',
				Roblox.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_VERSION_2'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				DEPRECATED_ROBLOX_TEMPORARY_IMAGES_SERVER,
				'\\Roblox.StaticPages\\Roblox.TemporaryImages',
				'\\Implementation\\Roblox.Controllers\\Roblox.TemporaryImages',
				Roblox.Api.Constants.URLS['DEPRECATED_ROBLOX_TEMPORARY_IMAGES'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_VERSION_COMPATIBILITY_API_SERVER,
				'\\Roblox.StaticPages\\Roblox.VersionCompatibilityApi',
				'\\Implementation\\Roblox.Controllers\\Roblox.VersionCompatibilityApi',
				Roblox.Api.Constants.URLS['ROBLOX_VERSION_COMPATIBILITY_API'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_CLIENT_SETTINGS_API_SERVER,
				'\\Roblox.StaticPages\\Roblox.ClientSettingsApi',
				'\\Implementation\\Roblox.Controllers\\Roblox.ClientSettingsApi',
				Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_API'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_ASSET_GAME_SERVER,
				'\\Roblox.StaticPages\\Roblox.AssetGame',
				'\\Implementation\\Roblox.Controllers\\Roblox.AssetGame',
				Roblox.Api.Constants.URLS['ROBLOX_ASSET_GAME'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_GAME_PERSISTENCE_SERVER,
				'\\Roblox.StaticPages\\Roblox.GamePersistence',
				'\\Implementation\\Roblox.Controllers\\Roblox.GamePersistence',
				Roblox.Api.Constants.URLS['ROBLOX_GAME_PERSISTENCE'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_DOSARREST_ORIGIN_CORP_SERVER,
				'\\Roblox.StaticPages\\Roblox.DOSArrest',
				'\\Implementation\\Roblox.Controllers\\Roblox.DOSArrest',
				Roblox.Api.Constants.URLS['ROBLOX_DOSARREST_ORIGIN_CORP'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_MARKETPLACE_API_SERVER,
				'\\Roblox.StaticPages\\Roblox.MarketPlaceApi',
				'\\Implementation\\Roblox.Controllers\\Roblox.MarketPlaceApi',
				Roblox.Api.Constants.URLS['ROBLOX_MARKETPLACE_API'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_METRICS_SERVER,
				'\\Roblox.StaticPages\\Roblox.Metrics',
				'\\Implementation\\Roblox.Controllers\\Roblox.Metrics',
				Roblox.Api.Constants.URLS['ROBLOX_METRICS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_AUTH_SERVER,
				'\\Roblox.StaticPages\\Roblox.Auth',
				'\\Implementation\\Roblox.Controllers\\Roblox.Auth',
				Roblox.Api.Constants.URLS['ROBLOX_AUTH'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_APIS_SERVER,
				'\\Roblox.StaticPages\\Roblox.Apis',
				'\\Implementation\\Roblox.Controllers\\Roblox.Apis',
				Roblox.Api.Constants.URLS['ROBLOX_APIS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_LOCALE_SERVER,
				'\\Roblox.StaticPages\\Roblox.Locale',
				'\\Implementation\\Roblox.Controllers\\Roblox.Locale',
				Roblox.Api.Constants.URLS['ROBLOX_LOCALE'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_AB_TESTING_SERVER,
				'\\Roblox.StaticPages\\Roblox.AbTesting',
				'\\Implementation\\Roblox.Controllers\\Roblox.AbTesting',
				Roblox.Api.Constants.URLS['ROBLOX_AB_TESTING'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_USERS_SERVER,
				'\\Roblox.StaticPages\\Roblox.Users',
				'\\Implementation\\Roblox.Controllers\\Roblox.Users',
				Roblox.Api.Constants.URLS['ROBLOX_USERS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_TWO_STEP_VERIFICATION_SERVER,
				'\\Roblox.StaticPages\\Roblox.TwoStepVerification',
				'\\Implementation\\Roblox.Controllers\\Roblox.TwoStepVerification',
				Roblox.Api.Constants.URLS['ROBLOX_TWO_STEP_VERIFICATION'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_LATENCY_MEASUREMENTS_SERVER,
				'\\Roblox.StaticPages\\Roblox.LatencyMeasurements',
				'\\Implementation\\Roblox.Controllers\\Roblox.LatencyMeasurements',
				Roblox.Api.Constants.URLS['ROBLOX_LATENCY_MEASUREMENTS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_CHAT_SERVER,
				'\\Roblox.StaticPages\\Roblox.Chat',
				'\\Implementation\\Roblox.Controllers\\Roblox.Chat',
				Roblox.Api.Constants.URLS['ROBLOX_CHAT'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_CONTACTS_SERVER,
				'\\Roblox.StaticPages\\Roblox.Contacts',
				'\\Implementation\\Roblox.Controllers\\Roblox.Contacts',
				Roblox.Api.Constants.URLS['ROBLOX_CONTACTS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_NOTIFICATIONS_SERVER,
				'\\Roblox.StaticPages\\Roblox.Notifications',
				'\\Implementation\\Roblox.Controllers\\Roblox.Notifications',
				Roblox.Api.Constants.URLS['ROBLOX_NOTIFICATIONS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_ACCOUNT_SETTINGS_SERVER,
				'\\Roblox.StaticPages\\Roblox.AccountSettings',
				'\\Implementation\\Roblox.Controllers\\Roblox.AccountSettings',
				Roblox.Api.Constants.URLS['ROBLOX_ACCOUNT_SETTINGS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_ADS_SERVER,
				'\\Roblox.StaticPages\\Roblox.Ads',
				'\\Implementation\\Roblox.Controllers\\Roblox.Ads',
				Roblox.Api.Constants.URLS['ROBLOX_ADS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_TRADES_SERVER,
				'\\Roblox.StaticPages\\Roblox.Trades',
				'\\Implementation\\Roblox.Controllers\\Roblox.Trades',
				Roblox.Api.Constants.URLS['ROBLOX_TRADES'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_FRIENDS_SERVER,
				'\\Roblox.StaticPages\\Roblox.Friends',
				'\\Implementation\\Roblox.Controllers\\Roblox.Friends',
				Roblox.Api.Constants.URLS['ROBLOX_FRIENDS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_PRIVATE_MESSAGES_SERVER,
				'\\Roblox.StaticPages\\Roblox.PrivateMessages',
				'\\Implementation\\Roblox.Controllers\\Roblox.PrivateMessages',
				Roblox.Api.Constants.URLS['ROBLOX_PRIVATE_MESSAGES'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_ECONOMY_SERVER,
				'\\Roblox.StaticPages\\Roblox.Economy',
				'\\Implementation\\Roblox.Controllers\\Roblox.Economy',
				Roblox.Api.Constants.URLS['ROBLOX_ECONOMY'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_GAMES_SERVER,
				'\\Roblox.StaticPages\\Roblox.Games',
				'\\Implementation\\Roblox.Controllers\\Roblox.Games',
				Roblox.Api.Constants.URLS['ROBLOX_GAMES'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_REAL_TIME_SERVER,
				'\\Roblox.StaticPages\\Roblox.RealTime',
				'\\Implementation\\Roblox.Controllers\\Roblox.RealTime',
				Roblox.Api.Constants.URLS['ROBLOX_REAL_TIME'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_THUMB_NAILS_SERVER,
				'\\Roblox.StaticPages\\Roblox.ThumbNails',
				'\\Implementation\\Roblox.Controllers\\Roblox.ThumbNails',
				Roblox.Api.Constants.URLS['ROBLOX_THUMB_NAILS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_PRESENCE_SERVER,
				'\\Roblox.StaticPages\\Roblox.Presence',
				'\\Implementation\\Roblox.Controllers\\Roblox.Presence',
				Roblox.Api.Constants.URLS['ROBLOX_PRESENCE'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_GROUPS_SERVER,
				'\\Roblox.StaticPages\\Roblox.Groups',
				'\\Implementation\\Roblox.Controllers\\Roblox.Groups',
				Roblox.Api.Constants.URLS['ROBLOX_GROUPS'],
			),
		);

		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_ACCOUNT_INFORMATION_SERVER,
				'\\Roblox.StaticPages\\Roblox.AccountInformation',
				'\\Implementation\\Roblox.Controllers\\Roblox.AccountInformation',
				Roblox.Api.Constants.URLS['ROBLOX_ACCOUNT_INFORMATION'],
			),
		);

		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_BADGES_SERVER,
				'\\Roblox.StaticPages\\Roblox.Badges',
				'\\Implementation\\Roblox.Controllers\\Roblox.Badges',
				Roblox.Api.Constants.URLS['ROBLOX_BADGES'],
			),
		);

		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_DEVELOPER_FORUM_SERVER,
				'\\Roblox.StaticPages\\Roblox.DeveloperForum',
				'\\Implementation\\Roblox.Controllers\\Roblox.DeveloperForum',
				Roblox.Api.Constants.URLS['ROBLOX_DEVELOPER_FORUM'],
			),
		);

		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_PREMIUM_FEATURES_SERVER,
				'\\Roblox.StaticPages\\Roblox.PremiumFeatures',
				'\\Implementation\\Roblox.Controllers\\Roblox.PremiumFeatures',
				Roblox.Api.Constants.URLS['ROBLOX_PREMIUM_FEATURES'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_CLIENT_SETTINGS_SERVER,
				'\\Roblox.StaticPages\\Roblox.ClientSettings',
				'\\Implementation\\Roblox.Controllers\\Roblox.ClientSettings',
				Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS'],
			),
		);
		await Roblox.Api.Library.IStartup.Configure(
			Roblox.Api.Helpers.Config.CONFIG(
				ROBLOX_CLIENT_SETTINGS_CDN_SERVER,
				'\\Roblox.StaticPages\\Roblox.ClientSettingsCDN',
				'\\Implementation\\Roblox.Controllers\\Roblox.ClientSettingsCDN',
				Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_CDN'],
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
		ROBLOX_APIS_SERVER.use(ROBLOX_404_API);
		ROBLOX_LOCALE_SERVER.use(ROBLOX_404_API);
		ROBLOX_AB_TESTING_SERVER.use(ROBLOX_404_API);
		ROBLOX_USERS_SERVER.use(ROBLOX_404_API);
		ROBLOX_LATENCY_MEASUREMENTS_SERVER.use(ROBLOX_404_API);
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
		ROBLOX_THUMB_NAILS_SERVER.use(ROBLOX_404_API);
		ROBLOX_PRESENCE_SERVER.use(ROBLOX_404_API);
		ROBLOX_GROUPS_SERVER.use(ROBLOX_404_API);
		ROBLOX_ACCOUNT_INFORMATION_SERVER.use(ROBLOX_404_API);
		ROBLOX_BADGES_SERVER.use(ROBLOX_404_API);
		ROBLOX_DEVELOPER_FORUM_SERVER.use(ROBLOX_404_API);
		ROBLOX_PREMIUM_FEATURES_SERVER.use(ROBLOX_404_API);
		ROBLOX_CLIENT_SETTINGS_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);
		ROBLOX_CLIENT_SETTINGS_CDN_SERVER.use(ROBLOX_404_EPHEMERAL_COUNTERS);

		await (async () => {
			try {
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_IMAGES_SERVER, Roblox.Api.Constants.URLS['ROBLOX_IMAGES']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_WWW_SERVER, Roblox.Api.Constants.URLS['ROBLOX_WWW']);
				const [ROBLOX_API_HTTP, ROBLOX_API_HTTPS] = Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_API_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_API'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_STATIC_CDN_SERVER, Roblox.Api.Constants.URLS['ROBLOX_STATIC_CDN']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_JS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_JS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_CSS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_CSS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_SETUP_CDN_SERVER, Roblox.Api.Constants.URLS['ROBLOX_SETUP_CDN']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					DEPRECATED_ROBLOX_TEMPORARY_IMAGES_SERVER,
					Roblox.Api.Constants.URLS['DEPRECATED_ROBLOX_TEMPORARY_IMAGES'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_VERSION_COMPATIBILITY_API_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_VERSION_COMPATIBILITY_API'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CLIENT_SETTINGS_API_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_API'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_ASSET_GAME_SERVER, Roblox.Api.Constants.URLS['ROBLOX_ASSET_GAME']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_EPHEMERAL_COUNTERS_API_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_API'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_EPHEMERAL_COUNTERS_VERSION_2_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_EPHEMERAL_COUNTERS_VERSION_2'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_GAME_PERSISTENCE_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_GAME_PERSISTENCE'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_DOSARREST_ORIGIN_CORP_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_DOSARREST_ORIGIN_CORP'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_METRICS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_METRICS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_AUTH_SERVER, Roblox.Api.Constants.URLS['ROBLOX_AUTH']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_APIS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_APIS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_LOCALE_SERVER, Roblox.Api.Constants.URLS['ROBLOX_LOCALE']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_MARKETPLACE_API_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_MARKETPLACE_API'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_AB_TESTING_SERVER, Roblox.Api.Constants.URLS['ROBLOX_AB_TESTING']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_USERS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_USERS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_TWO_STEP_VERIFICATION_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_TWO_STEP_VERIFICATION'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_LATENCY_MEASUREMENTS_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_LATENCY_MEASUREMENTS'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_CHAT_SERVER, Roblox.Api.Constants.URLS['ROBLOX_CHAT']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_CONTACTS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_CONTACTS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_NOTIFICATIONS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_NOTIFICATIONS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_ACCOUNT_SETTINGS_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_ACCOUNT_SETTINGS'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_ADS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_ADS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_TRADES_SERVER, Roblox.Api.Constants.URLS['ROBLOX_TRADES']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_FRIENDS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_FRIENDS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_PRIVATE_MESSAGES_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_PRIVATE_MESSAGES'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_ECONOMY_SERVER, Roblox.Api.Constants.URLS['ROBLOX_ECONOMY']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_GAMES_SERVER, Roblox.Api.Constants.URLS['ROBLOX_GAMES']);
				const [ROBLOX_REAL_TIME_HTTP, ROBLOX_REAL_TIME_HTTPS] = Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_REAL_TIME_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_REAL_TIME'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_THUMB_NAILS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_THUMB_NAILS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_PRESENCE_SERVER, Roblox.Api.Constants.URLS['ROBLOX_PRESENCE']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_GROUPS_SERVER, Roblox.Api.Constants.URLS['ROBLOX_GROUPS']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_ACCOUNT_INFORMATION_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_ACCOUNT_INFORMATION'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_BADGES_SERVER, Roblox.Api.Constants.URLS['ROBLOX_BADGES']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_DEVELOPER_FORUM_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_DEVELOPER_FORUM'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_PREMIUM_FEATURES_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_PREMIUM_FEATURES'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CLIENT_SETTINGS_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(
					ROBLOX_CLIENT_SETTINGS_CDN_SERVER,
					Roblox.Api.Constants.URLS['ROBLOX_CLIENT_SETTINGS_CDN'],
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_SignalR_Config_Helper(
					ROBLOX_API_HTTP,
					ROBLOX_API_HTTPS,
					'\\Implementation\\Roblox.Sockets\\Roblox.Api',
					Roblox.Api.Constants.URLS.ROBLOX_API,
				);
				Roblox.Api.Helpers.Web.Util.ROBLOX_SignalR_Config_Helper(
					ROBLOX_REAL_TIME_HTTP,
					ROBLOX_REAL_TIME_HTTPS,
					'\\Implementation\\Roblox.Sockets\\Roblox.RealTime',
					Roblox.Api.Constants.URLS.ROBLOX_REAL_TIME,
				);
			} catch (e) {
				return Roblox.Api.Helpers.Util.FastLog.FASTLOG2(
					'FLog::Tests',
					Roblox.Api.Helpers.Util.FLog['Tasks'],
					`Error: %s, Stack Trace: %s`,
					e.message,
					e.stack,
				);
			}
		})();
	} catch (e) {
		return Roblox.Api.Helpers.Util.FastLog.FASTLOG2(
			'FLog::Tests',
			Roblox.Api.Helpers.Util.FLog['Tasks'],
			`Error: %s, Stack Trace: %s`,
			e.message,
			e.stack,
		);
	}
})();

process.stdin.resume();
function exitHandler(options: { exit: boolean; error: boolean; message?: string; code?: number }) {
	if (options.exit) {
		if (options.error) return FASTLOG7('tasks', `Fatal: ${options.message}`, true);
		if (options.message) return FASTLOG4('tasks', `Warn: ${options.message}`, true);
		process.exit();
	}
}
process.on('SIGINT', exitHandler.bind(null, { exit: true, message: 'SIGINT on server' }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true, message: 'SIGUSR1 on server' }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true, message: 'SIGUSR2 on server' }));
process.on('uncaughtException', (e) => {
	exitHandler({ exit: true, error: true, message: `Name: ${e.name}, Reason: ${e.message}, Stack Trace: ${e.stack}` });
});
