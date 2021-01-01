"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ws_1 = __importDefault(require("ws"));
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../modules/constants/directories");
const Log_1 = require("../modules/Helpers/Log");
module.exports = (HttpServer, HttpsServer, opts) => {
    return new Promise((resolve, reject) => {
        let controllers;
        const maps = [];
        try {
            controllers = fs_1.default.readdirSync((opts !== undefined ? opts.path : directories_1._dirname + '\\sockets') || directories_1._dirname + '\\sockets');
        }
        catch (err) {
            return Log_1.FASTLOG6(Log_1.FLog[opts.apiName], err);
        }
        controllers.forEach((v) => {
            if (!v.includes('.js.map') || !v.includes('.d.ts')) {
                let map;
                try {
                    map = require(((opts !== undefined ? opts.path + '\\' : directories_1._dirname + '\\sockets\\') || directories_1._dirname + '\\sockets\\') + v);
                }
                catch (err) {
                    return console.error(err);
                }
                if (map.default) {
                    if (!map.default.dir)
                        return;
                    if (!map.default.func)
                        return;
                    maps.push(map.default);
                }
                else {
                    return reject(`${v} had no default export.`);
                }
            }
        });
        const wsServer = new ws_1.default.Server({ server: HttpServer, port: 8000, host: opts.apiName });
        const wssServer = new ws_1.default.Server({ server: HttpsServer, port: 5000, host: opts.apiName });
        if (opts.logSetups)
            Log_1.FASTLOG3(Log_1.FLog[opts.apiName], `Mapping UPGRADE https://${opts.apiName}:5000`);
        HttpsServer.on('upgrade', (r, s, h) => {
            let isValid = false;
            maps.forEach((v) => {
                if (r.url.split('?').shift() === v.dir) {
                    wssServer.handleUpgrade(r, s, h, (s2) => {
                        wssServer.emit('connection', s2, r);
                    });
                    isValid = true;
                }
            });
            if (!isValid) {
                s.write('HTTP/3.0 404 Socket Not Found\r\n\r\n');
                return s.destroy();
            }
        });
        if (opts.logSetups)
            Log_1.FASTLOG3(Log_1.FLog[opts.apiName], `Mapping CONNECT https://${opts.apiName}:5000`);
        wssServer.on('connection', (s, r) => {
            maps.forEach((v) => {
                if (r.url.split('?').shift() === v.dir) {
                    return v.func(s, r);
                }
            });
        });
        if (opts.logSetups)
            Log_1.FASTLOG3(Log_1.FLog[opts.apiName], `Mapping UPGRADE http://${opts.apiName}:8000`);
        HttpServer.on('upgrade', (r, s, h) => {
            let isValid = false;
            maps.forEach((v) => {
                if (r.url.split('?').shift() === v.dir) {
                    wssServer.handleUpgrade(r, s, h, (s2) => {
                        wssServer.emit('connection', s2, r);
                    });
                    isValid = true;
                }
            });
            if (!isValid) {
                s.write('HTTP/3.0 404 Socket Not Found\r\n\r\n');
                return s.destroy();
            }
        });
        if (opts.logSetups)
            Log_1.FASTLOG3(Log_1.FLog[opts.apiName], `Mapping CONNECT http://${opts.apiName}:8000`);
        wsServer.on('connection', (s, r) => {
            maps.forEach((v) => {
                if (r.url.split('?').shift() === v.dir) {
                    return v.func(s, r);
                }
            });
        });
        resolve();
    });
};
