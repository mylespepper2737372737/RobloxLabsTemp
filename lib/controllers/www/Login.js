"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createCaptchaBlobSessionAfter403_1 = __importDefault(require("../helpers/www/LoginApi/createCaptchaBlobSessionAfter403"));
const createCaptchaSessionBlob_1 = __importDefault(require("../helpers/www/LoginApi/createCaptchaSessionBlob"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../../modules/constants/directories");
dotenv_1.default.config({ path: directories_1._dirname + '\\.env' });
exports.default = {
    dir: '/Authorization/Login.fxhx',
    method: 'All',
    func: (request, response) => {
        request.socket.on('close', (d) => console.log(d.toString()));
        if (request.method === 'OPTIONS')
            return response.status(200).send({ success: true, message: '' });
        if (request.protocol !== 'https')
            return response.status(403).send({ success: false, message: 'HTTPS Required.' });
        if (request.method !== 'POST')
            return response.status(405).send({
                success: false,
                message: `The requested resource does not support http method '${request.method}'.`,
            });
        if (request.protocol !== 'https')
            return response.status(403).send({ code: 403, message: 'HTTPS Required.' });
        const settings = JSON.parse(fs_1.default.readFileSync(directories_1._dirname + '\\global\\settings.json', 'ascii'));
        if (settings['isXsrfEnabled']) {
            if (!request.headers['x-csrf-token'] ||
                request.headers['x-csrf-token'] === '' ||
                (settings['isXsrfHardcoded'] && request.headers['x-csrf-token'] !== process.env['xsrf'])) {
                response.statusMessage = 'Token Validation Failed.';
                if (settings['isXsrfHardcoded'])
                    return response
                        .status(403)
                        .header({
                        'access-control-expose-headers': 'X-CSRF-TOKEN, API-TRANSFER',
                        'x-csrf-token': process.env['xsrf'],
                        'api-transfer': 'Expose-Hardcoded-Session-Token#433',
                    })
                        .send({ success: false, message: 'Token Validation Failed' });
                return response.status(403).send({ success: false, message: 'Token Validation Failed' });
            }
        }
        const registeredUsers = fs_1.default.readFileSync(directories_1._dirname + '\\manifest\\users.json', 'ascii');
        const sessions = fs_1.default.readdirSync(directories_1._dirname + '\\manifest\\sessions');
        let isValidUser = false;
        const parsedUsers = JSON.parse(registeredUsers);
        if (JSON.stringify(request.body) === '{}')
            return response.status(400).send({ success: false, message: 'No body was provided.' });
        if (request.body && request.headers['content-type'] !== 'application/x-www-form-urlencoded')
            return response.status(400).send({
                success: false,
                message: `The Content-Type ${request.headers['content-type']} is not supported.`,
            });
        if (!request.body['cvalue'] || !request.body['password'])
            return response.status(400).send({
                success: false,
                message: 'The body provided was invalid.',
                userfacingmessage: 'The provided credentials were invalid.',
            });
        if (settings['isNewCaptchaEnabled']) {
            const __captchaSession = createCaptchaSessionBlob_1.default(request.ip);
            const cToken = request.body['captchaToken'];
            if (typeof cToken === 'string') {
                const cAnswer = cToken.split('|')[0];
                if (cAnswer) {
                    let isCaptchaSessionValid = false;
                    for (const v of sessions) {
                        const sessionId = v.split('.').shift();
                        if (sessionId === cAnswer) {
                            isCaptchaSessionValid = true;
                            break;
                        }
                    }
                    if (isCaptchaSessionValid) {
                        try {
                            fs_1.default.unlinkSync(directories_1._dirname + `\\manifest\\sessions\\${cAnswer}.json`);
                        }
                        catch {
                            console.warn('Session dead');
                        }
                        return response.sendStatus(200);
                    }
                    else {
                        return createCaptchaBlobSessionAfter403_1.default(response, __captchaSession, request.ip);
                    }
                }
                else {
                    return createCaptchaBlobSessionAfter403_1.default(response, __captchaSession, request.ip);
                }
            }
            else {
                return createCaptchaBlobSessionAfter403_1.default(response, __captchaSession, request.ip);
            }
        }
        for (const userId of Object.keys(parsedUsers)) {
            if (parsedUsers[userId] === request.body['cvalue']) {
                isValidUser = true;
                break;
            }
        }
        if (isValidUser === false)
            return response.status(404).send({
                success: false,
                message: 'User not found.',
                userfacingmessage: 'Incorrect username or password.',
            });
        response.shouldKeepAlive = false;
        response.sendStatus(200);
    },
};
