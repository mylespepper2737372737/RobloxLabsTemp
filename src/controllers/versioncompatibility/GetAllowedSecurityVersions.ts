export default {
	dir: '/GetAllowedSecurityVersions/',
	method: 'all',
	func: (_req: unknown, res: { send: (arg0: unknown) => void }): void => {
		res.send({ data: ['0.235.0pcplayer'] });
	},
};
