"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const spdy_1 = __importDefault(require("spdy"));
const dotenv_1 = __importDefault(require("dotenv"));
const directories_1 = require("../constants/directories");
const fs_1 = __importDefault(require("fs"));
const Log_1 = require("./Log");
dotenv_1.default.config({ path: directories_1._dirname + '\\.env' });
module.exports = (app, name) => {
    try {
        const httpsServer = spdy_1.default
            .createServer({
            cert: fs_1.default.readFileSync(directories_1._sslname + '\\mfdlabs.crt', 'utf-8'),
            key: fs_1.default.readFileSync(directories_1._sslname + '\\mfdlabsprivate.key', 'utf-8'),
            passphrase: process.env['mfdlabs_pc'],
            maxVersion: 'TLSv1.3',
            minVersion: 'TLSv1.3',
        }, app)
            .listen(443, name, () => Log_1.FASTLOG3(Log_1.FLog[name], `https://${name}:443 started.`));
        const httpServer = app.listen(80, name, () => Log_1.FASTLOG3(Log_1.FLog[name], `http://${name}:80 started.`));
        return [httpServer, httpsServer];
    }
    catch (err) {
        throw new Error(err);
    }
};
