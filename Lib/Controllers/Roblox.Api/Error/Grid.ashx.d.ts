declare const _default: {
    method: string;
    func: (req: {
        query: {
            toString: () => string;
        };
        body: string;
    }, res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            send: {
                (): void;
                new (): any;
            };
        };
    }) => void;
};
export default _default;
