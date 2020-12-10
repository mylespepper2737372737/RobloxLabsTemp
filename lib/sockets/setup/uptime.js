"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    dir: '/uptime',
    func: (socket) => {
        socket.send(true);
        socket.close();
    },
};
