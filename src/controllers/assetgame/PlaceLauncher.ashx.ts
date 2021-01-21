const txt = {
	jobId: '00000000-0000-0000-0000-000000000000',
	status: 2,
	joinScriptUrl: 'http://assetgame.mfdlabs.com/Game/Join.ashx?placeId=1818',
	authenticationUrl: 'https://api.mfdlabs.com/Login/Negotiate.ashx',
	authenticationTicket: 'Guest:-3074',
};
export default {
	dir: '/Game/PlaceLauncher.ashx',
	method: 'all',
	func: (_req: unknown, res: { send: (arg0: unknown) => void }): void => {
		res.send(txt);
	},
};
