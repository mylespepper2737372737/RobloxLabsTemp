"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SetManifestField_1 = __importDefault(require("../../modules/Helpers/SetManifestField"));
const GetManifests_1 = require("../../modules/Helpers/GetManifests");
const GetRegisteredUsers_1 = __importDefault(require("../../modules/Helpers/GetRegisteredUsers"));
const GetSettings_1 = require("../../modules/Helpers/GetSettings");
const GetSessions_1 = __importDefault(require("../../modules/Helpers/GetSessions"));
const createCaptchaBlobSessionAfter403_1 = __importDefault(require("../helpers/www/LoginApi/createCaptchaBlobSessionAfter403"));
const createCaptchaSessionBlob_1 = __importDefault(require("../helpers/www/LoginApi/createCaptchaSessionBlob"));
const DeleteCaptchaSession_1 = __importDefault(require("../../modules/Helpers/DeleteCaptchaSession"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const directories_1 = require("../../modules/constants/directories");
dotenv_1.default.config({ path: directories_1._dirname + '\\.env' });
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
const FString = GetSettings_1.GetSettings(GetSettings_1.Group.FString);
exports.default = {
    dir: '/Authorization/Login.fxhx',
    method: 'All',
    func: (request, response) => {
        const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag);
        const DFInt = GetSettings_1.GetSettings(GetSettings_1.Group.DFInt);
        const Manifest = GetManifests_1.GetManifests();
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
        if (DFFlag['IsCSRFV2Enabled']) {
            if (!request.headers['x-csrf-token'] ||
                (DFFlag['IsCSRFV2Hardcoded'] && request.headers['x-csrf-token'] !== FString['CSRFV2HardcodedKey'])) {
                response.statusMessage = FString['CSRFV1FailedResponseStatusText'];
                if (DFFlag['IsCSRFV2Hardcoded'])
                    return response
                        .status(403)
                        .header({
                        'access-control-expose-headers': 'X-CSRF-TOKEN, API-TRANSFER',
                        'x-csrf-token': FString['CSRFV2HardcodedKey'],
                        'api-transfer': 'Expose-Hardcoded-Session-Token#433',
                    })
                        .send({ success: false, message: 'Token Validation Failed' });
                return response.status(403).send({ success: false, message: 'Token Validation Failed' });
            }
        }
        const registeredUsers = GetRegisteredUsers_1.default();
        const sessions = fs_1.default.readdirSync(directories_1._dirname + '\\manifest\\sessions');
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
        let isValidUser = false;
        let userId = '';
        for (const id of Object.keys(registeredUsers)) {
            if (registeredUsers[id] === request.body['cvalue']) {
                isValidUser = true;
                userId = id;
                break;
            }
        }
        if (isValidUser === false)
            return response.status(404).send({
                success: false,
                message: 'User not found.',
                userfacingmessage: 'Incorrect username or password.',
            });
        if (!Manifest.get(userId))
            return response.send('help me');
        if (Manifest.get(userId).password !== request.body['password'])
            return response.status(403).send({
                success: false,
                message: 'Incorrect Password.',
                userfacingmessage: 'Incorrect Password or Username.',
            });
        const authId = crypto_1.default.createHash('sha512').update(crypto_1.default.randomBytes(1000)).digest('hex');
        SetManifestField_1.default(userId, 'sessionIds', authId, true, false, 0, false, false);
        response.shouldKeepAlive = false;
        return response
            .status(200)
            .cookie('authId', authId, {
            maxAge: DFInt['WWWAuthV1MaxAuthIdAge'],
            domain: '.sitetest1.mfdlabs.com',
            secure: true,
            sameSite: 'lax',
        })
            .send({ success: true, message: 'Success', userfacingmessage: 'Success' });
    },
};
