// import r from 'request';
import { FASTLOG1, LOGGROUP } from '../../modules/Helpers/util/Log';

LOGGROUP('dmp');

export default {
	dir: '/universes/get-info',
	method: 'all',
	func: (
		req: { query: { toString: () => string }; body: string },
		res: { status: (arg0: number) => { (): any; new (): any; send: { (o: object): void; new (): any } } },
	): void => {
		FASTLOG1('dmp', req.query.toString());
		console.log(req.body);
		res.status(200).send({
			Name: "nsg's place",
			Description: 'FUCK',
			RootPlace: 1,
			StudioAccessToApisAllowed: true,
			CurrentUserHasEditPermissions: true,
			UniverseAvatarType: 'PlayerChoice',
		});
	},
};
