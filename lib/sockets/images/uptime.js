"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    dir: '/uptime',
    func: (socket, req) => {
        console.log(req, req.headers);
        socket.send('true');
        socket.close();
    },
};
