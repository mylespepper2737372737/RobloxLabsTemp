"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const directories_1 = require("../modules/constants/directories");
const UsePages = (app, opts, PagesOpts) => {
    return new Promise((r) => {
        const path = (opts !== undefined ? opts.path : directories_1._dirname + '\\pages') || directories_1._dirname + '\\pages';
        app.use(express_1.static(path, PagesOpts));
        r();
    });
};
exports.default = UsePages;
