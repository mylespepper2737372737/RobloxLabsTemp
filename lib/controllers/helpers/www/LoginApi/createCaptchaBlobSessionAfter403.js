"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../../../../modules/constants/directories");
module.exports = (response, captchaBLOB, ip) => {
    fs_1.default.writeFileSync(directories_1._dirname + `\\manifest\\sessions\\${captchaBLOB}.json`, JSON.stringify({ sub: ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) }), { encoding: 'ascii' });
    setTimeout(() => {
        try {
            fs_1.default.unlinkSync(directories_1._dirname + `\\manifest\\sessions\\${captchaBLOB}.json`);
        }
        catch {
            console.warn('The session is already clear');
        }
    }, 60000);
    response.statusMessage = 'Captcha failed';
    return response.status(403).header({ expires: 60000 }).send({
        success: false,
        message: 'You need to pass the robot test first.',
        blob: captchaBLOB,
        expires: 60000,
    });
};
