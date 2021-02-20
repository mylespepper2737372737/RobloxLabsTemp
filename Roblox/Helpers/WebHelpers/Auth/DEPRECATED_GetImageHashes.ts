import filestream from 'fs';
import { _dirname } from '../../Constants/Directories';
//this is old
export const GetImageHashes = (): { uri: string; name: string; correct: boolean }[] => {
	return JSON.parse(filestream.readFileSync(_dirname + '\\Default\\Roblox.Captcha.Images.json', { encoding: 'utf-8' }));
};
