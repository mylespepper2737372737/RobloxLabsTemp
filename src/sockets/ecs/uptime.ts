export default {
	dir: '/uptime',
	func: (socket: { send: (arg0: boolean) => void; close: () => void }): void => {
		socket.send(true);
		socket.close();
	},
};
