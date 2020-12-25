"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLog = exports.FASTLOG7 = exports.FASTLOG6 = exports.FASTLOG5 = exports.FASTLOG4 = exports.FASTLOG3 = exports.FASTLOG2 = exports.FASTLOG1 = exports.LOGGROUP = void 0;
const GetSettings_1 = require("./GetSettings");
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
exports.LOGGROUP = (Group) => {
    exports.FLog[Group] = Group;
};
exports.FASTLOG1 = (Group, message) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[90m${new Date(Date.now()).toISOString()} \[\x1b[37m${Group.toUpperCase()}-COMMENT\x1b[90m\] %s\x1b[0m`, message);
};
exports.FASTLOG2 = (Group, message) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[37m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-INFO\x1b[37m\] %s\x1b[0m`, message);
};
exports.FASTLOG3 = (Group, message) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[36m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-LOG\x1b[36m\] %s\x1b[0m`, message);
};
exports.FASTLOG4 = (Group, message) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[33m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-WARN\x1b[33m\] %s\x1b[0m`, message);
};
exports.FASTLOG5 = (Group, message) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[35m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-DEBUG\x1b[35m\] %s\x1b[0m`, message);
};
exports.FASTLOG6 = (Group, message) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[31m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-ERROR\x1b[31m\] %s\x1b[0m`, message);
};
exports.FASTLOG7 = (Group, message) => {
    if (!FFlag['AreLogsEnabled'])
        return;
    if (!exports.FLog[Group])
        return;
    console.log(`\x1b[91m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-FATAL\x1b[91m\] %s\x1b[0m`, message);
};
exports.FLog = {
    test: 'test',
};
