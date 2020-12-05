export default (
	req: { method: string; hostname: string; url: string; headers: { [x: string]: string } },
	res: {
		status: (
			arg0: number,
		) => {
			(): any;
			new (): any;
			send: { (arg0: { code: number; message: string; userfacingmessage: string }): any; new (): any };
		};
	},
) => {
	return res.status(req.method === 'OPTIONS' ? 200 : 404).send({
		code: 404,
		message: 'https://' + req.hostname + req.url + ' NotFound.',
		userfacingmessage:
			'404 Not Found, the endpoint (https://' +
			req.hostname +
			req.url +
			') that you requested from ' +
			req.headers['origin'] +
			' is invalid, please contact a developer or check status on https://www.sitetest1.mfdlabs.com/status.ashx',
	});
};
