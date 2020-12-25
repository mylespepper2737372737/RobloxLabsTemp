"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../constants/directories");
module.exports = () => {
    const registeredUsers = fs_1.default.readFileSync(directories_1._dirname + '\\manifest\\users.json', 'ascii');
    return JSON.parse(registeredUsers);
};
