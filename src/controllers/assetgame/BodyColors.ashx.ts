import fs from 'fs';
import { _dirname } from '../../modules/constants/directories';
export default {
	dir: '/Asset/BodyColors.ashx',
	method: 'all',
	func: async (_req, res) => {
		const str = fs.readFileSync(_dirname + '\\rbx\\BodyColors.xml', 'utf-8');
		return res.send(str);
	},
};
