import ws from 'ws';
import filestream from 'fs';
import { _dirname } from '../modules/constants/directories';
import { IncomingMessage, Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';

interface wssOpts {
	path?: string;
	shouldHandleUpgrade?: boolean;
	apiName?: string;
	logSetups?: boolean;
}

export = (HttpServer: HttpServer, HttpsServer: HttpsServer, opts?: wssOpts): Promise<void> => {
	return new Promise((resolve, reject) => {
		let controllers: string[];
		try {
			controllers = filestream.readdirSync((opts !== undefined ? opts.path : _dirname + '\\sockets') || _dirname + '\\sockets');
		} catch (err) {
			return reject(err);
		}
		controllers.forEach((v) => {
			if (!v.includes('.js.map') || !v.includes('.d.ts')) {
				let map: {
					default: { dir: string; func: (request: ws, Response: IncomingMessage) => unknown };
				};
				try {
					map = require(((opts !== undefined ? opts.path + '\\' : _dirname + '\\sockets\\') || _dirname + '\\sockets\\') + v);
				} catch (err) {
					return console.error(err);
				}
				let dir: string;
				let func: (request: ws, Response: IncomingMessage) => unknown;
				if (map.default) {
					if (map.default.dir) dir = map.default.dir;
					else return;
					if (map.default.func) func = map.default.func;
					else return;
					try {
						if (opts.logSetups) console.log(`Mapping GET wss://${opts.apiName + dir}`);
						const wsServer = new ws.Server({ path: dir, port: 80, server: HttpServer });
						const wssServer = new ws.Server({ path: dir, port: 443, server: HttpsServer });
						wssServer.on('connection', (socket, request) => func(socket, request));
						wsServer.on('connection', (socket, request) => func(socket, request));
						if (opts.shouldHandleUpgrade) {
							if (opts.logSetups) console.log(`Mapping UPGRADE https://${opts.apiName}`);
							HttpsServer.on('upgrade', (request, socket, head) => {
								wssServer.handleUpgrade(request, socket, head, (socket) => {
									wssServer.emit('connection', socket, request);
								});
							});
							HttpServer.on('upgrade', (request, socket, head) => {
								wsServer.handleUpgrade(request, socket, head, (socket) => {
									wsServer.emit('connection', socket, request);
								});
							});
						}
					} catch (e) {
						reject(e);
					}
				} else {
					return reject(`${v} had no default export.`);
				}
			}
		});
		resolve();
	});
};
