// import r from 'request';
import { FASTLOG1 } from '../../modules/Helpers/Log';

export default {
	dir: '/Error/Dmp.ashx/',
	method: 'all',
	func: (
		req: { query: { toString: () => string } },
		res: { status: (arg0: number) => { (): any; new (): any; send: { (): void; new (): any } } },
	): void => {
		FASTLOG1('dmp', req.query.toString());
		res.status(200).send();
	},
};
