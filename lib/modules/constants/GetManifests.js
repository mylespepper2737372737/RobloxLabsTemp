"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("./directories");
module.exports = () => {
    const map = fs_1.default.readdirSync(directories_1._dirname + '\\manifest\\users');
    const users = new Map();
    map.forEach((v) => {
        const user = fs_1.default.readFileSync(directories_1._dirname + '\\manifest\\users\\' + v, { encoding: 'utf-8' });
        users.set(v.split('.').shift(), JSON.parse(user));
    });
    return users;
};
