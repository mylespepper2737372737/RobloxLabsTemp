// import r from 'request';
import { FASTLOG1 } from '../../../Roblox.Helpers/Roblox.Helpers/Roblox.Util/Roblox.Util.FastLog';

export default {
	method: 'all',
	func: (
		req: { query: { toString: () => string }; body: string },
		res: { status: (arg0: number) => { (): any; new (): any; send: { (o: object): void; new (): any } } },
	): void => {
		FASTLOG1('universes', JSON.stringify(req.query), true);
		console.log(req.body);
		res.status(200).send({
			Name: "nsg's place",
			Description: 'FUCK',
			RootPlace: 1,
			StudioAccessToApisAllowed: true,
			CurrentUserHasEditPermissions: true,
			UniverseAvatarType: 'Black',
		});
	},
};
