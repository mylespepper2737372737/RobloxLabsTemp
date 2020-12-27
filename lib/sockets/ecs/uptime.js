"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
exports.default = {
    dir: '/uptime',
    func: (socket) => {
        let n = 0;
        const i = setInterval(() => {
            socket.send(crypto_1.default.createHash('sha512').update(crypto_1.default.randomBytes(1000)).digest('hex'));
            n += 1;
            if (n === 10) {
                i.unref();
                return socket.close();
            }
        }, 5000);
    },
};
