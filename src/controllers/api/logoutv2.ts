import filestream from 'fs';
const _dirname = 'C:\\Users\\Padraig\\Git\\Mfd\\Web\\mfdlabs.com';
export default {
	dir: '/auth/v2/logout',
	method: 'ALL',
	func: (
		request: { method: string; protocol: string; cookies: { authId: string }; query: { cookie: string } },
		response: {
			status: (
				arg0: number,
			) => {
				(): any;
				new (): any;
				send: { (arg0: { code: number; message: string; userfacingmessage?: string }): any; new (): any };
			};
			clearCookie: (arg0: string, arg1: { domain: string; path: string }) => { send: (body: any) => void };
		},
	) => {
		if (request.method === 'OPTIONS') return response.status(200).send({ code: 200, message: '' });
		if (request.protocol !== 'https') return response.status(403).send({ code: 403, message: 'HTTPS Required.' });
		if (request.method !== 'POST')
			return response.status(405).send({
				code: 405,
				message: `The requested resource does not support http method '${request.method}.'`,
				userfacingmessage: 'Something went wrong.',
			});
		if (request.protocol !== 'https') return response.status(403).send({ code: 403, message: 'HTTPS Required.' });
		const data = JSON.parse(filestream.readFileSync(_dirname + '/lib/env.json', { encoding: 'utf-8' }));
		const authId: string =
			request.cookies.authId ||
			(request.query.cookie as string)
				.split('; ')
				.find((authid) => authid.startsWith('authId'))
				.split('=')[1];
		if (!authId)
			return response.status(401).send({
				code: 401,
				message: 'Authorization has been denied for this request.',
				userfacingmessage: 'You are not currently logged in.',
			});
		let userId = '';
		for (const i in data['userIds']) {
			if (data['userIds'][i].sessionId !== authId)
				return response.status(404).send({
					code: 404,
					message: 'User not found.',
					userfacingmessage: 'You sent invalid credentials.',
				});
			else userId = i;
		}

		data['userIds'][userId].loggedOn = false;
		data['userIds'][userId].sessionId = '';
		filestream.writeFile(_dirname + '/lib/env.json', JSON.stringify(data), () =>
			response.clearCookie('authId', { domain: '.sitetest1.mfdlabs.com', path: '/' }).send({ success: true, message: 'Success' }),
		);
	},
};
