"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GetSettings_1 = require("./GetSettings");
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../constants/directories");
const createCsrfSessionFile_1 = __importDefault(require("./createCsrfSessionFile"));
const getCsrfSession_1 = __importDefault(require("./getCsrfSession"));
const checkForAuthId_1 = __importDefault(require("./checkForAuthId"));
const FString = GetSettings_1.GetSettings(GetSettings_1.Group.FString);
module.exports = (authId = '', ip = '', token = '', response, isXsrfEndpoint) => {
    const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag, 'Web');
    if (!DFFlag['IsCSRFV2Enabled'])
        return true;
    if (DFFlag['CanCSRFV2AdminKeyBeUsed'] && token === FString['CSRFV2HardcodedKey'])
        return true;
    if (DFFlag['IsCSRFV2Hardcoded'] && token !== FString['CSRFV2HardcodedKey']) {
        response
            .status(isXsrfEndpoint ? 200 : 403)
            .header({
            'access-control-expose-headers': 'X-CSRF-TOKEN, API-TRANSFER',
            'x-csrf-token': FString['CSRFV2HardcodedKey'],
            'api-transfer': 'Expose-Hardcoded-Session-Token#433',
        })
            .send({ success: isXsrfEndpoint, message: 'Token Validation Failed' });
        return false;
    }
    else if (DFFlag['IsCSRFV2Hardcoded'] && token === FString['CSRFV2HardcodedKey']) {
        return true;
    }
    if (ip)
        ip = ip.split('.').join('-');
    const csrfSessions = fs_1.default.readdirSync(directories_1._dirname + '\\manifest\\csrf');
    let hasFoundSession = false;
    let isBasedOnIpAndAuthId = DFFlag['IsCSRFV2BasedOnIpAddressAndAuthenticationId'];
    let sessionFile = '';
    if (!checkForAuthId_1.default(authId))
        authId = undefined;
    csrfSessions.forEach((file) => {
        if (DFFlag['IsCSRFV2BasedOnAuthenticationId']) {
            if (file.split('.')[0] === authId) {
                sessionFile = file;
                hasFoundSession = true;
                return;
            }
        }
        else if (DFFlag['IsCSRFV2BasedOnIPAddress']) {
            if (file.split('.')[0] === ip) {
                sessionFile = file;
                hasFoundSession = true;
                return;
            }
        }
        else if (DFFlag['IsCSRFV2BasedOnIpAddressAndAuthenticationId']) {
            if (ip && !authId) {
                if (file.split('.')[0] === ip) {
                    sessionFile = file;
                    hasFoundSession = true;
                    return;
                }
            }
            else if (authId && ip) {
                if (file.split('.')[0] === authId) {
                    sessionFile = file;
                    hasFoundSession = true;
                    return;
                }
                isBasedOnIpAndAuthId = true;
            }
        }
    });
    let hasFoundSession2 = true;
    if (!hasFoundSession) {
        if (isBasedOnIpAndAuthId) {
            if (csrfSessions.length > 0) {
                csrfSessions.forEach((session) => {
                    if (session.split('.')[0] !== ip) {
                        hasFoundSession2 = false;
                    }
                    else {
                        sessionFile = session;
                        hasFoundSession2 = true;
                        return;
                    }
                });
            }
            else {
                hasFoundSession2 = false;
            }
        }
        else {
            if (ip && !authId) {
                const t = createCsrfSessionFile_1.default(ip);
                response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
                response
                    .status(isXsrfEndpoint ? 200 : 403)
                    .header({
                    'access-control-expose-headers': 'X-CSRF-TOKEN',
                    'x-csrf-token': t,
                })
                    .send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
                return false;
            }
            else if (ip && authId) {
                const t = createCsrfSessionFile_1.default(authId);
                response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
                response
                    .status(isXsrfEndpoint ? 200 : 403)
                    .header({
                    'access-control-expose-headers': 'X-CSRF-TOKEN',
                    'x-csrf-token': t,
                })
                    .send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
                return false;
            }
        }
    }
    if (!hasFoundSession2) {
        if (ip && !authId) {
            const t = createCsrfSessionFile_1.default(ip);
            response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
            response
                .status(isXsrfEndpoint ? 200 : 403)
                .header({
                'access-control-expose-headers': 'X-CSRF-TOKEN',
                'x-csrf-token': t,
            })
                .send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
            return;
        }
        else if (ip && authId) {
            const t = createCsrfSessionFile_1.default(authId);
            response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
            response
                .status(isXsrfEndpoint ? 200 : 403)
                .header({
                'access-control-expose-headers': 'X-CSRF-TOKEN',
                'x-csrf-token': t,
            })
                .send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
            return false;
        }
    }
    if (sessionFile) {
        if (getCsrfSession_1.default(sessionFile)['token'] !== token) {
            response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
            response
                .status(isXsrfEndpoint ? 200 : 403)
                .header({
                'access-control-expose-headers': 'X-CSRF-TOKEN',
                'x-csrf-token': getCsrfSession_1.default(sessionFile)['token'],
            })
                .send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
            return false;
        }
        return true;
    }
    return true;
};
