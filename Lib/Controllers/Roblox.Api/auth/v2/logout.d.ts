declare const _default: {
    method: string;
    func: (request: {
        method: string;
        protocol: string;
        cookies: {
            AuthToken: string;
        };
        query: {
            cookie: string;
        };
    }, response: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            send: {
                (arg0: {
                    code: number;
                    message: string;
                    userfacingmessage?: string;
                }): any;
                new (): any;
            };
        };
        clearCookie: (arg0: string, arg1: {
            domain: string;
            path: string;
        }) => {
            send: (body: any) => void;
        };
    }) => any;
};
export default _default;
