"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    dir: '/uptime',
    method: 'all',
    func: (_req, res) => {
        res.send({ message: 'OK' });
    },
};
