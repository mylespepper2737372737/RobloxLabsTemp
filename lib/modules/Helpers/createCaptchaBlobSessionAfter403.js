"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../constants/directories");
const GetSettings_1 = require("./GetSettings");
const FInt = GetSettings_1.GetSettings(GetSettings_1.Group.FInt);
module.exports = (response, captchaBLOB, ip) => {
    const dataToRefer = { sub: ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) };
    fs_1.default.writeFileSync(directories_1._dirname + `\\manifest\\sessions\\${captchaBLOB}.json`, JSON.stringify(dataToRefer), { encoding: 'ascii' });
    setTimeout(() => {
        try {
            fs_1.default.unlinkSync(directories_1._dirname + `\\manifest\\sessions\\${captchaBLOB}.json`);
        }
        catch {
            console.warn('The session is already clear');
        }
    }, FInt['CaptchaV2Timeout']);
    response.statusMessage = 'Captcha failed';
    response.status(403).header({ expires: FInt['CaptchaV2Timeout'] }).send({
        success: false,
        message: 'You need to pass the robot test first.',
        blob: captchaBLOB,
        expires: FInt['CaptchaV2Timeout'],
    });
    return;
};
