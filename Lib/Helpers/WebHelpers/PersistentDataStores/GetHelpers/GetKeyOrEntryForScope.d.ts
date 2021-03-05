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
export declare const GetKeyOrEntryForScope: (universeId: number, storeName: string, scopeName: string, keyName: string, isSorted?: boolean) => Promise<[boolean, KeyType | null]>;
export {};
