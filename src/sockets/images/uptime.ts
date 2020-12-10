export default {
	dir: '/uptime',
	func: (socket: { send: (arg0: string) => void; close: () => void }, req: { headers: any }): void => {
		console.log(req, req.headers);
		socket.send('true');
		socket.close();
	},
};
