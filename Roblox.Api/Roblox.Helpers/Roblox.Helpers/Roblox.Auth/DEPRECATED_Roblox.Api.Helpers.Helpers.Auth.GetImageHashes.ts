import filestream from 'fs';
import { _dirname } from '../../Roblox.Constants/Roblox.Directories';
//this is old
export const GetImageHashes = (): { uri: string; name: string; correct: boolean }[] => {
	return JSON.parse(filestream.readFileSync(_dirname + '\\Roblox.Global\\Roblox.Captcha.Images.json', { encoding: 'utf-8' }));
};
