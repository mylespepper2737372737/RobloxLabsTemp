"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetSettings_1 = require("../../modules/Helpers/GetSettings");
const GetSessions_1 = __importDefault(require("../../modules/Helpers/GetSessions"));
const createCaptchaBlobSessionAfter403_1 = __importDefault(require("../../modules/Helpers/createCaptchaBlobSessionAfter403"));
const createCaptchaSessionBlob_1 = __importDefault(require("../../modules/Helpers/createCaptchaSessionBlob"));
const DeleteCaptchaSession_1 = __importDefault(require("../../modules/Helpers/DeleteCaptchaSession"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../../modules/constants/directories");
dotenv_1.default.config({ path: directories_1._dirname + '\\.env' });
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
exports.default = {
    dir: '/Authentication/Signup.fxhx',
    method: 'All',
    func: (request, response) => {
        const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag);
        if (!DFFlag['IsWWWAuthV1Enabled'])
            return response.status(503).send({
                code: 503,
                message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
                userfacingmessage: 'Service disabled for an unknown amount of time.',
            });
        if (request.method === 'OPTIONS')
            return response.status(200).send({ success: true, message: '' });
        if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
            return response.status(403).send({ success: false, message: 'HTTPS Required.' });
        if (request.method !== 'POST' && !DFFlag['WWWAuthV1AllowAllMethods'])
            return response.status(405).send({
                success: false,
                message: `The requested resource does not support http method '${request.method}'.`,
            });
        const sessions = fs_1.default.readdirSync(directories_1._dirname + '\\manifest\\sessions');
        if (JSON.stringify(request.body) === '{}')
            return response.status(400).send({ success: false, message: 'No body was provided.' });
        if (request.body && request.headers['content-type'] !== 'application/x-www-form-urlencoded')
            return response.status(400).send({
                success: false,
                message: `The Content-Type ${request.headers['content-type']} is not supported.`,
            });
        if (!request.body['username'] &&
            !request.body['password'] &&
            !request.body['birthday'] &&
            !request.body['isTosAgreementBoxChecked'] &&
            !request.body['email'])
            return response.status(400).send({
                success: false,
                message: 'The body provided was invalid.',
                userfacingmessage: 'The provided credentials were invalid.',
            });
        const Sessions = GetSessions_1.default();
        if (DFFlag['IsCaptchaV2Enabled']) {
            const __captchaSession = createCaptchaSessionBlob_1.default(request.ip);
            const cToken = request.body['captchaToken'];
            if (typeof cToken === 'string') {
                const cSession = cToken.split('|')[0];
                if (cSession) {
                    let isCaptchaSessionValid = false;
                    for (const v of sessions) {
                        const sessionId = v.split('.').shift();
                        if (sessionId === cSession) {
                            isCaptchaSessionValid = true;
                            break;
                        }
                    }
                    if (isCaptchaSessionValid) {
                        const cAnswer = cToken.split('|')[1];
                        if (!Sessions.has(cSession))
                            return createCaptchaBlobSessionAfter403_1.default(response, __captchaSession, request.ip);
                        if (Sessions.get(cSession).answer !== cAnswer)
                            return createCaptchaBlobSessionAfter403_1.default(response, __captchaSession, request.ip);
                        DeleteCaptchaSession_1.default(cSession);
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
        return response.status(200).send({ success: true, message: 'Not Enabled', userfacingmessage: 'NE_AJ_JSX' });
    },
};
