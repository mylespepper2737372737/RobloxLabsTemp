// import r from 'request';
import { FASTLOG1, LOGGROUP } from '../../modules/Helpers/util/Log';

LOGGROUP('dmp');

export default {
	dir: '/Error/Dmp.ashx/',
	method: 'all',
	func: (
		req: { query: { toString: () => string }; body: string },
		res: { status: (arg0: number) => { (): any; new (): any; send: { (): void; new (): any } } },
	): void => {
		FASTLOG1('dmp', JSON.stringify(req.query));
		FASTLOG1('dmp', JSON.stringify(req.body));
		res.status(200).send();
	},
};
