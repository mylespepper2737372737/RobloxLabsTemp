/*
	FileName: Roblox.Api.ts
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
	Description: Copy of ROBLOX's namspace Roblox.Api

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	NOTICE This Application Programming Interface will be hosted on both https://*.sitetest4.robloxlabs.com:443 and https://*.sitetest4.robloxlabs.com:80.
	DEPRECATED DO NOT USE OutgoingMessage.prototype._headers, silence with --no-deprecation
	FIXME https redirection is broken, use a different module.

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

import { IStartup as IStartupImport } from './SDK/IStartupSDK';
import { CheckIfAuthTokenExists as CheckIfAuthTokenExistsImport } from './Helpers/WebHelpers/Auth/CheckIfAuthTokenExists';
import { CheckIfAuthTokenExistsAndReturnOwner as CheckIfAuthTokenExistsAndReturnOwnerImport } from './Helpers/WebHelpers/Auth/CheckIfAuthTokenExists';
import { GetImageHashes as GetImageHashesImport } from './Helpers/WebHelpers/Auth/DEPRECATED_GetImageHashes';
import { GetManifests as GetManifestsImport } from './Helpers/WebHelpers/DataBase/DEPRECATED_GetManifest';
import { GetRegisteredUsers as GetRegisteredUsersImport } from './Helpers/WebHelpers/DataBase/DEPRECATED_GetRegisteredUsers';
import { GetSessions as GetSessionsImport } from './Helpers/WebHelpers/DataBase/DEPRECATED_GetSessions';
import { WriteToManifest as WriteToManifestImport } from './Helpers/WebHelpers/DataBase/DEPRECATED_WriteToManifest';
import { GetKeyOrEntryForScope as GetKeyOrEntryForScopeImport } from './Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetKeyOrEntryForScope';
import { GetKeysOrEntriesForScope as GetKeysOrEntriesForScopeImport } from './Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetKeysOrEntriesForScope';
import { GetPersistentStoreForUniverse as GetPersistentStoreForUniverseImport } from './Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetPersistentStoreForUniverse';
import { GetPersistentStoresForUniverse as GetPersistentStoresForUniverseImport } from './Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetPersistentStoresForUniverse';
import { GetScopeForPersistentStore as GetScopeForPersistentStoreImport } from './Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetScopeForPersistentStore';
import { GetScopesForPersistentStore as GetScopesForPersistentStoreImport } from './Helpers/WebHelpers/PersistentDataStores/GetHelpers/GetScopesForPersistentStore';
import { PurgeKeyFromScope as PurgeKeyFromScopeImport } from './Helpers/WebHelpers/PersistentDataStores/PurgeHelpers/PurgeKeyFromScope';
import { PurgeScopeFromPersistentStore as PurgeScopeFromPersistentStoreImport } from './Helpers/WebHelpers/PersistentDataStores/PurgeHelpers/PurgeScopeFromPersistentStore';
import { PurgeUniverse as PurgeUniverseImport } from './Helpers/WebHelpers/PersistentDataStores/PurgeHelpers/PurgeUniverse';
import { PurgeUniversePersistentStore as PurgeUniversePersistentStoreImport } from './Helpers/WebHelpers/PersistentDataStores/PurgeHelpers/PurgeUniversePersistentStore';
import { PushKeyToPersistentStore as PushKeyToPersistentStoreImport } from './Helpers/WebHelpers/PersistentDataStores/SetHelpers/PushKeyToPersistentStore';
import { PushPersistentStoreToUniverse as PushPersistentStoreToUniverseImport } from './Helpers/WebHelpers/PersistentDataStores/SetHelpers/PushPersistentStoreToUniverse';
import { WriteUniverse as WriteUniverseImport } from './Helpers/WebHelpers/PersistentDataStores/SetHelpers/PushUniverseToDB';
import { GetPlaceFromId as GetPlaceFromIdImport } from './Helpers/WebHelpers/Universes/GetPlaceFromId';
import { CheckIfUniverseExists as CheckIfUniverseExistsImport } from './Helpers/WebHelpers/Universes/CheckIfUniverseExists';
import { CheckIfPlaceExists as CheckIfPlaceExistsImport } from './Helpers/WebHelpers/Universes/CheckIfPlaceExists';
import { CheckIfPlaceIsRooted as CheckIfPlaceIsRootedImport } from './Helpers/WebHelpers/Universes/CheckIfPlaceIsRooted';
import { GetUniverseIdFromPlaceId as GetUniverseIdFromPlaceIdImport } from './Helpers/WebHelpers/Universes/GetUniverseIdFromPlaceId';
import { GetUniverseFromPlaceId as GetUniverseFromPlaceIdImport } from './Helpers/WebHelpers/Universes/GetUniverseFromPlaceId';
import { GetRootPlaceIdFromUniverseId as GetRootPlaceIdFromUniverseIdImport } from './Helpers/WebHelpers/Universes/GetRootPlaceIdFromUniverseId';
import { GetRootPlaceFromUniverseId as GetRootPlaceFromUniverseIdImport } from './Helpers/WebHelpers/Universes/GetRootPlaceFromUniverseId';
import { ClearCachedSessions as ClearCachedSessionsImport } from './Helpers/WebHelpers/Roblox.Sessions/Roblox.Sessions.ClearCachedSessions';
import { CreateCaptchaBlobSessionAfter403 as CreateCaptchaBlobSessionAfter403Import } from './Helpers/WebHelpers/Roblox.Sessions/Roblox.Sessions.CreateCaptchaBlobSessionAfter403';
import { SetCaptchaSessionField as SetCaptchaSessiontFieldImport } from './Helpers/WebHelpers/Roblox.Sessions/Roblox.Sessions.SetCaptchaSessionField';
import { GetCsrfSession as GetCsrfSessionImport } from './Helpers/WebHelpers/Roblox.Sessions/Roblox.Sessions.GetCsrfSession';
import { DeleteCsrfSession as DeleteCsrfSessionImport } from './Helpers/WebHelpers/Roblox.Sessions/Roblox.Sessions.DeleteCsrfSession';
import { DeleteCaptchaSession as DeleteCaptchaSessionImport } from './Helpers/WebHelpers/Roblox.Sessions/Roblox.Sessions.DeleteCaptchaSession';
import { CreateOrGetXsrfSession as CreateOrGetXsrfSessionImport } from './Helpers/WebHelpers/Roblox.Sessions/Roblox.Sessions.CreateOrGetXsrfSession';
import { CreateCsrfSessionFile as CreateCsrfSessionFileImport } from './Helpers/WebHelpers/Roblox.Sessions/Roblox.Sessions.CreateCsrfSessionFile';
import { CreateCaptchaSessionBlob as CreateCaptchaSessionBlobImport } from './Helpers/WebHelpers/Roblox.Sessions/Roblox.Sessions.CreateCaptchaSessionBlob';
import { ClientSettings as ClientSettingsImport } from './Helpers/WebHelpers/Roblox.Util/Roblox.Util.ClientSettings';
import { ROBLOX_Starter as StarterImport } from './Helpers/WebHelpers/Roblox.Web.Util/Roblox.Server.Starter';
import { ROBLOX_SignalR_Config_Helper as SignalR } from './Helpers/WebHelpers/Roblox.Web.Util/Roblox.SignalR.WebSocket.Helper';
import HeadersImport from './Helpers/Constants/Default.OutBound.Headers';
import { _dirname, _sslname } from './Helpers/Constants/Directories';
import RobloxUrls from './Helpers/Constants/Urls';
import { ShuffleArray as ShuffleArrayImport } from './Helpers/WebHelpers/Roblox.Util/Roblox.ShuffleArray';
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
} from './ErrorResponders';
import { GlobalMiddleware } from './Helpers/BeforeNext.Middle/SiteTest4.Global.Middleware';
import ConfigImport from './Helpers/Config/MetaData';
import { SimulPingMiddleware } from './Helpers/BeforeNext.Middle/SimulPingMiddleWare';
import { AbTestingMiddleWare } from './Helpers/BeforeNext.Middle/AbTestingMiddleWare';
import { GamePersistenceMiddleware } from './Helpers/BeforeNext.Middle/GamePersistenceMiddleWare';
import { AdminWebsiteMiddleWare } from './Helpers/BeforeNext.Middle/AdminWebsiteMiddleWare';
import { Kestrel } from './Helpers/BeforeNext.Middle/Kestrel';

export namespace RobloxLegacy {
	export namespace Api {
		export namespace Library {
			export const IStartup = IStartupImport;
		}
		export namespace Helpers {
			export namespace AfterNext {
				export namespace Middle {
					export const API = ROBLOX_404_API;
					export const CSS = ROBLOX_404_CSS;
					export const EPHEMERAL_COUNTERS_API = ROBLOX_404_EPHEMERAL_COUNTERS;
					export const IMAGES = ROBLOX_404_IMAGES;
					export const JS = ROBLOX_404_JS;
					export const SETUP_CDN = ROBLOX_404_SETUP_CDN;
					export const STATIC_CDN = ROBLOX_404_STATIC_CDN;
					export const DEPRECATED_TEMPORARY_IMAGES = DEPRECATED_404_TEMPORARY_IMAGES;
					export const WWW = ROBLOX_404_WWW;
				}
			}
			export namespace BeforeNext {
				export namespace Middle {
					export const GLOBAL = GlobalMiddleware;
					export const SIMULPONG = SimulPingMiddleware;
					export const ABTESTING = AbTestingMiddleWare;
					export const GAMEPERSISTENCE = GamePersistenceMiddleware;
					export const ADMINWEBSITE = AdminWebsiteMiddleWare;
					export const KESTREL = Kestrel;
				}
			}
			export namespace Config {
				export const CONFIG = ConfigImport;
			}
			export namespace Helpers {
				export namespace Auth {
					export const CheckIfAuthTokenExists = CheckIfAuthTokenExistsImport;
					export const GetImageHashes = GetImageHashesImport;
					export const CheckIfAuthTokenExistsAndReturnOwner = CheckIfAuthTokenExistsAndReturnOwnerImport;
				}
				export namespace DB {
					export const GetManifests = GetManifestsImport;
					export const GetRegisteredUsers = GetRegisteredUsersImport;
					export const GetSessions = GetSessionsImport;
					export const WriteToManifest = WriteToManifestImport;
				}
				export namespace PersistentDataStores {
					export namespace GetHelpers {
						export const GetKeyOrEntryForScope = GetKeyOrEntryForScopeImport;
						export const GetKeysOrEntriesForScope = GetKeysOrEntriesForScopeImport;
						export const GetPersistentStoreForUniverse = GetPersistentStoreForUniverseImport;
						export const GetPersistentStoresForUniverse = GetPersistentStoresForUniverseImport;
						export const GetScopeForPersistentStore = GetScopeForPersistentStoreImport;
						export const GetScopesForPersistentStore = GetScopesForPersistentStoreImport;
					}
					export namespace PurgeHelpers {
						export const PurgeKeyFromScope = PurgeKeyFromScopeImport;
						export const PurgeScopeFromPersistentStore = PurgeScopeFromPersistentStoreImport;
						export const PurgeUniverse = PurgeUniverseImport;
						export const PurgeUniversePersistentStore = PurgeUniversePersistentStoreImport;
					}
					export namespace SetHelpers {
						export const PushKeyToPersistentStore = PushKeyToPersistentStoreImport;
						export const PushPersistentStoreToUniverse = PushPersistentStoreToUniverseImport;
						export const WriteUniverse = WriteUniverseImport;
					}
				}
				export namespace Places {
					export const GetPlaceFromId = GetPlaceFromIdImport;
					export const CheckIfUniverseExists = CheckIfUniverseExistsImport;
					export const CheckIfPlaceExists = CheckIfPlaceExistsImport;
					export const CheckIfPlaceIsRooted = CheckIfPlaceIsRootedImport;
					export const GetUniverseIdFromPlaceId = GetUniverseIdFromPlaceIdImport;
					export const GetUniverseFromPlaceId = GetUniverseFromPlaceIdImport;
					export const GetRootPlaceIdFromUniverseId = GetRootPlaceIdFromUniverseIdImport;
					export const GetRootPlaceFromUniverseId = GetRootPlaceFromUniverseIdImport;
				}
				export namespace Sessions {
					export const ClearCachedSessions = ClearCachedSessionsImport;
					export const CreateCaptchaBlobSessionAfter403 = CreateCaptchaBlobSessionAfter403Import;
					export const SetCaptchaSessiontField = SetCaptchaSessiontFieldImport;
					export const GetCsrfSession = GetCsrfSessionImport;
					export const DeleteCsrfSession = DeleteCsrfSessionImport;
					export const DeleteCaptchaSession = DeleteCaptchaSessionImport;
					export const CreateOrGetXsrfSession = CreateOrGetXsrfSessionImport;
					export const CreateCsrfSessionFile = CreateCsrfSessionFileImport;
					export const CreateCaptchaSessionBlob = CreateCaptchaSessionBlobImport;
				}
			}
			export namespace Util {
				export const ClientSettings = ClientSettingsImport;
				export const ShuffleArray = ShuffleArrayImport;
			}
			export namespace Web {
				export namespace Util {
					export const ROBLOX_Starter = StarterImport;
					export const ROBLOX_SignalR_Config_Helper = SignalR;
				}
			}
		}
		export namespace Global {
			export namespace Helpers {}
		}
		export namespace Constants {
			export const OutboundHeaders = HeadersImport;
			export namespace RobloxDirectories {
				export const __iBaseDirectory = _dirname;
				export const __iSSLDirectory = _sslname;
			}
			export const URLS = RobloxUrls;
		}
	}
}
