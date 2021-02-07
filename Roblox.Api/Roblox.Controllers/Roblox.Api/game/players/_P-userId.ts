export default {
	method: 'all',
	func: (
		req: { query: { toString: () => string } },
		res: { status: (arg0: number) => { (): any; new (): any; send: { (arg0: { ChatFilter: string }): void; new (): any } } },
	): void => {
		res.status(200).send({
			ChatFilter: 'whitelist',
		});
	},
};
