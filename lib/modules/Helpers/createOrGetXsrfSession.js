"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GetSettings_1 = require("./GetSettings");
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../constants/directories");
const checkForAuthId_1 = __importDefault(require("./checkForAuthId"));
const Crypto = __importStar(require("crypto"));
const FInt = GetSettings_1.GetSettings(GetSettings_1.Group.FInt, 'Web');
const FString = GetSettings_1.GetSettings(GetSettings_1.Group.FString);
module.exports = (authId = '', ip = '', token = '', response, isXsrfEndpoint) => {
    const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag, 'Web');
    if (!DFFlag['IsCSRFV2Enabled'])
        return true;
    if (DFFlag['IsCSRFV2Hardcoded']) {
        response
            .status(isXsrfEndpoint ? 200 : 403)
            .header({
            'access-control-expose-headers': 'X-CSRF-TOKEN, API-TRANSFER',
            'x-csrf-token': FString['CSRFV2HardcodedKey'],
            'api-transfer': 'Expose-Hardcoded-Session-Token#433',
        })
            .send({ success: isXsrfEndpoint, message: 'Token Validation Failed' });
        return;
    }
    if (ip)
        ip = ip.split('.').join('-');
    const csrfSessions = fs_1.default.readdirSync(directories_1._dirname + '\\manifest\\csrf');
    let hasFoundSession = false;
    let isBasedOnIpAndAuthId = false;
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
            if (ip && !authId) {
                sessionFile = `${ip}.json`;
                const t = Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64');
                fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: ip, token: t }, undefined, 4), {
                    encoding: 'ascii',
                });
                let count = 0;
                const r = setInterval(() => {
                    if (count === FInt['CSRFV2MaxRefreshCount'])
                        return r.unref();
                    try {
                        fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: ip, token: Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64') }, undefined, 4), {
                            encoding: 'ascii',
                        });
                        count++;
                    }
                    catch { }
                }, FInt['CSRFV2Timeout']);
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
                sessionFile = `${authId}.json`;
                const t = Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64');
                fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: authId, token: t }, undefined, 4), {
                    encoding: 'ascii',
                });
                let count = 0;
                const r = setInterval(() => {
                    if (count === FInt['CSRFV2MaxRefreshCount'])
                        return r.unref();
                    try {
                        fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: ip, token: Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64') }, undefined, 4), {
                            encoding: 'ascii',
                        });
                        count++;
                    }
                    catch { }
                }, FInt['CSRFV2Timeout']);
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
            sessionFile = `${ip}.json`;
            const t = Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64');
            fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: ip, token: t }, undefined, 4), {
                encoding: 'ascii',
            });
            let count = 0;
            const r = setInterval(() => {
                if (count === FInt['CSRFV2MaxRefreshCount'])
                    return r.unref();
                try {
                    fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: ip, token: Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64') }, undefined, 4), {
                        encoding: 'ascii',
                    });
                    count++;
                }
                catch { }
            }, FInt['CSRFV2Timeout']);
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
            sessionFile = `${authId}.json`;
            const t = Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64');
            fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: authId, token: t }, undefined, 4), {
                encoding: 'ascii',
            });
            let count = 0;
            const r = setInterval(() => {
                if (count === FInt['CSRFV2MaxRefreshCount'])
                    return r.unref();
                try {
                    fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: ip, token: Crypto.createHash('md5').update(Crypto.randomBytes(1000)).digest('base64') }, undefined, 4), {
                        encoding: 'ascii',
                    });
                    count++;
                }
                catch { }
            }, FInt['CSRFV2Timeout']);
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
    }
    if (sessionFile) {
        if (JSON.parse(fs_1.default.readFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, { encoding: 'utf-8' }))['token'] !== token) {
            response.statusMessage = isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'];
            response
                .status(isXsrfEndpoint ? 200 : 403)
                .header({
                'access-control-expose-headers': 'X-CSRF-TOKEN',
                'x-csrf-token': JSON.parse(fs_1.default.readFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, { encoding: 'utf-8' }))['token'],
            })
                .send({ success: isXsrfEndpoint, message: isXsrfEndpoint ? 'OK' : FString['CSRFV2FailedResponseStatusText'] });
            return false;
        }
        return true;
    }
    return true;
};
