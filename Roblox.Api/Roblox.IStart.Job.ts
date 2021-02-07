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

	All commits will be made on behalf of mfd-co to http://github.com/mfd-core/sitetest4.robloxlabs.com

	NOTICE This Application Programming Interface will be hosted on both http://*.sitetest4.robloxlabs.com:443 and http://*.sitetest4.robloxlabs.com:80.
	DEPRECATED DO NOT USE OutgoingMessage.prototype._headers, silence with --no-deprecation
	FIXME Https redirection is broken, use a different module.

	***

	Copyright 2015-2020 MFD

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://ROBLOX_WWW.apache.org/licenses/LICENSE-2.0

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
				true,
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

		await (async () => {
			try {
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_IMAGES_SERVER, Roblox.Api.Constants.URLS['ROBLOX_IMAGES']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_WWW_SERVER, Roblox.Api.Constants.URLS['ROBLOX_WWW']);
				Roblox.Api.Helpers.Web.Util.ROBLOX_Starter(ROBLOX_API_SERVER, Roblox.Api.Constants.URLS['ROBLOX_API']);
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
