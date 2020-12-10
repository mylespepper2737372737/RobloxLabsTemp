export default {
	dir: '/uptime',
	func: (socket: { send: (arg0: boolean) => void; close: () => void }, req: { header: any }): void => {
		console.log(req, req.header);
		socket.send(true);
		socket.close();
	},
};
