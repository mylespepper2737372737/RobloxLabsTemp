"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("./directories");
module.exports = (userId, field, value, pushIfArray, popIfUndefined, index, spliceIfIndex, createIfDoesntExist) => {
    let user;
    try {
        user = JSON.parse(fs_1.default.readFileSync(directories_1._dirname + `\\manifest\\users\\${userId}.json`, { encoding: 'utf-8' }));
    }
    catch (e) {
        return e;
    }
    if (user) {
        if (!createIfDoesntExist && user[field] !== null && !user[field])
            return "The field doesn't exist";
        else {
            if (Array.isArray(user[field])) {
                if (spliceIfIndex && index && value === undefined) {
                    user[field].splice(index, 1);
                    if (!user[field])
                        user[field] = [];
                }
                else if (pushIfArray && !popIfUndefined) {
                    user[field].push(value);
                    if (!user[field])
                        user[field] = [];
                }
                else if (popIfUndefined && value === undefined) {
                    user[field].pop();
                    if (!user[field])
                        user[field] = [];
                }
                else {
                    user[field] = value;
                    if (!user[field])
                        user[field] = [];
                }
            }
            else {
                user[field] = user;
            }
        }
    }
    return fs_1.default.writeFileSync(directories_1._dirname + `\\manifest\\users\\${userId}.json`, JSON.stringify(user, undefined, 4), { encoding: 'utf-8' });
};
