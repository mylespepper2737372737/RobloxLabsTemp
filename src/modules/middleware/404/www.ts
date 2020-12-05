export default (req: { url: string }, res: { redirect: (arg0: string) => any }) => {
	return res.redirect(
		`https://www.sitetest1.mfdlabs.com/Error.ashx?code=404&message=https://www.sitetest1.mfdlabs.com${req.url
			.split('?')
			.shift()} NotFound&redirect=https://www.sitetest1.mfdlabs.com${req.url
			.split('?')
			.shift()};http://www.sitetest1.mfdlabs.com/Error.ashx`,
	);
};
