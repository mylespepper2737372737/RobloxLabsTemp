import crypto from 'crypto';
import headers from '../constants/headers';
import { RequestHandler } from 'express-serve-static-core';
export = ((
	req: { headers: { cookie: string }; hostname: string; method: string; header: (arg0: string) => any },
	res: {
		cookie: (arg0: string, arg1: string, arg2: { maxAge: number; domain: string }) => void;
		header: (arg0: string | typeof headers, arg1?: string) => void;
	},
	next: () => void,
) => {
	if (!req.headers.cookie || (!req.headers.cookie.match(/__tid/) && req.hostname === 'www.sitetest1.mfdlabs.com'))
		res.cookie('__tid', crypto.createHash('sha256').update(crypto.randomBytes(1000)).digest('hex'), {
			maxAge: 3.154e14,
			domain: '.sitetest1.mfdlabs.com',
		});
	if (req.method !== 'GET') {
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.header('Access-Control-Allow-Origin', req.header('Origin') || req.header('Host'));
		res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, OPTIONS');
		res.header('Access-Control-Allow-Credentials', 'true');
	}
	res.header(headers);
	next();
}) as RequestHandler;
