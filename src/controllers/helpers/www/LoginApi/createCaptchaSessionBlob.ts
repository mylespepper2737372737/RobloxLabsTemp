import crypto from 'crypto';
export = (ip: string) => {
	const header = crypto
		.createHash('sha256')
		.update(JSON.stringify({ alg: 'sha512', type: 'mfdJWT' }))
		.digest('base64')
		.split('/')
		.join('')
		.split('+')
		.join('')
		.split('=')
		.join('');
	const body = crypto
		.createHash('sha256')
		.update(JSON.stringify({ sub: ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) }))
		.digest('base64')
		.split('/')
		.join('')
		.split('+')
		.join('')
		.split('=')
		.join('');
	const signature = crypto
		.createHash('sha512')
		.update(header + body)
		.digest('base64')
		.split('/')
		.join('')
		.split('+')
		.join('')
		.split('=')
		.join('');
	const captchaBLOB = `${header}\_${body}\_${signature}`;
	return captchaBLOB;
};
