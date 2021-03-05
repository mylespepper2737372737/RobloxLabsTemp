export declare enum Group {
    'FVariable' = 0,
    'FLog' = 1,
    'DFLog' = 2,
    'SFLog' = 3,
    'FFlag' = 4,
    'DFFlag' = 5,
    'SFFlag' = 6,
    'FInt' = 7,
    'DFInt' = 8,
    'SFInt' = 9,
    'FString' = 10,
    'DFString' = 11,
    'SFString' = 12,
    'FPFilter' = 13,
    'FSettings' = 14,
    'UExperiment' = 15,
    'BTExperiment' = 16,
    'SExperiment' = 17,
    'All' = 18
}
export declare namespace ClientSettings {
    const GetSettings: <SettingsType extends Group>(settingsType: SettingsType, settingsGroup?: string) => Record<string, unknown> | string[] | Error;
    const GetFVariables: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetFLogs: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetDFLogs: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetFFlags: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetDFFlags: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetSFFlags: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetFInts: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetDFInts: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetSFInts: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetFStrings: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetDFStrings: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetSFStrings: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetFPFilters: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetFSettings: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetUserExperiments: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetBrowserTrackerExperiments: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetSharedExperiments: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetSFLogs: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetAllSettings: (ctx?: string) => string[] | Error | Record<string, unknown>;
    const GetPlaceIdInPlaceFilter: (key: string, placeId: number, ctx?: string) => boolean;
}
