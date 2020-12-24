"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetSessions_1 = __importDefault(require("../../modules/constants/GetSessions"));
const GetSettings_1 = require("../../modules/constants/GetSettings");
const FString = GetSettings_1.GetSettings(GetSettings_1.Group.FString);
exports.default = {
    dir: '/captcha/v1/get-image-hashes',
    method: 'ALL',
    func: (request, response) => {
        const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag);
        const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
        if (request.method === 'OPTIONS')
            return response.status(200).send({ success: true, message: '' });
        if (!DFFlag['IsCaptchaV2Enabled'])
            return response.status(503).send({
                code: 503,
                message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
                userfacingmessage: 'Service disabled for an unknown amount of time.',
            });
        if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
            return response.status(403).send({ success: false, message: 'HTTPS Required.' });
        if (request.method !== 'POST')
            return response.status(405).send({
                code: 405,
                message: `The requested resource does not support http method '${request.method}.'`,
                userfacingmessage: 'Something went wrong.',
            });
        if (JSON.stringify(request.body) === '{}')
            return response.status(400).send({ success: false, message: 'No body was provided.' });
        if (request.body && request.headers['content-type'] !== 'application/x-www-form-urlencoded')
            return response.status(400).send({
                success: false,
                message: `The Content-Type ${request.headers['content-type']} is not supported.`,
            });
        if (!request.body['captchaHash'] || !request.body['captchaProvider'])
            return response.status(400).send({
                success: false,
                message: 'The body provided was invalid.',
                userfacingmessage: 'The provided credentials were invalid.',
            });
        console.log(request.body);
        if (request.body['captchaProvider'] !== FString['CaptchaV2CaptchaProvider'])
            return response
                .status(400)
                .header({
                'access-control-expose-headers': 'MFD-CAPTCHA-PROVIDER, API-TRANSFER',
                'mfd-captcha-provider': FString['CaptchaV2CaptchaProvider'],
                'api-transfer': 'Expose-Captcha-V2-Provider#503',
            })
                .send({ success: false, message: 'The current CAPTCHA_PROVIDER is not valid' });
        const Sessions = GetSessions_1.default();
        if (!Sessions.get(request.body['captchaHash']))
            return response
                .status(404)
                .send({ success: false, message: 'The captchaToken supplied is not valid.', userfacingmessage: 'InternalServerError' });
        response.status(200).contentType('application/json').send({});
    },
};
