export default {
	method: 'ALL',
	func: (req, res) => {
		res.redirect(`https://api.sitetest4.robloxlabs.com${req.url}`);
	},
};
