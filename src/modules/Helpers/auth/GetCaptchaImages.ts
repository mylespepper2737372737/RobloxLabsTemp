import filestream from 'fs';
import { _dirname } from '../../constants/directories';

export const GetCaptchaImages = (): { uri: string; name: string; correct: boolean }[] => {
	return JSON.parse(filestream.readFileSync(_dirname + '\\global\\captchaimages.json', { encoding: 'utf-8' }));
};
