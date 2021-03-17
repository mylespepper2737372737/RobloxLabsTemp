/*
	FileName: _P-group.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://clientsettings.api.sitetest4.robloxlabs.com/Setting/QuietGet/:group/, return client settings for the given group

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

import { RobloxLegacy } from '../../../../Api';

export default {
	method: 'all',
	func: (_req: unknown, res: { send: (arg0: { [k: string]: unknown }) => void }): void => {
		const s = RobloxLegacy.Api.Helpers.Util.ClientSettings.GetAllSettings('Client');
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
			} else if (k === 'FPFilter') {
				const fpfilter = new Map<string, { Value: unknown; PlaceIds: number[] }>(Object.entries(s[k]));
				fpfilter.forEach((v1, k1) => {
					const kk = 'FStringPlaceFilter_' + k1;
					if (typeof v1.Value === 'boolean') {
						let v = v1.Value ? 'True;' : 'False;';
						let it = 0;
						v1.PlaceIds.forEach((vvx) => {
							it++;
							v += vvx.toString() + (it !== v1.PlaceIds.length ? ';' : '');
						});
						obj[kk] = v;
					} else if (typeof v1.Value === 'number') {
						let v = v1.Value.toString() + ';';
						let it = 0;
						v1.PlaceIds.forEach((vvx) => {
							it++;
							v += vvx.toString() + (it !== v1.PlaceIds.length ? ';' : '');
						});
						obj[kk] = v;
					} else {
						let v = v1.Value + ';';
						let it = 0;
						v1.PlaceIds.forEach((vvx) => {
							it++;
							v += vvx.toString() + (it !== v1.PlaceIds.length ? ';' : '');
						});
						obj[kk] = v;
					}
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
