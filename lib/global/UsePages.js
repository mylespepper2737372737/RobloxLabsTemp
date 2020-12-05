"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _dirname = 'C:\\Users\\Padraig\\Git\\Mfd\\Web\\mfd.com\\lib';
const UsePages = (app, opts, PagesOpts) => {
    return new Promise((r) => {
        const path = (opts !== undefined ? opts.path : _dirname + '\\pages') || _dirname + '\\pages';
        app.use(express_1.static(path, PagesOpts));
        r();
    });
};
exports.default = UsePages;
