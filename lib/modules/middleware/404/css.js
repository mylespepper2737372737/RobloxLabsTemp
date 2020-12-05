"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
exports.default = (req, res) => {
    if (!req.query.apiKey)
        return res
            .status(req.method === 'OPTIONS' ? 200 : 403)
            .contentType('text/xml')
            .send(`<Error><Code>AccessDenied</Code><Message>Access to ${'https://css.sitetest1.mfdlabs.com' + req.url} has been denied.</Message><HostId>${crypto_1.default
            .createHash('sha256')
            .update(crypto_1.default.randomBytes(1000))
            .digest('base64')}</HostId></Error>`);
    if (req.query.apiKey !== process.env['API_KEY'])
        return res
            .status(req.method === 'OPTIONS' ? 200 : 403)
            .contentType('text/xml')
            .send(`<Error><Code>AccessDenied</Code><Message>Access to ${'https://css.sitetest1.mfdlabs.com' + req.url} has been denied.</Message><HostId>${crypto_1.default
            .createHash('sha256')
            .update(crypto_1.default.randomBytes(1000))
            .digest('base64')}</HostId></Error>`);
    res.statusMessage = 'Verified';
    res.status(200).send({ env: process.env });
};
