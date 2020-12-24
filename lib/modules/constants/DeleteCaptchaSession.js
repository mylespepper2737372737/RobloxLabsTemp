"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("./directories");
module.exports = (sessionId) => {
    try {
        fs_1.default.unlinkSync(directories_1._dirname + `\\manifest\\sessions\\${sessionId}.json`);
    }
    catch {
        console.warn('Session most likely destroyed');
    }
};
