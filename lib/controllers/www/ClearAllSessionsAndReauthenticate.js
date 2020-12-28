"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SetManifestField_1 = __importDefault(require("../../modules/Helpers/SetManifestField"));
const GetManifests_1 = require("../../modules/Helpers/GetManifests");
const GetSettings_1 = require("../../modules/Helpers/GetSettings");
const dotenv_1 = __importDefault(require("dotenv"));
const directories_1 = require("../../modules/constants/directories");
const crypto_1 = __importDefault(require("crypto"));
const Log_1 = require("../../modules/Helpers/Log");
dotenv_1.default.config({ path: directories_1._dirname + '\\.env' });
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
exports.default = {
    dir: '/Authorization/ClearAllSessionsAndReauthenticate.fxhx',
    method: 'All',
    func: (request, response) => {
        const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag);
        const DFInt = GetSettings_1.GetSettings(GetSettings_1.Group.DFInt);
        const Manifest = GetManifests_1.GetManifests();
        if (!DFFlag['IsWWWAuthV1Enabled']) {
            Log_1.FASTLOG4(Log_1.FLog['WWWAuthV1'], 'The service is disabled currently.', true);
            return response.status(503).send({
                code: 503,
                message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
                userfacingmessage: 'Service disabled for an unknown amount of time.',
            });
        }
        if (request.method === 'OPTIONS')
            return response.status(200).send({ success: true, message: '' });
        if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
            Log_1.FASTLOG6(Log_1.FLog['WWWAuthV1'], 'HTTPS was not given where it was required.', true);
            return response.status(403).send({ success: false, message: 'HTTPS Required.' });
        }
        if (request.method !== 'POST' && !DFFlag['WWWAuthV1AllowAllMethods']) {
            Log_1.FASTLOG6(Log_1.FLog['WWWAuthV1'], `${request.method} is not supported`);
            return response.status(405).send({
                success: false,
                message: `The requested resource does not support http method '${request.method}'.`,
            });
        }
        let validUser = undefined;
        let isValidId = false;
        if (!request.cookies['authId']) {
            Log_1.FASTLOG6(Log_1.FLog['WWWAuthV1'], 'AuthId did not exist on the request.', true);
            return response.status(400).send({ success: false, message: 'AuthId was not supplied' });
        }
        Manifest.forEach((user) => {
            user.sessionIds.forEach((sessionId) => {
                if (sessionId === request.cookies['authId']) {
                    isValidId = true;
                    validUser = user;
                }
            });
        });
        if (!isValidId) {
            Log_1.FASTLOG4(Log_1.FLog['WWWAuthV1'], `The user matching ${request.cookies['authId']} was not found.`, true);
            return response.status(404).send({
                success: false,
                message: 'AuthId not found.',
                userfacingmessage: 'The current credentials are invalid, please manually remove them and log in again.',
            });
        }
        SetManifestField_1.default(validUser.userId, 'sessionIds', [], false, false, 0, false, false);
        const authId = crypto_1.default.createHash('sha512').update(crypto_1.default.randomBytes(1000)).digest('hex');
        SetManifestField_1.default(validUser.userId, 'sessionIds', authId, true, false, 0, false, false);
        response.shouldKeepAlive = false;
        Log_1.FASTLOG1(Log_1.FLog['WWWAuthV1'], `Successfully cleared all sessions of ${validUser.username.toString()} [${validUser.userId}-${request.cookies['authId']}]`, true);
        return response
            .status(200)
            .cookie('authId', authId, {
            maxAge: DFInt['WWWAuthV1MaxAuthIdAge'],
            domain: '.sitetest1.mfdlabs.com',
            secure: true,
            sameSite: 'lax',
            httpOnly: true,
        })
            .send({ success: true, message: 'Success', userfacingmessage: 'Success' });
    },
};
