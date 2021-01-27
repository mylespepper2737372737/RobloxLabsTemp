export default {
	dir: '/asset',
	method: 'all',
	func: async (_req, res) => {
		return res.redirect('http://www.mfdlabs.com/asset');
	},
};
