"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const crypto_1 = __importDefault(require("crypto"));
const headers_1 = __importDefault(require("../constants/headers"));
const createOrGetXsrfSession_1 = __importDefault(require("../Helpers/createOrGetXsrfSession"));
module.exports = ((req, res, next) => {
    if (!req.headers.cookie || (!req.headers.cookie.match(/__tid/) && req.hostname === 'www.sitetest1.mfdlabs.com'))
        res.cookie('__tid', crypto_1.default.createHash('sha256').update(crypto_1.default.randomBytes(1000)).digest('hex'), {
            maxAge: 3.154e14,
            domain: '.sitetest1.mfdlabs.com',
        });
    if (req.method !== 'GET') {
        res.header('Access-Control-Allow-Headers', 'Origin, Referer, X-Requested-With, Content-Type');
        res.header('Access-Control-Allow-Origin', req.headers['origin'] || req.headers['referer']);
        res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.header('Access-Control-Allow-Credentials', 'true');
        try {
            if (!createOrGetXsrfSession_1.default(req.headers.cookie
                .split(';')
                .find((authid) => {
                return authid.startsWith(' authId') || authid.startsWith('authId');
            })
                .split('=')[1], req.ip, req.headers['x-csrf-token'], res, req.hostname === 'api.sitetest1.mfdlabs.com' && req.path === '/csrf/v1/get-csrf-token'))
                return;
        }
        catch { }
    }
    res.header(headers_1.default);
    if (req.headers.cookie && !req.headers.cookie.includes('authId') && req.hostname === 'www.sitetest1.mfdlabs.com' && req.path === '/') {
        return res.redirect('https://www.sitetest1.mfdlabs.com/Login/');
    }
    if (req.headers.cookie &&
        req.headers.cookie.includes('authId') &&
        req.hostname === 'www.sitetest1.mfdlabs.com' &&
        (req.path === '/Login' || req.path === '/Login/')) {
        return res.redirect('https://www.sitetest1.mfdlabs.com/');
    }
    next();
});
