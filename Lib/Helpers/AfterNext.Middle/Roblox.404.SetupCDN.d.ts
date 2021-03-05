/// <reference types="node" />
declare const _default: (req: {
    query: {
        apiKey: string;
    };
    method: string;
    url: string;
}, res: {
    status: (arg0: number) => {
        (): any;
        new (): any;
        contentType: {
            (arg0: string): {
                (): any;
                new (): any;
                send: {
                    (arg0: string): any;
                    new (): any;
                };
            };
            new (): any;
        };
        send: {
            (arg0: {
                env: NodeJS.ProcessEnv;
            }): void;
            new (): any;
        };
    };
    statusMessage: string;
}) => any;
export default _default;
