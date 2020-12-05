export default {
	UsePages: true,
	PageOpts: {
		etag: false,
		redirect: true,
		lastModified: false,
		setHeaders: (res: { set: (arg0: string, arg1: string) => void }): void => {
			res.set('Hoster', 'Servers.fx');
		},
	},
	UseEndpoints: true,
	UseRouting: true,
};
