// Negotiate.fxhx
export default {
	dir: '/Login/RequestAuth.ashx/',
	method: 'all',
	func: (_req: any, res: { send: (arg0: string) => void }): void => {
		res.send('http://api.sitetest4.robloxlabs.com/Login/Negotiate.ashx');
	},
};
