declare type csrfSessionType = {
    sub: string;
    token: string;
    c: number;
};
export declare const GetCsrfSession: (sessionFile: string) => csrfSessionType;
export {};
