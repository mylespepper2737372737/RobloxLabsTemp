"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetSettings_1 = require("../../modules/Helpers/GetSettings");
const createOrGetXsrfSession_1 = __importDefault(require("../../modules/Helpers/createOrGetXsrfSession"));
const Log_1 = require("../../modules/Helpers/Log");
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
exports.default = {
    dir: '/csrf/v1/get-csrf-token',
    method: 'ALL',
    func: (request, response) => {
        const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag);
        if (!DFFlag['IsCSRFV2Enabled']) {
            Log_1.FASTLOG4(Log_1.FLog['CsrfAPIV1'], 'The service is disabled currently.', true);
            return response.status(503).send({
                success: false,
                message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
                userfacingmessage: 'Service disabled for an unknown amount of time.',
            });
        }
        if (request.method === 'OPTIONS')
            return response.status(200).send({ success: true, message: '' });
        if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
            Log_1.FASTLOG6(Log_1.FLog['CsrfAPIV1'], 'HTTPS was not given where it was required.', true);
            return response.status(403).send({ success: false, message: 'HTTPS Required.' });
        }
        if (request.method !== 'POST') {
            Log_1.FASTLOG6(Log_1.FLog['CsrfAPIV1'], `${request.method} is not supported`);
            return response.status(405).send({
                success: false,
                message: `The requested resource does not support http method '${request.method}'.`,
            });
        }
        if (!createOrGetXsrfSession_1.default(request.cookies['authId'], request.ip, request.headers['x-csrf-token'], response, true)) {
            Log_1.FASTLOG4(Log_1.FLog['CsrfAPIV1'], `Gave CSRF for subject ${request.cookies['authId'] || 'No AuthId'} [${request.ip}], the session probably didn't exist.`);
            return;
        }
        else {
            Log_1.FASTLOG1(Log_1.FLog['CsrfAPIV1'], `Gave CSRF for subject ${request.cookies['authId'] || 'No AuthId'} [${request.ip}], the session probably existed.`);
        }
    },
};
