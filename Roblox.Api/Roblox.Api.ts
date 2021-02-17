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
	FIXME http redirection is broken, use a different module.

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

import { IStartup as IStartupImport } from './Roblox.Library/Roblox.Library.IStartup';
import { CheckIfAuthTokenExists as CheckIfAuthTokenExistsImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Auth/Roblox.Api.Helpers.Auth.CheckIfAuthTokenExists';
import { GetImageHashes as GetImageHashesImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Auth/DEPRECATED_Roblox.Api.Helpers.Helpers.Auth.GetImageHashes';
import { GetManifests as GetManifestsImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.DB/DEPRECATED_Roblox.Api.Helpers.DB.GetManifest';
import { GetRegisteredUsers as GetRegisteredUsersImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.DB/DEPRECATED_Roblox.Api.Helpers.DB.GetRegisteredUsers';
import { GetSessions as GetSessionsImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.DB/DEPRECATED_Roblox.Api.Helpers.DB.GetSessions';
import { WriteToManifest as WriteToManifestImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.DB/DEPRECATED_Roblox.Api.Helpers.DB.WriteToManifest';
import { GetKeyOrEntryForScope as GetKeyOrEntryForScopeImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetKeyOrEntryForScope';
import { GetKeysOrEntriesForScope as GetKeysOrEntriesForScopeImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetKeysOrEntriesForScope';
import { GetPersistentStoreForUniverse as GetPersistentStoreForUniverseImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetPersistentStoreForUniverse';
import { GetPersistentStoresForUniverse as GetPersistentStoresForUniverseImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetPersistentStoresForUniverse';
import { GetScopeForPersistentStore as GetScopeForPersistentStoreImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetScopeForPersistentStore';
import { GetScopesForPersistentStore as GetScopesForPersistentStoreImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.GetHelpers/Roblox.PersistentDataStores.GetHelpers.GetScopesForPersistentStore';
import { PurgeKeyFromScope as PurgeKeyFromScopeImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.PurgeHelpers/Roblox.PersistentDataStores.PurgeHelpers.PurgeKeyFromScope';
import { PurgeScopeFromPersistentStore as PurgeScopeFromPersistentStoreImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.PurgeHelpers/Roblox.PersistentDataStores.PurgeHelpers.PurgeScopeFromPersistentStore';
import { PurgeUniverse as PurgeUniverseImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.PurgeHelpers/Roblox.PersistentDataStores.PurgeHelpers.PurgeUniverse';
import { PurgeUniversePersistentStore as PurgeUniversePersistentStoreImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.PurgeHelpers/Roblox.PersistentDataStores.PurgeHelpers.PurgeUniversePersistentStore';
import { PushKeyToPersistentStore as PushKeyToPersistentStoreImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.SetHelpers/Roblox.PersistentDataStores.SetHelpers.PushKeyToPersistentStore';
import { PushPersistentStoreToUniverse as PushPersistentStoreToUniverseImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.SetHelpers/Roblox.PersistentDataStores.SetHelpers.PushPersistentStoreToUniverse';
import { WriteUniverse as WriteUniverseImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.PersistentDataStores/Roblox.PersistentDataStores.SetHelpers/Roblox.PersistentDataStores.SetHelpers.WriteUniverse';
import { GetPlaceFromId as GetPlaceFromIdImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Places/Roblox.Places.GetPlaceFromId';
import { CheckIfUniverseExists as CheckIfUniverseExistsImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Places/Roblox.Places.CheckIfUniverseExists';
import { CheckIfPlaceExists as CheckIfPlaceExistsImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Places/Roblox.Places.CheckIfPlaceExists';
import { CheckIfPlaceIsRooted as CheckIfPlaceIsRootedImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Places/Roblox.Places.CheckIfPlaceIsRooted';
import { GetUniverseIdFromPlaceId as GetUniverseIdFromPlaceIdImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Places/Roblox.Places.GetUniverseIdFromPlaceId';
import { GetUniverseFromPlaceId as GetUniverseFromPlaceIdImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Places/Roblox.Places.GetUniverseFromPlaceId';
import { GetRootPlaceIdFromUniverseId as GetRootPlaceIdFromUniverseIdImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Places/Roblox.Places.GetRootPlaceIdFromUniverseId';
import { GetRootPlaceFromUniverseId as GetRootPlaceFromUniverseIdImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Places/Roblox.Places.GetRootPlaceFromUniverseId';
import { ClearCachedSessions as ClearCachedSessionsImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.ClearCachedSessions';
import { CreateCaptchaBlobSessionAfter403 as CreateCaptchaBlobSessionAfter403Import } from './Roblox.Helpers/Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.CreateCaptchaBlobSessionAfter403';
import { SetCaptchaSessionField as SetCaptchaSessiontFieldImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.SetCaptchaSessionField';
import { GetCsrfSession as GetCsrfSessionImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.GetCsrfSession';
import { DeleteCsrfSession as DeleteCsrfSessionImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.DeleteCsrfSession';
import { DeleteCaptchaSession as DeleteCaptchaSessionImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.DeleteCaptchaSession';
import { CreateOrGetXsrfSession as CreateOrGetXsrfSessionImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.CreateOrGetXsrfSession';
import { CreateCsrfSessionFile as CreateCsrfSessionFileImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.CreateCsrfSessionFile';
import { CreateCaptchaSessionBlob as CreateCaptchaSessionBlobImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Sessions/Roblox.Sessions.CreateCaptchaSessionBlob';
import { ClientSettings as ClientSettingsImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Util/Roblox.Util.ClientSettings';
import {
	FastLog as FastLogImported,
	FLog as FLogImported,
	SFLog as SFLogImported,
	DFLog as DFLogImported,
} from './Roblox.Helpers/Roblox.Helpers/Roblox.Util/Roblox.Util.FastLog';
import { ROBLOX_Starter as StarterImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Web.Util/Roblox.Server.Starter';
import { ROBLOX_SignalR_Config_Helper as SignalR } from './Roblox.Helpers/Roblox.Helpers/Roblox.Web.Util/Roblox.SignalR.WebSocket.Helper';
import HeadersImport from './Roblox.Helpers/Roblox.Constants/Roblox.Default.OutBound.Headers';
import { _dirname, _sslname } from './Roblox.Helpers/Roblox.Constants/Roblox.Directories';
import RobloxUrls from './Roblox.Helpers/Roblox.Constants/Roblox.Urls';
import { ShuffleArray as ShuffleArrayImport } from './Roblox.Helpers/Roblox.Helpers/Roblox.Util/Roblox.ShuffleArray';
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
import { GlobalMiddleware } from './Roblox.Helpers/Roblox.BeforeNext.Middle/Roblox.SiteTest4.Global.Middleware';
import ConfigImport from './Roblox.Helpers/Roblox.Config/Roblox.Config';

export namespace Roblox {
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
				export const FastLog = FastLogImported;
				export const FLog = FLogImported;
				export const DFLog = DFLogImported;
				export const SFLog = SFLogImported;
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
