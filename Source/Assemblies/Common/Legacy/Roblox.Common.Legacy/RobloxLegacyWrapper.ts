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

	NOTICE This Application Programming Interface will be hosted on both https://*.sitetest4.robloxlabs.com:443 and http://*.sitetest4.robloxlabs.com:80.
	DEPRECATED DO NOT USE OutgoingMessage.prototype._headers, silence with --no-deprecation

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

import { SystemSDK as IStartupImport } from '../../../Web/Util/Roblox.Web.Util/Setup/Lib/SystemSDK';
import { CheckIfAuthTokenExists as CheckIfAuthTokenExistsImport } from '../../../Web/Auth/Roblox.Web.Auth/CheckIfAuthTokenExists_OLD';
import { GetImageHashes as GetImageHashesImport } from '../../../Web/Auth/Roblox.Web.Auth/DEPRECATED_GetImageHashes';
import { GetManifests as GetManifestsImport } from '../../../Caching/Database/Roblox.Caching.Database/DEPRECATED_GetManifest';
import { GetRegisteredUsers as GetRegisteredUsersImport } from '../../../Caching/Database/Roblox.Caching.Database/DEPRECATED_GetRegisteredUsers';
import { GetSessions as GetSessionsImport } from '../../../Caching/Database/Roblox.Caching.Database/DEPRECATED_GetSessions';
import { WriteToManifest as WriteToManifestImport } from '../../../Caching/Database/Roblox.Caching.Database/DEPRECATED_WriteToManifest';
import { GetKeyOrEntryForScope as GetKeyOrEntryForScopeImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/GetKeyOrEntryForScope';
import { GetKeysOrEntriesForScope as GetKeysOrEntriesForScopeImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/GetKeysOrEntriesForScope';
import { GetPersistentStoreForUniverse as GetPersistentStoreForUniverseImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/GetPersistentStoreForUniverse';
import { GetPersistentStoresForUniverse as GetPersistentStoresForUniverseImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/GetPersistentStoresForUniverse';
import { GetScopeForPersistentStore as GetScopeForPersistentStoreImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/GetScopeForPersistentStore';
import { GetScopesForPersistentStore as GetScopesForPersistentStoreImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/GetScopesForPersistentStore';
import { PurgeKeyFromScope as PurgeKeyFromScopeImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/PurgeKeyFromScope';
import { PurgeScopeFromPersistentStore as PurgeScopeFromPersistentStoreImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/PurgeScopeFromPersistentStore';
import { PurgeUniverse as PurgeUniverseImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/PurgeUniverse';
import { PurgeUniversePersistentStore as PurgeUniversePersistentStoreImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/PurgeUniversePersistentStore';
import { PushKeyToPersistentStore as PushKeyToPersistentStoreImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/PushKeyToPersistentStore';
import { PushPersistentStoreToUniverse as PushPersistentStoreToUniverseImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/PushPersistentStoreToUniverse';
import { WriteUniverse as WriteUniverseImport } from '../../../Platform/GamePersistence/Roblox.Platform.GamePersistence/Caching/Implementation/PushUniverseToDB';
import { GetPlaceFromId as GetPlaceFromIdImport } from '../../../Caching/Universes/Roblox.Caching.Universes/GetPlaceFromId';
import { CheckIfUniverseExists as CheckIfUniverseExistsImport } from '../../../Caching/Universes/Roblox.Caching.Universes/CheckIfUniverseExists';
import { CheckIfPlaceExists as CheckIfPlaceExistsImport } from '../../../Caching/Universes/Roblox.Caching.Universes/CheckIfPlaceExists';
import { CheckIfPlaceIsRooted as CheckIfPlaceIsRootedImport } from '../../../Caching/Universes/Roblox.Caching.Universes/CheckIfPlaceIsRooted';
import { GetUniverseIdFromPlaceId as GetUniverseIdFromPlaceIdImport } from '../../../Caching/Universes/Roblox.Caching.Universes/GetUniverseIdFromPlaceId';
import { GetUniverseFromPlaceId as GetUniverseFromPlaceIdImport } from '../../../Caching/Universes/Roblox.Caching.Universes/GetUniverseFromPlaceId';
import { GetRootPlaceIdFromUniverseId as GetRootPlaceIdFromUniverseIdImport } from '../../../Caching/Universes/Roblox.Caching.Universes/GetRootPlaceIdFromUniverseId';
import { GetRootPlaceFromUniverseId as GetRootPlaceFromUniverseIdImport } from '../../../Caching/Universes/Roblox.Caching.Universes/GetRootPlaceFromUniverseId';
import { ClearCachedSessions as ClearCachedSessionsImport } from '../../../Caching/Sessions/Roblox.Caching.Sessions/ClearCachedSessions';
import { CreateCaptchaBlobSessionAfter403 as CreateCaptchaBlobSessionAfter403Import } from '../../../Caching/Sessions/Roblox.Caching.Sessions/CreateCaptchaBlobSessionAfter403';
import { SetCaptchaSessionField as SetCaptchaSessiontFieldImport } from '../../../Caching/Sessions/Roblox.Caching.Sessions/SetCaptchaSessionField';
import { GetCsrfSession as GetCsrfSessionImport } from '../../../Caching/Sessions/Roblox.Caching.Sessions/GetCsrfSession';
import { DeleteCsrfSession as DeleteCsrfSessionImport } from '../../../Caching/Sessions/Roblox.Caching.Sessions/DeleteCsrfSession';
import { DeleteCaptchaSession as DeleteCaptchaSessionImport } from '../../../Caching/Sessions/Roblox.Caching.Sessions/DeleteCaptchaSession';
import { CreateOrGetXsrfSession as CreateOrGetXsrfSessionImport } from '../../../Caching/Sessions/Roblox.Caching.Sessions/CreateOrGetXsrfSession';
import { CreateCsrfSessionFile as CreateCsrfSessionFileImport } from '../../../Caching/Sessions/Roblox.Caching.Sessions/CreateCsrfSessionFile';
import { CreateCaptchaSessionBlob as CreateCaptchaSessionBlobImport } from '../../../Caching/Sessions/Roblox.Caching.Sessions/CreateCaptchaSessionBlob';
import { ClientSettings as ClientSettingsImport } from '../../../Platform/ClientSettings/Roblox.Platform.ClientSettings/Implementation/ClientSettingsUtil';
import { ROBLOX_Starter as StarterImport } from '../../../Web/Servers/Roblox.Web.Servers/ServerStarterUtil';
import { SignalRSetup as SignalR } from '../../../Web/SignalR/Roblox.Web,SignalR/SignalRSetup';
import HeadersImport from '../../Constants/Roblox.Common.Constants/DefaultHeaders';
import { __baseDirName, __sslDirName } from '../../Constants/Roblox.Common.Constants/Directories';
import RobloxUrls from '../../Constants/Roblox.Common.Constants/Urls';
import { ShuffleArray as ShuffleArrayImport } from '../../KeyValueMapping/Roblox.Common.KeyValueMapping/ShuffleArray';
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
} from '../../../Web/Errors/Roblox.Web.Errors';
import { GlobalMiddleware } from '../../../Web/Handling/Roblox.Web.Handling/SiteTest4.Global.Middleware';
import ConfigImport from '../../Configuration/Roblox.Common.Configuration/MetadataBuilder';
import { AbTestingMiddleWare } from '../../../Web/Handling/Roblox.Web.Handling/AbTestingMiddleWare';
import { GamePersistenceMiddleware } from '../../../Web/Handling/Roblox.Web.Handling/GamePersistenceMiddleWare';
import { InternalModerationWebsitesMiddleware } from '../../../Web/Handling/Roblox.Web.Handling/InternalModerationWebsitesMiddleware';
import { Kestrel } from '../../../Web/Handling/Roblox.Web.Handling/Kestrel';

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
					export const ABTESTING = AbTestingMiddleWare;
					export const GAMEPERSISTENCE = GamePersistenceMiddleware;
					export const ADMINWEBSITE = InternalModerationWebsitesMiddleware;
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
				export const __iBaseDirectory = __baseDirName;
				export const __iSSLDirectory = __sslDirName;
			}
			export const URLS = RobloxUrls;
		}
	}
}
