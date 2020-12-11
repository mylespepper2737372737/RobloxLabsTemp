/*
	FileName: serverv2.ts
	Written By: Nikita Nicholaevich Pedko, - nikita-mfd - Server Vulnerabilities.
				Ivan Ivanovich Gregrovnich, - ivan-mfd - Server Managment.
				Aleksej Pushnik Grasnich, - aleksej-g-mfd - Client Types.
				Tomska Arndold Vandrej, - tomska-mfd - Server Modifications - Combatibility checks for /analytics/{v1|v2|v3}.
				Tomska Poshkiom Lanska, tomska-l-mfd - Client Response Linting - N/A.
				Aleksej Brovim Pushnak, aleksej-mfd - Server Enhancements - /{analytics|abtesting}/ perfomance perks.
				Ishka Alemdak Rejor, ishka-mfd - Client Compatibility Checks, ClientModels Check.
				Jack Daniels Alan, j-alan-mfd - Project Managment, Name(s) of classes and methods etc.
				Alanska Ivanski Vosproshchniki. - alanska-v-mfd - Legal Managment, Licenses, Rights.
	File Type: Script
	Description: The 2nd version of mfdlabs.com (uses a mfdlabs domain). 
					This one is for testing new endpoints and features (such as controllers).
			
	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

	TODO Push this as it's own project.
	NOTICE This Application Programming Interface will be hosted on both https://*.sitetest1.mfdlabs.com:443 and http://*.sitetest1.mfdlabs.com:80.
	DEPRECATED DO NOT USE OutgoingMessage.prototype._headers

	***

	Copyright 2015-2020 MFD

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

import mapwss from './modules/constants/ws';
import mapssl from './modules/constants/ssl';
import mapconfig from './modules/configs/mapconfig';
import urls from './modules/constants/urls';
import defaultMiddleware from './modules/middleware/init_middleware';
import { www404, api404, staticcdn404, js404, css404, images404, setup404, ecs404 } from './modules/middleware/404';
import Startup from './library/startup';
import express from 'express';
import { _dirname } from './modules/constants/directories';

(async () => {
	const www = express();
	const staticcdn = express();
	const js = express();
	const css = express();
	const images = express();
	const setup = express();
	const api = express();
	const ephemeralcounters = express();

	www.use(defaultMiddleware);
	staticcdn.use(defaultMiddleware);
	js.use(defaultMiddleware);
	css.use(defaultMiddleware);
	images.use(defaultMiddleware);
	setup.use(defaultMiddleware);
	api.use(defaultMiddleware);
	ephemeralcounters.use(defaultMiddleware);

	await Startup.Configure(mapconfig(staticcdn, '\\static', '\\lib\\controllers\\static', urls['staticcdn']));
	await Startup.Configure(mapconfig(js, '\\lib\\js', '\\lib\\controllers\\js', urls['js']));
	await Startup.Configure(mapconfig(css, '\\css', '\\lib\\controllers\\css', urls['css']));
	await Startup.Configure(mapconfig(images, '\\images', '\\lib\\controllers\\images', urls['images']));
	await Startup.Configure(mapconfig(api, '\\api', '\\lib\\controllers\\api', urls['api']));
	await Startup.Configure(mapconfig(setup, '\\setup', '\\lib\\controllers\\setup', urls['setup']));
	await Startup.Configure(mapconfig(www, '\\www', '\\lib\\controllers\\www', urls['www'], true));
	await Startup.Configure(mapconfig(ephemeralcounters, '\\ecs', '\\lib\\controllers\\ecs', urls['ephemeralcounters']));

	api.use(api404);
	staticcdn.use(staticcdn404);
	js.use(js404);
	css.use(css404);
	images.use(images404);
	setup.use(setup404);
	www.use(www404);
	ephemeralcounters.use(ecs404);

	(async () => {
		try {
			mapssl(images, urls['images']);
			mapssl(www, urls['www']);
			const [apiHttp, apiHttps] = mapssl(api, urls['api']);
			mapssl(staticcdn, urls['staticcdn']);
			mapssl(js, urls['js']);
			mapssl(css, urls['css']);
			mapssl(setup, urls['setup']);
			mapssl(ephemeralcounters, urls['ephemeralcounters']);
			mapwss(apiHttp, apiHttps, '\\lib\\sockets\\api', urls['api']);
		} catch (e) {
			throw new Error(e);
		}
	})();
})();
