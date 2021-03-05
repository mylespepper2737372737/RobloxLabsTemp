declare const _default: {
    method: string;
    func: (request: {
        method: 'POST' | 'OPTIONS';
        protocol: string;
        body: {
            [x: string]: any;
            username: any;
            password: any;
        };
        headers: {
            [x: string]: string;
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
            cookie: {
                (arg0: string, arg1: string, arg2: {
                    domain: string;
                    expires: Date;
                    httpsOnly: boolean;
                }): {
                    send: (arg3: any) => void;
                };
                new (): any;
            };
        };
    }) => any;
};
export default _default;
