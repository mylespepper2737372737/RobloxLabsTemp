import ws from 'ws';
import c from 'crypto';
export default {
	dir: '/uptime',
	func: (socket: ws, req: { headers: any }): void => {
		console.log(req, req.headers);
		let n = 0;
		const i = setInterval(() => {
			socket.send(c.createHash('sha512').update(c.randomBytes(1000)).digest('hex'));
			n += 1;
			if (n === 10) {
				i.unref();
				return socket.close();
			}
		}, 5000);
	},
};
