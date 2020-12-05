"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directories_1 = require("../../constants/directories");
exports.default = (req, res) => {
    res.status(req.method === 'OPTIONS' ? 200 : 404).sendFile(directories_1._dirname + '\\views\\ecs404.html');
};
