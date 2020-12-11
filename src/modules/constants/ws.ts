import mapwss from '../../global/MapWebsockets';
import { _dirname } from '../constants/directories';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
export = async (HttpServer: HttpServer, HttpsServer: HttpsServer, dir: string, apiName: string) => {
	await mapwss(HttpServer, HttpsServer, {
		path: _dirname + dir,
		shouldHandleUpgrade: true,
		apiName: apiName,
		logSetups: true,
	});
};
