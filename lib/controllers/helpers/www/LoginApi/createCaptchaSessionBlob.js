"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const crypto_1 = __importDefault(require("crypto"));
module.exports = (ip) => {
    const header = crypto_1.default
        .createHash('sha256')
        .update(JSON.stringify({ alg: 'sha512', type: 'mfdJWT' }))
        .digest('base64')
        .split('/')
        .join('')
        .split('+')
        .join('')
        .split('=')
        .join('');
    const body = crypto_1.default
        .createHash('sha256')
        .update(JSON.stringify({ sub: ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) }))
        .digest('base64')
        .split('/')
        .join('')
        .split('+')
        .join('')
        .split('=')
        .join('');
    const signature = crypto_1.default
        .createHash('sha512')
        .update(header + body)
        .digest('base64')
        .split('/')
        .join('')
        .split('+')
        .join('')
        .split('=')
        .join('');
    const captchaBLOB = `${header}\_${body}\_${signature}`;
    return captchaBLOB;
};
