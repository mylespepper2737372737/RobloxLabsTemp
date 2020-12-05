"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UseRouting = (app, opts) => {
    return new Promise((r) => {
        app.use(express_1.Router(opts));
        r();
    });
};
exports.default = UseRouting;
