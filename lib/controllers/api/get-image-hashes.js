"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SetCaptchaSessiontField_1 = __importDefault(require("../../modules/constants/SetCaptchaSessiontField"));
const crypto_1 = __importDefault(require("crypto"));
const GetCaptchaImages_1 = require("../../modules/constants/GetCaptchaImages");
const GetSessions_1 = __importDefault(require("../../modules/constants/GetSessions"));
const GetSettings_1 = require("../../modules/constants/GetSettings");
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../../modules/constants/directories");
const FString = GetSettings_1.GetSettings(GetSettings_1.Group.FString);
const FInt = GetSettings_1.GetSettings(GetSettings_1.Group.FInt);
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
exports.default = {
    dir: '/captcha/v1/get-image-hashes',
    method: 'ALL',
    func: (request, response) => {
        const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag);
        if (request.method === 'OPTIONS')
            return response.status(200).send({ success: true, message: '' });
        if (!DFFlag['IsCaptchaV2Enabled'])
            return response.status(503).send({
                success: false,
                message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
                userfacingmessage: 'Service disabled for an unknown amount of time.',
            });
        if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
            return response.status(403).send({ success: false, message: 'HTTPS Required.' });
        if (request.method !== 'POST')
            return response.status(405).send({
                success: false,
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
                .send({ success: false, message: 'The captchaToken supplied is not valid.', userfacingmessage: 'Bad Token Request' });
        const imageCache = GetCaptchaImages_1.GetCaptchaImages();
        const images = [];
        const newHash = request.body['captchaHash'] + '0x0ff';
        fs_1.default.writeFileSync(directories_1._dirname + `\\manifest\\sessions\\${newHash}.json`, JSON.stringify(Sessions.get(request.body['captchaHash'])), {
            encoding: 'utf-8',
        });
        setTimeout(() => {
            try {
                fs_1.default.unlinkSync(directories_1._dirname + `\\manifest\\sessions\\${newHash}.json`);
            }
            catch {
                console.warn('The session is not persistent anymore.');
            }
        }, FInt['CaptchaV2TimeoutAdditionAfter200GetImageHashes']);
        imageCache.forEach((v) => {
            const hash = crypto_1.default.createHash('sha512').update(crypto_1.default.randomBytes(1000)).digest('hex');
            images.push({ imageHash: hash, imageUri: v.uri, name: v.name });
            if (v.correct)
                SetCaptchaSessiontField_1.default(newHash, 'answer', hash, true, false, false, 0, false, true);
        });
        response
            .status(200)
            .contentType('application/json')
            .send({ data: images, captchaHash: newHash, expires: FInt['CaptchaV2TimeoutAdditionAfter200GetImageHashes'] });
    },
};
