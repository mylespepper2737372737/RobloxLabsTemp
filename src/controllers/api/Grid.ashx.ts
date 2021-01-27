// import r from 'request';
import { FASTLOG1, LOGGROUP } from '../../modules/Helpers/util/Log';

LOGGROUP('grid');

export default {
	dir: '/Error/Grid.ashx/',
	method: 'all',
	func: (
		req: { query: { toString: () => string }; body: string },
		res: { status: (arg0: number) => { (): any; new (): any; send: { (): void; new (): any } } },
	): void => {
		FASTLOG1('grid', JSON.stringify(req.query));
		FASTLOG1('grid', JSON.stringify(req.body));
		res.status(200).send();
	},
};
