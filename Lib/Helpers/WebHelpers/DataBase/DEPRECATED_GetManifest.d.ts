export declare type userType = {
    password: string;
    username: string;
    sessionIds: string[];
    userId: string;
};
export declare const GetManifests: () => Map<string, userType>;
