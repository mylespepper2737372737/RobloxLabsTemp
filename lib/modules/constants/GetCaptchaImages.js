"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCaptchaImages = void 0;
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("./directories");
exports.GetCaptchaImages = () => {
    return JSON.parse(fs_1.default.readFileSync(directories_1._dirname + '\\global\\captchaimages.json', { encoding: 'utf-8' }));
};
