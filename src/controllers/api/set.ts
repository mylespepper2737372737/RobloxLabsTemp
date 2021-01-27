// import r from 'request';
import { FASTLOG1, LOGGROUP } from '../../modules/Helpers/util/Log';

LOGGROUP('dmp');

export default {
	dir: '/gamepersistence/persistence/set',
	method: 'all',
	func: (
		req: { query: { toString: () => string }; body: string },
		res: { status: (arg0: number) => { (): any; new (): any; send: { (o: object): void; new (): any } } },
	): void => {
		FASTLOG1('dmp', req.query.toString());
		console.log(req.body);
		res.status(200).send({
			data: '123',
		});
	},
};
