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
declare type StoreType = {
    storeName: string;
    type: string;
    universe: number;
    scopeCount: number;
    root: string;
    created: string;
    lastUpdated: string;
    scopes?: ScopeType[];
};
export declare const GetPersistentStoreForUniverse: (universeId: number, storeName: string, scopeName?: string, isSorted?: boolean) => Promise<[boolean, StoreType | null]>;
export {};
