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
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export = (HttpServer: HttpServer, HttpsServer: HttpsServer, opts?: wssOpts): Promise<void> => {
	let lasthttpsport: number;
	let lasthttpport: number;
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
						let portHttps = getRandomInt(80, 8000);
						if (portHttps === lasthttpsport) portHttps = getRandomInt(80, 8000);
						lasthttpsport = portHttps;
						let portHttp = getRandomInt(80, 8000);
						if (portHttp === lasthttpport) portHttp = getRandomInt(80, 8000);
						lasthttpport = portHttp;
						if (opts.logSetups) console.log(`Mapping GET wss://${opts.apiName + dir}:${portHttps}`);
						const wsServer = new ws.Server({ path: dir, port: portHttp, server: HttpServer });
						const wssServer = new ws.Server({ path: dir, port: portHttps, server: HttpsServer });
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
