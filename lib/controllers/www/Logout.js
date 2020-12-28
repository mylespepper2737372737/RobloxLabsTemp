"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SetManifestField_1 = __importDefault(require("../../modules/Helpers/SetManifestField"));
const deleteCsrfSession_1 = __importDefault(require("../../modules/Helpers/deleteCsrfSession"));
const GetManifests_1 = require("../../modules/Helpers/GetManifests");
const GetSettings_1 = require("../../modules/Helpers/GetSettings");
const dotenv_1 = __importDefault(require("dotenv"));
const directories_1 = require("../../modules/constants/directories");
dotenv_1.default.config({ path: directories_1._dirname + '\\.env' });
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
exports.default = {
    dir: '/Authorization/Logout.fxhx',
    method: 'All',
    func: (request, response) => {
        const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag);
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
        let validUser = undefined;
        let isValidId = false;
        let validIdx = 0;
        if (!request.cookies['authId'])
            return response.status(400).send({ success: false, message: 'AuthId was not supplied' });
        Manifest.forEach((user) => {
            user.sessionIds.forEach((sessionId, idx) => {
                if (sessionId === request.cookies['authId']) {
                    isValidId = true;
                    validUser = user;
                    validIdx = idx;
                }
            });
        });
        if (!isValidId)
            return response.status(404).send({
                success: false,
                message: 'AuthId not found.',
                userfacingmessage: 'The current credentials are invalid, please manually remove them and log in again.',
            });
        deleteCsrfSession_1.default(request.cookies['authId']);
        SetManifestField_1.default(validUser.userId, 'sessionIds', undefined, false, false, validIdx, true, false);
        response.shouldKeepAlive = false;
        return response
            .status(200)
            .clearCookie('authId', { domain: '.sitetest1.mfdlabs.com' })
            .send({ success: true, message: 'Success', userfacingmessage: 'Success' });
    },
};
