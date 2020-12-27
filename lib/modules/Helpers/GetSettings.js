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
    Group[Group["FSettings"] = 6] = "FSettings";
    Group[Group["All"] = 7] = "All";
})(Group = exports.Group || (exports.Group = {}));
exports.GetSettings = (settingsType, settingsGroup = 'Web') => {
    const settings = JSON.parse(fs_1.default.readFileSync(directories_1._dirname + '\\global\\flags.json', 'ascii'));
    if (settingsType || settingsType === 0 || settingsType === Group.FFlag) {
        switch (settingsType) {
            case Group.FFlag:
                return settings[settingsGroup]['FFlag'];
            case Group.DFFlag:
                return settings[settingsGroup]['DFFlag'];
            case Group.FInt:
                return settings[settingsGroup]['FInt'];
            case Group.DFInt:
                return settings[settingsGroup]['DFInt'];
            case Group.FString:
                return settings[settingsGroup]['FString'];
            case Group.DFString:
                return settings[settingsGroup]['DFString'];
            case Group.FSettings:
                return settings['FSettings'];
            case Group.All:
                return settings[settingsGroup];
            default:
                return new Error(`Settings Group '${settingsType}' doesn't exist.`);
        }
    }
};
