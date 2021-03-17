/// <reference types="qs" />
/// <reference types="node" />
import { IStartup as IStartupImport } from './SDK/IStartupSDK';
import { ClientSettings as ClientSettingsImport } from './Helpers/WebHelpers/Roblox.Util/Roblox.Util.ClientSettings';
export declare namespace RobloxLegacy {
    namespace Api {
        namespace Library {
            const IStartup: typeof IStartupImport;
        }
        namespace Helpers {
            namespace AfterNext {
                namespace Middle {
                    const API: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const CSS: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const EPHEMERAL_COUNTERS_API: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const IMAGES: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const JS: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const SETUP_CDN: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const STATIC_CDN: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const DEPRECATED_TEMPORARY_IMAGES: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const WWW: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                }
            }
            namespace BeforeNext {
                namespace Middle {
                    const GLOBAL: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const SIMULPONG: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const ABTESTING: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const GAMEPERSISTENCE: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const ADMINWEBSITE: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    const KESTREL: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                }
            }
            namespace Config {
                const CONFIG: (app: import("express-serve-static-core").Express, PagesDir: string, EndpointsDir: string, apiName: string, errorpage?: boolean, fileListings?: boolean) => {
                    PagesOpts: {
                        path: string;
                    };
                    EndpointOpts: {
                        path: string;
                        logSetups: boolean;
                        apiName: string;
                    };
                    errorpage: boolean;
                    fileListings: boolean;
                    app: import("express-serve-static-core").Express;
                    UseEndpoints?: boolean;
                    UseRouting?: boolean;
                    RoutingOpts?: {
                        caseSensitive?: boolean;
                        mergeParams?: boolean;
                        strict?: boolean;
                    };
                    UsePages?: boolean;
                    PageOpts?: {
                        cacheControl?: boolean;
                        dotfiles?: string;
                        etag?: boolean;
                        extensions?: false | string[];
                        fallthrough?: boolean;
                        immutable?: boolean;
                        index?: string | boolean | string[];
                        lastModified?: boolean;
                        maxAge?: string | number;
                        redirect?: boolean;
                        setHeaders?: (res: import("http").OutgoingMessage, path: string, stat: unknown) => unknown;
                    };
                    signalr?: boolean;
                    hubs?: string[];
                };
            }
            namespace Helpers {
                namespace Auth {
                    const CheckIfAuthTokenExists: (id: string) => boolean;
                    const GetImageHashes: () => {
                        uri: string;
                        name: string;
                        correct: boolean;
                    }[];
                }
                namespace DB {
                    const GetManifests: () => Map<string, import("./Helpers/WebHelpers/DataBase/DEPRECATED_GetManifest").userType>;
                    const GetRegisteredUsers: () => any;
                    const GetSessions: () => Map<string, {
                        subject: string;
                        time: number;
                        answer: string;
                        token: string;
                    }>;
                    const WriteToManifest: (userId: string, field: string, value: unknown, pushIfArray?: boolean, popIfUndefined?: boolean, index?: number, spliceIfIndex?: boolean, createIfDoesntExist?: boolean) => any;
                }
                namespace PersistentDataStores {
                    namespace GetHelpers {
                        const GetKeyOrEntryForScope: (universeId: number, storeName: string, scopeName: string, keyName: string, isSorted?: boolean) => Promise<[boolean, {
                            keyName: string;
                            scope: string;
                            store: string;
                            universe: number;
                            version: number;
                            root: string;
                            created: string;
                            lastUpdated: string;
                            value: {
                                raw: unknown;
                                type: string;
                            };
                            versions?: {
                                version: number;
                                date: string;
                            }[];
                        }]>;
                        const GetKeysOrEntriesForScope: (universeId: number, name: string, scope?: string, isSorted?: boolean) => Promise<[boolean, {
                            keyName: string;
                            scope: string;
                            store: string;
                            universe: number;
                            version: number;
                            root: string;
                            created: string;
                            lastUpdated: string;
                            value: {
                                raw: unknown;
                                type: string;
                            };
                            versions?: {
                                version: number;
                                date: string;
                            }[];
                        }[]]>;
                        const GetPersistentStoreForUniverse: (universeId: number, storeName: string, scopeName?: string, isSorted?: boolean) => Promise<[boolean, {
                            storeName: string;
                            type: string;
                            universe: number;
                            scopeCount: number;
                            root: string;
                            created: string;
                            lastUpdated: string;
                            scopes?: {
                                scopeName: string;
                                store: string;
                                universe: number;
                                keysCount: number;
                                root: string;
                                created: string;
                                lastUpdated: string;
                                keys?: {
                                    keyName: string;
                                    scope: string;
                                    store: string;
                                    universe: number;
                                    version: number;
                                    root: string;
                                    created: string;
                                    lastUpdated: string;
                                    value: {
                                        raw: unknown;
                                        type: string;
                                    };
                                    versions?: {
                                        version: number;
                                        date: string;
                                    }[];
                                }[];
                            }[];
                        }]>;
                        const GetPersistentStoresForUniverse: (universeId: number) => Promise<[boolean, {
                            storeName: string;
                            type: string;
                            universe: number;
                            scopeCount: number;
                            root: string;
                            created: string;
                            lastUpdated: string;
                            scopes?: {
                                scopeName: string;
                                store: string;
                                universe: number;
                                keysCount: number;
                                root: string;
                                created: string;
                                lastUpdated: string;
                                keys?: {
                                    keyName: string;
                                    scope: string;
                                    store: string;
                                    universe: number;
                                    version: number;
                                    root: string;
                                    created: string;
                                    lastUpdated: string;
                                    value: {
                                        raw: unknown;
                                        type: string;
                                    };
                                    versions?: {
                                        version: number;
                                        date: string;
                                    }[];
                                }[];
                            }[];
                        }[]]>;
                        const GetScopeForPersistentStore: (universeId: number, storeName: string, scopeName: string, isSorted?: boolean) => Promise<[boolean, {
                            scopeName: string;
                            store: string;
                            universe: number;
                            keysCount: number;
                            root: string;
                            created: string;
                            lastUpdated: string;
                            keys?: {
                                keyName: string;
                                scope: string;
                                store: string;
                                universe: number;
                                version: number;
                                root: string;
                                created: string;
                                lastUpdated: string;
                                value: {
                                    raw: unknown;
                                    type: string;
                                };
                                versions?: {
                                    version: number;
                                    date: string;
                                }[];
                            }[];
                        }]>;
                        const GetScopesForPersistentStore: (universeId: number, name: string, isSorted?: boolean) => Promise<[boolean, {
                            scopeName: string;
                            store: string;
                            universe: number;
                            keysCount: number;
                            root: string;
                            created: string;
                            lastUpdated: string;
                            keys?: {
                                keyName: string;
                                scope: string;
                                store: string;
                                universe: number;
                                version: number;
                                root: string;
                                created: string;
                                lastUpdated: string;
                                value: {
                                    raw: unknown;
                                    type: string;
                                };
                                versions?: {
                                    version: number;
                                    date: string;
                                }[];
                            }[];
                        }[]]>;
                    }
                    namespace PurgeHelpers {
                        const PurgeKeyFromScope: (universeId: number, storeName: string, scopeName: string, keyName: string, isSorted?: boolean) => Promise<boolean>;
                        const PurgeScopeFromPersistentStore: (universeId: number, storeName: string, scopeName: string, isSorted?: boolean) => Promise<boolean>;
                        const PurgeUniverse: (universeId: number) => Promise<boolean>;
                        const PurgeUniversePersistentStore: (universeId: number, storeName: string, isSorted?: boolean) => Promise<boolean>;
                    }
                    namespace SetHelpers {
                        const PushKeyToPersistentStore: (universeId: number, name: string, scope?: string, key?: string, value?: unknown, isSorted?: boolean, userIds?: any[], attributes?: any[]) => Promise<boolean>;
                        const PushPersistentStoreToUniverse: (universeId: number, name: string, scope?: string, isSorted?: boolean) => Promise<boolean>;
                        const WriteUniverse: (universeId: number) => Promise<boolean>;
                    }
                }
                namespace Places {
                    const GetPlaceFromId: (placeId: number) => [boolean, {
                        placeId: number;
                        name: string;
                        description: string;
                        url: string;
                        builder: string;
                        builderId: number;
                        isPlayable: boolean;
                        reasonProhibited: string;
                        universeId: number;
                        universeRootPlaceId: number;
                        price: number;
                        imageToken: string;
                    }];
                    const CheckIfUniverseExists: (universeId: number) => boolean;
                    const CheckIfPlaceExists: (placeId: number) => boolean;
                    const CheckIfPlaceIsRooted: (placeId: number) => boolean;
                    const GetUniverseIdFromPlaceId: (placeId: number) => [boolean, number];
                    const GetUniverseFromPlaceId: (placeId: number) => [boolean, {
                        id: number;
                        rootPlaceId: number;
                        places: {
                            placeId: number;
                            placeName: string;
                            isRoot: boolean;
                        }[];
                        name: string;
                        description: string;
                        creator: {
                            id: number;
                            name: string;
                            type: string;
                        };
                        price: number;
                        allowedGearGenres: string[];
                        allowedGearCategories: string[];
                        playing: number;
                        visits: number;
                        maxPlayers: number;
                        created: string;
                        updated: string;
                        studioAccessToApisAllowed: boolean;
                        createVipServersAllowed: boolean;
                        universeAvatarType: string;
                        genre: string;
                        media: {
                            assetTypeId: number;
                            assetType: string;
                            imageId: number;
                            videoHash: string;
                            videoTitle: string;
                            approved: boolean;
                        }[];
                    }];
                    const GetRootPlaceIdFromUniverseId: (universeId: number) => [boolean, number];
                    const GetRootPlaceFromUniverseId: (universeId: number) => [boolean, {
                        placeId: number;
                        name: string;
                        description: string;
                        url: string;
                        builder: string;
                        builderId: number;
                        isPlayable: boolean;
                        reasonProhibited: string;
                        universeId: number;
                        universeRootPlaceId: number;
                        price: number;
                        imageToken: string;
                    }];
                }
                namespace Sessions {
                    const ClearCachedSessions: () => Promise<void>;
                    const CreateCaptchaBlobSessionAfter403: (response: import("express-serve-static-core").Response<any, Record<string, any>, number>, captchaBLOB: string, ip: string) => void;
                    const SetCaptchaSessiontField: (sessionId: string, field: string, value: unknown, concatToString?: boolean, pushIfArray?: boolean, popIfUndefined?: boolean, index?: number, spliceIfIndex?: boolean, createIfDoesntExist?: boolean) => any;
                    const GetCsrfSession: (sessionFile: string) => {
                        sub: string;
                        token: string;
                        c: number;
                    };
                    const DeleteCsrfSession: (AuthToken: string) => void;
                    const DeleteCaptchaSession: (sessionId: string) => void;
                    const CreateOrGetXsrfSession: (AuthToken?: string, ip?: string, token?: string | string[], response?: import("express-serve-static-core").Response<any, Record<string, any>, number>, isXsrfEndpoint?: boolean) => boolean | void;
                    const CreateCsrfSessionFile: (id: string) => string;
                    const CreateCaptchaSessionBlob: (ip: string) => string;
                }
            }
            namespace Util {
                const ClientSettings: typeof ClientSettingsImport;
                const ShuffleArray: (array: unknown[]) => unknown[];
            }
            namespace Web {
                namespace Util {
                    const ROBLOX_Starter: (app: import("express-serve-static-core").Express, name: string) => [import("http").Server, import("https").Server];
                    const ROBLOX_SignalR_Config_Helper: (httpserver: import("http").Server, httpsServer: import("https").Server, dir: string, apiName: string) => Promise<void>;
                }
            }
        }
        namespace Global {
            namespace Helpers { }
        }
        namespace Constants {
            const OutboundHeaders: {
                'cache-control': string;
                apiVersion: string;
                pragma: string;
                expires: string;
                'x-powered-by': string;
                server: string;
            };
            namespace RobloxDirectories {
                const __iBaseDirectory = "C:\\buildAgent\\work\\0800fc577294c34f";
                const __iSSLDirectory: string;
            }
            const URLS: {
                ROBLOX_APEX: string;
                ROBLOX_WWW: string;
                ROBLOX_API: string;
                ROBLOX_STATIC_CDN: string;
                ROBLOX_JS: string;
                ROBLOX_CSS: string;
                ROBLOX_IMAGES: string;
                ROBLOX_SETUP_CDN: string;
                ROBLOX_EPHEMERAL_COUNTERS_API: string;
                ROBLOX_EPHEMERAL_COUNTERS_VERSION_2: string;
                DEPRECATED_ROBLOX_TEMPORARY_IMAGES: string;
                ROBLOX_VERSION_COMPATIBILITY_API: string;
                ROBLOX_CLIENT_SETTINGS_API: string;
                ROBLOX_ASSET_GAME: string;
                ROBLOX_GAME_PERSISTENCE: string;
                ROBLOX_DOSARREST_ORIGIN_CORP: string;
                ROBLOX_MARKETPLACE_API: string;
                ROBLOX_METRICS: string;
                ROBLOX_APIS: string;
                ROBLOX_AUTH: string;
                ROBLOX_LOCALE: string;
                ROBLOX_AB_TESTING: string;
                ROBLOX_USERS: string;
                ROBLOX_TWO_STEP_VERIFICATION: string;
                SIMULPONG_LATENCY_MEASUREMENTS: string;
                ROBLOX_CHAT: string;
                ROBLOX_CONTACTS: string;
                ROBLOX_NOTIFICATIONS: string;
                ROBLOX_ACCOUNT_SETTINGS: string;
                ROBLOX_ADS: string;
                ROBLOX_TRADES: string;
                ROBLOX_FRIENDS: string;
                ROBLOX_PRIVATE_MESSAGES: string;
                ROBLOX_ECONOMY: string;
                ROBLOX_GAMES: string;
                ROBLOX_REAL_TIME: string;
                ROBLOX_THUMB_NAILS: string;
                ROBLOX_PRESENCE: string;
                ROBLOX_GROUPS: string;
                ROBLOX_ACCOUNT_INFORMATION: string;
                ROBLOX_BADGES: string;
                ROBLOX_DEVELOPER_FORUM: string;
                ROBLOX_PREMIUM_FEATURES: string;
                ROBLOX_CLIENT_SETTINGS: string;
                ROBLOX_CLIENT_SETTINGS_CDN: string;
                ROBLOX_AD_CONFIGURATION: string;
                ROBLOX_CLIENT_TELEMENTRY: string;
                ROBLOX_ASSET_DELIVERY: string;
                ROBLOX_AVATAR: string;
                ROBLOX_BILLING: string;
                ROBLOX_CATALOG: string;
                ROBLOX_CDN_PROVIDERS: string;
                ROBLOX_CHAT_MODERATION: string;
                ROBLOX_CONTENT_STORE: string;
                ROBLOX_DEVELOP: string;
                ROBLOX_DISCUSSIONS: string;
                ROBLOX_ECONOMY_CREATOR_STATS: string;
                ROBLOX_ENGAGEMENT_PAYOUTS: string;
                ROBLOX_FOLLOWINGS: string;
                ROBLOX_GAME_INTERNATIONALIZATION: string;
                ROBLOX_GAME_JOIN: string;
                ROBLOX_GROUPS_MODERATION: string;
                ROBLOX_INVENTORY: string;
                ROBLOX_ITEM_CONFIGURATION: string;
                ROBLOX_LOCALIZATION_TABLES: string;
                ROBLOX_POINTS: string;
                ROBLOX_PUBLISH: string;
                ROBLOX_PUNISHMENTS: string;
                ROBLOX_SHARE: string;
                ROBLOX_TEXT_FILTER: string;
                ROBLOX_THEMES: string;
                ROBLOX_THUMBNAILS_RESIZER: string;
                ROBLOX_TRANSLATION_ROLES: string;
                ROBLOX_TRANSLATIONS: string;
                ROBLOX_USER_MODERATION: string;
                ROBLOX_VOICE: string;
                ROBLOX_FILES_API: string;
                SIMULPONG_ROBLOX_TEAM_CITY: string;
                ROBLOX_AB_TESTING_API: string;
                ADMIN_WEB_SITE: string;
                COM_APIS: string;
                ROBLOX_POINTS_API: string;
            };
        }
    }
}
