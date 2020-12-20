import filestream from 'fs';
import { Response } from 'express-serve-static-core';
import { _dirname } from '../../../../modules/constants/directories';
export = (response: Response, captchaBLOB: string, ip: string) => {
	const dataToRefer = { sub: ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) };
	filestream.writeFileSync(_dirname + `\\manifest\\sessions\\${captchaBLOB}.json`, JSON.stringify(dataToRefer), { encoding: 'ascii' });
	setTimeout(() => {
		try {
			filestream.unlinkSync(_dirname + `\\manifest\\sessions\\${captchaBLOB}.json`);
		} catch {
			console.warn('The session is already clear');
		}
	}, 60000);
	response.statusMessage = 'Captcha failed';
	return response.status(403).header({ expires: 60000 }).send({
		success: false,
		message: 'You need to pass the robot test first.',
		blob: captchaBLOB,
		expires: 60000,
	});
};
