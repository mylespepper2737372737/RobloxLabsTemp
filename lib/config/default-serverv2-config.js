"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    UsePages: true,
    PageOpts: {
        etag: false,
        redirect: true,
        lastModified: false,
        setHeaders: (res) => {
            res.set('Hoster', 'Servers.fx');
        },
    },
    UseEndpoints: true,
    UseRouting: true,
};
