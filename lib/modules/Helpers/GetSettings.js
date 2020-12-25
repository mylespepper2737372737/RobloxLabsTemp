"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSettings = exports.Group = void 0;
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../constants/directories");
var Group;
(function (Group) {
    Group[Group["FFlag"] = 0] = "FFlag";
    Group[Group["DFFlag"] = 1] = "DFFlag";
    Group[Group["FInt"] = 2] = "FInt";
    Group[Group["DFInt"] = 3] = "DFInt";
    Group[Group["FString"] = 4] = "FString";
    Group[Group["DFString"] = 5] = "DFString";
})(Group = exports.Group || (exports.Group = {}));
exports.GetSettings = (settingsGroup) => {
    const settings = JSON.parse(fs_1.default.readFileSync(directories_1._dirname + '\\global\\flags.json', 'ascii'));
    if (settingsGroup || settingsGroup === 0 || settingsGroup === Group.FFlag) {
        switch (settingsGroup) {
            case Group.FFlag:
                return settings['FFlag'];
            case Group.DFFlag:
                return settings['DFFlag'];
            case Group.FInt:
                return settings['FInt'];
            case Group.DFInt:
                return settings['DFInt'];
            case Group.FString:
                return settings['FString'];
            case Group.DFString:
                return settings['DFString'];
            default:
                return new Error(`Settings Group '${settingsGroup}' doesn't exist.`);
        }
    }
    return settings;
};
