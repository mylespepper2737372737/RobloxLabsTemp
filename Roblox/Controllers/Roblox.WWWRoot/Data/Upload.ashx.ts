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
/* begin codde from @frameworkless/bodyparser*/
const { parse: parseFormadata } = require('querystring')
const parseContent = rawType => {
  if (!rawType) return raw => raw
  else if (rawType.indexOf('json') > -1) return JSON.parse
  else if (rawType.indexOf('x-www-form-urlencoded') > -1) return raw => ({ ...parseFormadata(raw) })
  else if (rawType.indexOf('multipart') > -1) return raw => raw
  else return raw => raw
}
const getRequestBody = (request) => new Promise((resolve, reject) => {
  const contentType = request.headers['content-type']
  //const allowedFileTypes = fileTypes || ALLOWED_ATTACHMENT_MIMES
  const parser = parseContent(contentType)

  if (parser !== null) {
    let formData

    request.on('data', data => {
      if (!formData) formData = Buffer.from(data)
      else formData = Buffer.concat([ formData, data ])
    })

    request.on('error', reject)

    request.on('end', () => {
      const parsedData = formData
      return resolve(parsedData)
    })
  } else {
    
  }
})
/* end code*/

import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import { Roblox } from '../../../Api';
import { FASTFLAG, FFlag, FASTLOG1, FLog } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import crypto from  'crypto-js';
dotenv.config({ path: Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\.env' });
import fs from 'fs';
FASTFLAG('RequireGlobalHTTPS');
function subBuffer(buf: Buffer, p1: number, p2: number) {
  return buf.slice(p1,p2)
}
import { AssetsService } from '../../../ApiServices/Roblox.Assets.Service/Roblox.Assets.Service/AssetsService';

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
            const dataa = await getRequestBody(request)
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
           // let parsingString = "";
            const dataa = await getRequestBody(request)

            //let parsingString = (dataa as Buffer).toString('ascii')
           // const keys = Object.keys(dataa)
           // for (const key in keys) {
             //  FASTLOG1(FLog['dmp'], dataa[key].toString(), dataa[key].toString());
           // }
           // for (const key in keys) {
           //    parsingString += dataa[key].toString()
         // }
          /*  if (fs.existsSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/tmp/")) {
                fs.writeFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory +"/Manifest/tmp/asset", (dataa as Buffer))
            }
            let e = fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory +"/Manifest/tmp/asset")
            */
            let parsingString=(dataa as Buffer).toString('ascii') // this is legit nonsense. 
            let poss = parsingString.indexOf("Content-Type")
            let poss1 = parsingString.indexOf("\n", poss)+2
            FASTLOG1(FLog['dmp'],poss.toString(),"")
            FASTLOG1(FLog['dmp'],poss1.toString(),"")
            //let bnd11 = parsingString.indexOf(sub)+sub.length
            let bnd22 = parsingString.lastIndexOf(sub)
            FASTLOG1(FLog['dmp'],bnd22.toString(),"")
            let bnd33 = parsingString.substring(bnd22)
            FASTLOG1(FLog['dmp'],bnd33.toString(),"")
            let eeee = (dataa as Buffer).length
            FASTLOG1(FLog['dmp'],sub.length.toString(),"")
            FASTLOG1(FLog['dmp'],eeee.toString(),"")
            //datToUpload = subBuffer(dataa as Buffer, poss1+1, eeee) // totally reliable!
            //let fc = (parsingString.toString()).lastIndexOf(sub)
            datToUpload = subBuffer(dataa as Buffer, poss1+1, bnd22-4)
            //datToUpload = parsingString.substring(poss1+1, bnd22-4) // i hope this wrks. :(
            FASTLOG1(FLog['dmp'],poss1.toString(), "")
            FASTLOG1(FLog['dmp'],eeee.toString(), "")
            /*return response.status(400).send({
                errors: [
                    {
                        code: 0,
                        message: 'If you see this, remind me to fix non-string data, thaanks!',
                    }
                ],
            })*/
        } else {
            const dataa = await getRequestBody(request)
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
        let props = {}
        
        if ((request.query as any).name == null) {
            props["Name"] = "Asset"
        } else {
            props["Name"] = (request.query as any).name
        }
        if ((request.query as any).description == null) {
            props["Description"] = "Asset"
        } else {
            props["Description"] = (request.query as any).description
        }
        if ((request.query as any).type == null) {
            props["AssetType"] = 10
        } else {
            if (isNaN(AssetTypeJSONs[(request.query as any).type])) {
                return response.status(400).send();
            } else {
                props["AssetType"] =AssetTypeJSONs[(request.query as any).type]
            }
        }
        if ((request.query as any).ispublic == null) {
            props["IsForSale"]=true
        } else {
            props["IsForSale"] = (request.query as any).ispublic
        }
        AssetsService.uploadAsset(dat, uId, props["AssetType"], props, 1111)// 1111 is temporary ID.
        return response.status(200).send()
        
        
	},
};
