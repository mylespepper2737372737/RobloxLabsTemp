declare const _default: (req: {
    method: string;
    hostname: string;
    url: string;
    headers: {
        [x: string]: string;
    };
}, res: {
    status: (arg0: number) => {
        (): any;
        new (): any;
        send: {
            (arg0: {
                code: number;
                message: string;
                userfacingmessage: string;
            }): any;
            new (): any;
        };
    };
}) => any;
export default _default;
