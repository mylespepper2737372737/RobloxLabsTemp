"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../constants/directories");
module.exports = (sessionFile) => {
    try {
        return JSON.parse(fs_1.default.readFileSync(directories_1._dirname + '\\manifest\\csrf\\' + sessionFile, { encoding: 'utf-8' }));
    }
    catch {
        return { c: 0, sub: '', token: '' };
    }
};
