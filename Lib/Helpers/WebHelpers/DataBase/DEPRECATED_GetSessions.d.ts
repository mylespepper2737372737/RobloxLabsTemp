declare type captchaSessionType = {
    subject: string;
    time: number;
    answer: string;
    token: string;
};
export declare const GetSessions: () => Map<string, captchaSessionType>;
export {};
