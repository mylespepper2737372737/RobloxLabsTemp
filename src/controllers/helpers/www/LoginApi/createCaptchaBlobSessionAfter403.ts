import filestream from 'fs';
import { Response } from 'express-serve-static-core';
import { _dirname } from '../../../../modules/constants/directories';
export = (response: Response, captchaBLOB: string, ip: string) => {
	filestream.writeFileSync(
		_dirname + `\\manifest\\sessions\\${captchaBLOB}.json`,
		JSON.stringify({ sub: ip, iat: Math.floor(new Date(Date.now()).getTime() / 1000) }),
		{ encoding: 'ascii' },
	);
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
