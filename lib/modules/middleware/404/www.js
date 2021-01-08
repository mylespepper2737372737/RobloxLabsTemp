"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => {
    return res.redirect(`https://www.sitetest1.mfdlabs.com/Error.ashx?code=404&message=https://www.sitetest1.mfdlabs.com${escape(req.url)
        .split('?')
        .shift()} NotFound&redirect=https://www.sitetest1.mfdlabs.com${escape(req.url)
        .split('?')
        .shift()};http://www.sitetest1.mfdlabs.com/Error.ashx`);
};
