import crypto from 'crypto';
export default (
	req: { query: { apiKey: string }; method: string; url: string },
	res: {
		status: (
			arg0: number,
		) => {
			(): any;
			new (): any;
			contentType: {
				(arg0: string): { (): any; new (): any; send: { (arg0: string): any; new (): any } };
				new (): any;
			};
			send: { (arg0: { env: NodeJS.ProcessEnv }): void; new (): any };
		};
		statusMessage: string;
	},
) => {
	if (!req.query.apiKey)
		return res
			.status(req.method === 'OPTIONS' ? 200 : 403)
			.contentType('text/xml')
			.send(
				`<Error><Code>AccessDenied</Code><Message>Access to ${
					'https://js.sitetest1.mfdlabs.com' + req.url
				} has been denied.</Message><HostId>${crypto
					.createHash('sha256')
					.update(crypto.randomBytes(1000))
					.digest('base64')}</HostId></Error>`,
			);
	if (req.query.apiKey !== process.env['API_KEY'])
		return res
			.status(req.method === 'OPTIONS' ? 200 : 403)
			.contentType('text/xml')
			.send(
				`<Error><Code>AccessDenied</Code><Message>Access to ${
					'https://js.sitetest1.mfdlabs.com' + req.url
				} has been denied.</Message><HostId>${crypto
					.createHash('sha256')
					.update(crypto.randomBytes(1000))
					.digest('base64')}</HostId></Error>`,
			);
	res.statusMessage = 'Verified';
	res.status(200).send({ env: process.env });
};
