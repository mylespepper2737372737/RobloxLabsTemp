"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    UsePages: true,
    PageOpts: {
        etag: false,
        redirect: true,
        lastModified: false,
        setHeaders: (res) => {
            res.set('x-powered-by', 'servers.fx');
            res.set('server', 'mfd-arg-12');
        },
    },
    UseEndpoints: true,
    UseRouting: true,
};
