"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("./directories");
module.exports = () => {
    return new Promise((resolve, reject) => {
        try {
            fs_1.default.rmdirSync(directories_1._dirname + '\\manifest\\sessions', { recursive: true });
            fs_1.default.mkdirSync(directories_1._dirname + '\\manifest\\sessions');
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
};
