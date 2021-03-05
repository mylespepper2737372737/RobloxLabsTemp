declare type VersionType = {
    version: number;
    date: string;
};
declare type KeyType = {
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
    versions?: VersionType[];
};
declare type ScopeType = {
    scopeName: string;
    store: string;
    universe: number;
    keysCount: number;
    root: string;
    created: string;
    lastUpdated: string;
    keys?: KeyType[];
};
export declare const GetScopesForPersistentStore: (universeId: number, name: string, isSorted?: boolean) => Promise<[boolean, ScopeType[] | null]>;
export {};
