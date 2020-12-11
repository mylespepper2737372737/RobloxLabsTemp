"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ws_1 = __importDefault(require("ws"));
const fs_1 = __importDefault(require("fs"));
const directories_1 = require("../modules/constants/directories");
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = (HttpServer, HttpsServer, opts) => {
    let lasthttpsport;
    let lasthttpport;
    return new Promise((resolve, reject) => {
        let controllers;
        try {
            controllers = fs_1.default.readdirSync((opts !== undefined ? opts.path : directories_1._dirname + '\\sockets') || directories_1._dirname + '\\sockets');
        }
        catch (err) {
            return reject(err);
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
                let dir;
                let func;
                if (map.default) {
                    if (map.default.dir)
                        dir = map.default.dir;
                    else
                        return;
                    if (map.default.func)
                        func = map.default.func;
                    else
                        return;
                    try {
                        let portHttps = getRandomInt(80, 8000);
                        if (portHttps === lasthttpsport)
                            portHttps = getRandomInt(80, 8000);
                        lasthttpsport = portHttps;
                        let portHttp = getRandomInt(80, 8000);
                        if (portHttp === lasthttpport)
                            portHttp = getRandomInt(80, 8000);
                        lasthttpport = portHttp;
                        if (opts.logSetups)
                            console.log(`Mapping GET wss://${opts.apiName + dir}:${portHttps}`);
                        const wsServer = new ws_1.default.Server({ path: dir, port: portHttp, server: HttpServer });
                        const wssServer = new ws_1.default.Server({ path: dir, port: portHttps, server: HttpsServer });
                        wssServer.on('connection', (socket, request) => func(socket, request));
                        wsServer.on('connection', (socket, request) => func(socket, request));
                        if (opts.shouldHandleUpgrade) {
                            if (opts.logSetups)
                                console.log(`Mapping UPGRADE https://${opts.apiName}`);
                            HttpsServer.on('upgrade', (request, socket, head) => {
                                wssServer.handleUpgrade(request, socket, head, (socket) => {
                                    wssServer.emit('connection', socket, request);
                                });
                            });
                            HttpServer.on('upgrade', (request, socket, head) => {
                                wsServer.handleUpgrade(request, socket, head, (socket) => {
                                    wsServer.emit('connection', socket, request);
                                });
                            });
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                else {
                    return reject(`${v} had no default export.`);
                }
            }
        });
        resolve();
    });
};
