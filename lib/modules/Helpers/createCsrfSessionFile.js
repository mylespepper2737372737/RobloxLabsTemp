"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../constants/directories");
const GetSettings_1 = require("./GetSettings");
const FInt = GetSettings_1.GetSettings(GetSettings_1.Group.FInt, 'Web');
module.exports = (id) => {
    const sessionFile = `${id}.json`;
    const t = crypto_1.default.createHash('md5').update(crypto_1.default.randomBytes(1000)).digest('base64');
    fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: id, token: t, c: 0 }, undefined, 4), {
        encoding: 'ascii',
    });
    let count = 0;
    const r = setInterval(() => {
        count++;
        if (!fs_1.default.existsSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile))
            return r.unref();
        if (count === FInt['CSRFV2MaxRefreshCount'])
            return r.unref();
        try {
            fs_1.default.writeFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, JSON.stringify({ sub: id, token: crypto_1.default.createHash('md5').update(crypto_1.default.randomBytes(1000)).digest('base64'), c: count }, undefined, 4), {
                encoding: 'ascii',
            });
        }
        catch { }
    }, FInt['CSRFV2Timeout']);
    return t;
};
