"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const _dirname = 'C:\\Users\\Padraig\\Git\\Mfd\\Web\\mfdlabs.com';
exports.default = {
    dir: '/auth/v2/login',
    method: 'ALL',
    func: (request, response) => {
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
        const data = JSON.parse(fs_1.default.readFileSync(_dirname + '/lib/env.json', { encoding: 'utf-8' }));
        if (JSON.stringify(request.body) === '{}' ||
            JSON.stringify(request.body) === '' ||
            request.body === null ||
            request.body === undefined)
            return response.status(400).send({ code: 400, message: 'Body was null.', userfacingmessage: 'Something went wrong.' });
        if (request.headers['content-type'] !== 'application/json')
            return response.status(400).send({
                code: 400,
                message: 'Request body was given but no/incorrect Content-Type was given.',
                userfacingmessage: 'Something went wrong.',
            });
        const username = request.body.username;
        const password = request.body.password;
        if (!username || !password)
            return response.status(400).send({
                code: 400,
                message: 'The body provided was invalid.',
                userfacingmessage: "A required credential wasn't supplied.",
            });
        let user;
        for (const authKey of Object.keys(data.userIds)) {
            if (authKey === '0' || authKey === undefined)
                continue;
            if (data.userIds[authKey].username !== request.body['username'])
                return response.status(404).send({
                    code: 404,
                    message: 'User not found.',
                    userfacingmessage: 'Incorrect username or password.',
                });
            else
                user = data.userIds[authKey];
            break;
        }
        if (password !== user.password)
            return response.status(401).send({
                code: 401,
                message: 'Authorization has been denied for this request.',
                userfacingmessage: 'Incorrect username or password',
            });
        const authId = crypto_1.default.createHash('sha256').update(crypto_1.default.randomBytes(100)).digest('hex');
        for (const aid of Object.keys(data['userIds'])) {
            if (aid === user.userId && data['userIds'][aid].loggedOn !== true) {
                console.log(true);
                data['userIds'][aid].loggedOn = true;
                break;
            }
        }
        user['sessionId'] = authId;
        fs_1.default.writeFile(_dirname + '/lib/env.json', JSON.stringify(data), () => {
            response
                .status(200)
                .cookie('authId', authId, {
                domain: '.sitetest1.mfdlabs.com',
                expires: new Date('2050'),
                httpOnly: false,
            })
                .send({
                success: true,
                message: 'Success',
            });
        });
    },
};
