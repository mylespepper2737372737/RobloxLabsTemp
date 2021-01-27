import { GetSettings, Group } from '../../modules/Helpers/util/GetSettings';

// -a "http://api.mfdlabs.com/Login/Negotiate.ashx" -t "bruh" -j "http://assetgame.mfdlabs.com/Game/PlaceLauncher.ashx"
export default {
	dir: '/Setting/QuietGet/:group/',
	method: 'all',
	func: (_req: unknown, res: { send: (arg0: { [k: string]: unknown }) => void }): void => {
		const s = GetSettings(Group.All, 'Client');
		const settings = new Map<string, Object>(Object.entries(s));
		const obj: { [k: string]: unknown } = {};
		settings.forEach((v, k) => {
			if (k === 'FFlag') {
				const fflag = new Map<string, boolean>(Object.entries(s[k]));
				fflag.forEach((v1, k1) => {
					obj['FFlag' + k1] = v1 === true ? 'True' : 'False';
				});
			} else if (k === 'DFFlag') {
				const dfflag = new Map<string, boolean>(Object.entries(s[k]));
				dfflag.forEach((v1, k1) => {
					obj['DFFlag' + k1] = v1 === true ? 'True' : 'False';
				});
			} else if (k === 'SFFlag') {
				const sfflag = new Map<string, boolean>(Object.entries(s[k]));
				sfflag.forEach((v1, k1) => {
					obj['SFFlag' + k1] = v1 === true ? 'True' : 'False';
				});
			} else if (k === 'FLog') {
				const flog = new Map<string, boolean>(Object.entries(s[k]));
				flog.forEach((v1, k1) => {
					obj['FLog' + k1] = v1.toString();
				});
			} else if (k === 'FInt') {
				const fint = new Map<string, boolean>(Object.entries(s[k]));
				fint.forEach((v1, k1) => {
					obj['FInt' + k1] = v1.toString();
				});
			} else if (k === 'DFInt') {
				const dfint = new Map<string, boolean>(Object.entries(s[k]));
				dfint.forEach((v1, k1) => {
					obj['DFInt' + k1] = v1.toString();
				});
			} else if (k === 'FString') {
				const fstring = new Map<string, boolean>(Object.entries(s[k]));
				fstring.forEach((v1, k1) => {
					obj['FString' + k1] = v1;
				});
			} else if (k === 'DFString') {
				const dfstring = new Map<string, boolean>(Object.entries(s[k]));
				dfstring.forEach((v1, k1) => {
					obj['DFString' + k1] = v1;
				});
			} else if (k === 'FVariable') {
				const fvariable = new Map<string, boolean>(Object.entries(s[k]));
				fvariable.forEach((v1, k1) => {
					obj[k1] = v1;
				});
			} else {
				const v2 = new Map<string, boolean>(Object.entries(s[k]));
				v2.forEach((v1, k1) => {
					obj[k1] = v1;
				});
			}
		});
		res.send(obj);
	},
};
