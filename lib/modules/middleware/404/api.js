"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => {
    return res.status(req.method === 'OPTIONS' ? 200 : 404).send({
        code: 404,
        message: 'https://' + escape(req.hostname) + escape(req.url) + ' NotFound.',
        userfacingmessage: '404 Not Found, the endpoint (https://' +
            escape(req.hostname) +
            escape(req.url) +
            ') that you requested from ' +
            escape(req.headers['origin']) +
            ' is invalid, please contact a developer or check status on https://www.sitetest1.mfdlabs.com/status.ashx',
    });
};
