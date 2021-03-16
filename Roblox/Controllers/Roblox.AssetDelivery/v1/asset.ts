/*
	FileName: asset.ts
	Written By: comrade
	File Type: Module
	Description: Asset downloader.
			
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

import { NextFunction } from 'express';
//import { AssetRequestProcessor } from '../../../Web/Assets/Roblox.Web.Assets/AssetRequestProcessor';
import {Roblox} from "../../../Api"
import fs from 'fs';
export default {
	method: 'all',
	func: async (_req, res, next: NextFunction) => {
		//const [success, uri] = await AssetRequestProcessor.GetUri('', {}, false, false, 'HASHSHSHHSs');
		/*if (!success) {
			// res.status(500).send({ errors: [{ code: 500, message: uri }] });
			return next(<string>uri);
		} use temp asset instead, will implement full thing when I get source code or more documentation.*/
		let mainassets = JSON.parse(fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/Asset.json", {encoding: 'utf-8'}))
		if (!isNaN(parseInt(_req.query.id as any))) {
			if (mainassets[parseInt((_req.query.id as any))-1] != null) {
				let aset = mainassets[parseInt(_req.query.id as any)-1]
				let massetvers = JSON.parse(fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/AVS.json", {encoding: 'utf-8'}))
				let av = aset["AssetVersions"][aset["AssetVersions"].length-1]
			//	let hash = av // TODO: Relink assetversionids, later.
				let hash = massetvers[av] 
				if (fs.existsSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets/" + hash)) {
					const datStream = fs.createReadStream(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets/" + hash)
					datStream.pipe(res)
				//	let e = fs.readFileSync().toString()
				//return res.status(200).send(e)
				} else {
					return res.status(404).send()
				}
			} else {
				return res.status(403).send()
			}
		} else {
		return res.status(500).send();
		}
	},
};
