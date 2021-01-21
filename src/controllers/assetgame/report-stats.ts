export default {
	dir: '/game/report-stats/',
	method: 'all',
	func: (_req: any, res: { send: (arg0: { success: boolean; message: string }) => void }): void => {
		res.send({ success: true, message: '' });
	},
};
