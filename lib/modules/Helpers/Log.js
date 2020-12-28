"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLog = exports.FASTLOG7 = exports.FASTLOG6 = exports.FASTLOG5 = exports.FASTLOG4 = exports.FASTLOG3 = exports.FASTLOG2 = exports.FASTLOG1 = exports.LOGGROUP = void 0;
const GetSettings_1 = require("./GetSettings");
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../constants/directories");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: directories_1._dirname + '\\.env' });
exports.LOGGROUP = (Group) => {
    exports.FLog[Group] = Group;
};
exports.FASTLOG1 = (Group, message, LogToFile) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (process.env['NODE_ENV'] !== 'debug')
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[90m${new Date(Date.now()).toISOString()} \[\x1b[37m${Group.toUpperCase()}-COMMENT\x1b[90m\] %s\x1b[0m`, message);
    if (LogToFile)
        fs_1.default.appendFileSync(directories_1._dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-COMMENT] ${message}\n`, {
            encoding: 'utf-8',
        });
};
exports.FASTLOG2 = (Group, message, LogToFile) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (process.env['NODE_ENV'] !== 'debug')
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[37m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-INFO\x1b[37m\] %s\x1b[0m`, message);
    if (LogToFile)
        fs_1.default.appendFileSync(directories_1._dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-INFO] ${message}\n`, {
            encoding: 'utf-8',
        });
};
exports.FASTLOG3 = (Group, message, LogToFile) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (process.env['NODE_ENV'] !== 'debug')
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[36m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-LOG\x1b[36m\] %s\x1b[0m`, message);
    if (LogToFile)
        fs_1.default.appendFileSync(directories_1._dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-LOG] ${message}\n`, {
            encoding: 'utf-8',
        });
};
exports.FASTLOG4 = (Group, message, LogToFile) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (process.env['NODE_ENV'] !== 'debug')
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[33m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-WARN\x1b[33m\] %s\x1b[0m`, message);
    if (LogToFile)
        fs_1.default.appendFileSync(directories_1._dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-WARN] ${message}\n`, {
            encoding: 'utf-8',
        });
};
exports.FASTLOG5 = (Group, message, LogToFile) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (process.env['NODE_ENV'] !== 'debug')
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[35m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-DEBUG\x1b[35m\] %s\x1b[0m`, message);
    if (LogToFile)
        fs_1.default.appendFileSync(directories_1._dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-DEBUG] ${message}\n`, {
            encoding: 'utf-8',
        });
};
exports.FASTLOG6 = (Group, message, LogToFile) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (process.env['NODE_ENV'] !== 'debug')
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[31m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-ERROR\x1b[31m\] %s\x1b[0m`, message);
    if (LogToFile)
        fs_1.default.appendFileSync(directories_1._dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-ERROR] ${message}\n`, {
            encoding: 'utf-8',
        });
};
exports.FASTLOG7 = (Group, message, LogToFile) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (process.env['NODE_ENV'] !== 'debug')
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[91m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-FATAL\x1b[91m\] %s\x1b[0m`, message);
    if (LogToFile)
        fs_1.default.appendFileSync(directories_1._dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-FATAL] ${message}\n`, {
            encoding: 'utf-8',
        });
};
exports.FLog = {};
