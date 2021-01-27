// import r from 'request';
import { FASTLOG1, LOGGROUP } from '../../modules/Helpers/util/Log';
// import getKey from '../../modules/Helpers/persistence/get/GetKeyForScope';

LOGGROUP('DataStore');

export default {
	dir: '/gamepersistence/persistence/getV2',
	method: 'all',
	func: (
		req: { query: {}; body: string },
		res: { status: (arg0: number) => { (): any; new (): any; send: { (o: object): void; new (): any } } },
	): void => {
		FASTLOG1('DataStore', JSON.stringify(req.query));
		FASTLOG1('DataStore', JSON.stringify(req.body));
		res.status(200).send({});
	},
};
