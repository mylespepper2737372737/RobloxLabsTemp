//import dotenv from 'dotenv';
import { Roblox } from '../../../Api';
import {FASTLOG1, FLog } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import crypto from  'crypto-js';
import fs from 'fs';

export namespace AssetsService {

    export function uploadAsset(asset: Buffer, ID: number, typeID: number, props: string, agent: number) {
        // if it got to this point we'll just assume it passed the authentication checks.
        const dat = asset;
        if (!fs.existsSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets")) {
            fs.mkdirSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets")
        }
        let uId = ID
        let assetJSON = JSON.parse(fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/Asset.json", {encoding: 'utf-8'}))
        //let AssetTypeJSONs = JSON.parse(fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/AssetType.json", {encoding: 'utf-8'}))
        if (isNaN(uId)) {
            uId = assetJSON.length + 1;
        } 
        //let name = "";
        //let description = "";
        //let forsale = true;
        let assetDefaults = {};
        assetDefaults["Name"]="Asset"
        assetDefaults["Description"]="Asset";
        assetDefaults["IsForSale"]=true;
        assetDefaults["AssetType"]=10;
        
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
        } else {
            uId = assetJSON.length;
            assetJSON[uId] = {}
            /*assetJSON[uId]["AssetId"]=uId;
            assetJSON[uId]["Name"]=name;
            assetJSON[uId]["Description"]=description;
            assetJSON[uId]["IsForSale"]=forsale;
            assetJSON[uId]["AssetType"]=typeID;
            assetJSON[uId]["CreatorId"]=agent;*/
            let properties = JSON.parse(props)
            FASTLOG1(FLog['dmp'],props,"")
            Object.entries(properties).forEach(([key, value]) => {
                assetJSON[uId][key]=value
             });
           // for (const key in Object.keys(properties)) {
           //     assetJSON[uId][key] = properties[key]
             //   FASTLOG1(FLog['dmp'], key, "")
                //FASTLOG1(FLog['dmp'], properties[key],"")
            //}
            assetJSON[uId]["CreatorId"]=agent;
            let mdhash = crypto.MD5(dat.toString()).toString()
            if (!fs.existsSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets/" + mdhash)) {
                let str = fs.createWriteStream(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/Manifest/assets/" + mdhash)
                str.write(dat)
            }
            assetJSON[uId]["AssetVersions"]=[]

           // let assetAVs = assetJSON[uId]['AssetVersions']
            
            let totalAVs = JSON.parse(fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/AVS.json", {encoding: 'utf-8'}))
            let A = assetJSON[uId]['AssetVersions'].length + 1;
            if (isNaN(A)) {
                A = 0
            }
            let E = totalAVs.length + 1;
            if (isNaN(E)) {
                E = 1
            }
            totalAVs[E]=mdhash
            FASTLOG1(FLog['dmp'], "asset uploaded", "")
            assetJSON[uId]['AssetVersions'].push(E.toString())
            fs.writeFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/Asset.json", JSON.stringify(assetJSON))
            fs.writeFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + "/InternalCDN/AVS.json", JSON.stringify(totalAVs))
        }
    }

}
