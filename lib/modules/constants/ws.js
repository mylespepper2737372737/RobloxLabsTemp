"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const MapWebsockets_1 = __importDefault(require("../../global/MapWebsockets"));
const directories_1 = require("../constants/directories");
module.exports = async (HttpServer, HttpsServer, dir, apiName) => {
    await MapWebsockets_1.default(HttpServer, HttpsServer, {
        path: directories_1._dirname + dir,
        shouldHandleUpgrade: true,
        apiName: apiName,
        logSetups: true,
    });
};
