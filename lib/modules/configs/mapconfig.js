"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const directories_1 = require("../constants/directories");
const default_serverv2_config_1 = __importDefault(require("../../config/default-serverv2-config"));
exports.default = (app, PagesDir, EndpointsDir, apiName, errorpage) => {
    return {
        app: app,
        ...default_serverv2_config_1.default,
        PagesOpts: {
            path: directories_1._dirname + PagesDir,
        },
        EndpointOpts: {
            path: directories_1._dirname + EndpointsDir,
            logSetups: true,
            apiName: apiName,
        },
        errorpage: errorpage,
    };
};
