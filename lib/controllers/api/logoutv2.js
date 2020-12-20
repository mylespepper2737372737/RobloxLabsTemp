"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const _dirname = 'C:\\Users\\Padraig\\Git\\Mfd\\Web\\mfdlabs.com';
exports.default = {
    dir: '/auth/v2/logout',
    method: 'ALL',
    func: (request, response) => {
        const settings = JSON.parse(fs_1.default.readFileSync(_dirname + '\\global\\settings.json', 'ascii'));
        if (!settings['useAuthorizationV2'])
            return response
                .status(503)
                .send({ code: 503, message: 'The server cannot handle the request (because it is overloaded or down for maintenance)' });
        if (request.method === 'OPTIONS')
            return response.status(200).send({ code: 200, message: '' });
        if (request.protocol !== 'https')
            return response.status(403).send({ code: 403, message: 'HTTPS Required.' });
        if (request.method !== 'POST')
            return response.status(405).send({
                code: 405,
                message: `The requested resource does not support http method '${request.method}.'`,
                userfacingmessage: 'Something went wrong.',
            });
        if (request.protocol !== 'https')
            return response.status(403).send({ code: 403, message: 'HTTPS Required.' });
        const data = JSON.parse(fs_1.default.readFileSync(_dirname + '/lib/env.json', { encoding: 'utf-8' }));
        const authId = request.cookies.authId ||
            request.query.cookie
                .split('; ')
                .find((authid) => authid.startsWith('authId'))
                .split('=')[1];
        if (!authId)
            return response.status(401).send({
                code: 401,
                message: 'Authorization has been denied for this request.',
                userfacingmessage: 'You are not currently logged in.',
            });
        let userId = '';
        for (const i in data['userIds']) {
            if (data['userIds'][i].sessionId !== authId)
                return response.status(404).send({
                    code: 404,
                    message: 'User not found.',
                    userfacingmessage: 'You sent invalid credentials.',
                });
            else
                userId = i;
        }
        data['userIds'][userId].loggedOn = false;
        data['userIds'][userId].sessionId = '';
        fs_1.default.writeFile(_dirname + '/lib/env.json', JSON.stringify(data), () => response.clearCookie('authId', { domain: '.sitetest1.mfdlabs.com', path: '/' }).send({ success: true, message: 'Success' }));
    },
};
