/*
	FileName: all-time.ts
	Written By: comrade
	File Type: Module
	Description: Points API set point amount.
			
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

// Request example:
/*

# Request
GET /v1/universes/:id/users/:id/ HTTP/1.1




###
 */


import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import { Roblox } from '../../../Api';
import { FASTFLAG, FFlag, FASTLOG1, FLog } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import crypto from  'crypto-js';
const {parseBody} = require('bodyparser.js') // WILL NOT WORK OTHER WAY!
dotenv.config({ path: Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\.env' });
import fs from 'fs';
FASTFLAG('RequireGlobalHTTPS');
function subBuffer(buf: Buffer, p1: number, p2: number) {
    return buf.slice(p1,p2)
}
export default {
	method: 'All',
	func: async (request: Request, response: Response): Promise<Response<unknown> | void> => {
    	if (request.method === 'OPTIONS') return response.status(200).send();
        if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'http') {
            return response.status(403).send({
                errors: [
                    {
                        code: 0,
                        message: 'HTTPS Required.',
                    }
                ],
            })
        }
        var datToUpload;
        if (request.headers['content-type'] === 'application/xml') {
            const dataa = await parseBody(request)
            const keys = Object.keys(dataa)
            let parsingString = ""
            for (const key in keys) {
                parsingString += dataa[key].toString()
            }
            datToUpload=parsingString
        } else if (request.headers['content-type'].search("multipart/form-data") != -1) {
            let bnd1 = request.headers['content-type'].indexOf("boundary=")+"boundary=".length
            let sub = request.headers['content-type'].substr(bnd1)
            
            FASTLOG1(FLog['dmp'],sub, "")
            let parsingString = "";
            const dataa = await parseBody(request)
            const keys = Object.keys(dataa)
            //for (const key in keys) {
                //FASTLOG1(FLog['dmp'], dataa[key], dataa[key]);
            //}
            for (const key in keys) {
                parsingString += dataa[key].toString()
            }
            let poss = parsingString.indexOf("Content-Type")
            let poss1 = parsingString.indexOf("\n", poss)+2
            //let bnd11 = parsingString.indexOf(sub)+sub.length
            let bnd22 = parsingString.lastIndexOf("--"+sub)
            

            datToUpload = subBuffer(dataa, poss1, bnd22-1)
          //  datToUpload = parsingString.substring(poss1)
            FASTLOG1(FLog['dmp'],datToUpload, "")
            /*return response.status(400).send({
                errors: [
                    {
                        code: 0,
                        message: 'If you see this, remind me to fix non-string data, thaanks!',
                    }
                ],
            })*/
        } else {
            const dataa = await parseBody(request)
            const keys = Object.keys(dataa)
            for (const key in keys) {
                FASTLOG1(FLog['dmp'], key, dataa[key]);
            }
            let parsingString = ""
            for (const key in keys) {
                parsingString += dataa[key].toString()
            }
            datToUpload=parsingString
        }
        
        const dat = datToUpload;
        if (!fs.existsSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets")) {
            fs.mkdirSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets")
        }
        let uId = parseInt((request.query as any).assetid);
        let assetJSON = JSON.parse(fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/Asset.json", {encoding: 'utf-8'}))
        let AssetTypeJSONs = JSON.parse(fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/AssetType.json", {encoding: 'utf-8'}))
        if (isNaN(uId)) {
            uId = assetJSON.length + 1;
        } 
        let name = "";
        let description = "";
        let typeID = 0;
        let forsale = true;
        if ((request.query as any).name == null) {
            name = "Asset"
        } else {
            name = (request.query as any).name
        }
        if ((request.query as any).description == null) {
            description = "Asset"
        } else {
            description = (request.query as any).description
        }
        if ((request.query as any).type == null) {
            typeID = 10
        } else {
            if (isNaN(AssetTypeJSONs[(request.query as any).type])) {
                return response.status(400).send();
            } else {
                typeID =AssetTypeJSONs[(request.query as any).type]
            }
        }
        if ((request.query as any).ispublic == null) {
            forsale=true
        } else {
            forsale = (request.query as any).ispublic
        }
        if (assetJSON[uId] != null) {
            let mdhash = crypto.MD5(dat.toString()).toString()
            if (!fs.existsSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets/" + mdhash)) {
                let str = fs.createWriteStream(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets/" + mdhash + ".rbxl")
                str.write(dat)
            }
            //let assetAVs = assetJSON[uId]['AssetVersions']
            let totalAVs = JSON.parse(fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/AVS.json",{encoding: 'utf-8'}))
            let A = totalAVs.length;
            if (isNaN(A)) {
                A = 0
            }
            totalAVs[A]=mdhash
            assetJSON[uId]['AssetVersions'][A] = A
            fs.writeFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/Asset.json", JSON.stringify(assetJSON))
            fs.writeFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory +"/InternalCDN/AVS.json", JSON.stringify(totalAVs))
            return response.status(200).send()
        } else {
            uId = assetJSON.length;
            assetJSON[uId] = {}
            assetJSON[uId]["AssetId"]=uId;
            assetJSON[uId]["Name"]=name;
            assetJSON[uId]["Description"]=description;
            assetJSON[uId]["IsForSale"]=forsale;
            assetJSON[uId]["AssetType"]=typeID;
            let mdhash = crypto.MD5(dat.toString()).toString()
            if (!fs.existsSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets/" + mdhash)) {
                let str = fs.createWriteStream(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets/" + mdhash + ".rbxl")
                str.write(dat)
            }
            assetJSON[uId]["AssetVersions"]=[]

           // let assetAVs = assetJSON[uId]['AssetVersions']
            
            let totalAVs = JSON.parse(fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/AVS.json", {encoding: 'utf-8'}))
            let A = totalAVs.length + 1;
            if (isNaN(A)) {
                A = 0
            }
            totalAVs[A]=mdhash
            FASTLOG1(FLog['dmp'], "asset uploaded", "")
            assetJSON[uId]['AssetVersions'][A.toString()] = mdhash
            fs.writeFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/Asset.json", JSON.stringify(assetJSON))
            fs.writeFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/AVS.json", JSON.stringify(totalAVs))
            return response.status(200).send()
        }

        
        
	},
};
