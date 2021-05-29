import filestream from 'fs';
import { __baseDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';
//this is old
export const GetImageHashes = (): { uri: string; name: string; correct: boolean }[] => {
	return JSON.parse(filestream.readFileSync(__baseDirName + '/Default/Roblox.Captcha.Images.json', { encoding: 'utf-8' }));
};
