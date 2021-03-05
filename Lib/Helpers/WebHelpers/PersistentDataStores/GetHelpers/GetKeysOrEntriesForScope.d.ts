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
export declare const GetKeysOrEntriesForScope: (universeId: number, name: string, scope?: string, isSorted?: boolean) => Promise<[boolean, KeyType[] | null]>;
export {};
