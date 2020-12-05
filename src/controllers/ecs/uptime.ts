export default {
	dir: '/uptime',
	method: 'all',
	func: (_req: unknown, res: { send: (arg0: { message: string }) => void }): void => {
		res.send({ message: 'OK' });
	},
};
