import { Response } from 'express';
import { FileBaseUrls } from '../../../Common/Constants/Roblox.Common.Constants/FileBaseUrls';
import { StripTheTrailingSlash } from '../../Parsers/Roblox.Web.Parsers/StripTheTrailingSlash';

export class OriginMaster {
	public static Do(origin: string, protocol: string, responseBase: Response) {
		const host = new URL(origin || `http://no-origin.com`);

		if (host.hostname in FileBaseUrls) {
			responseBase.setHeader('Access-Control-Allow-Origin', StripTheTrailingSlash(host.toString()));
			responseBase.setHeader('Access-Control-Allow-Credentials', 'true');
		} else {
			if (!origin) responseBase.setHeader('Access-Control-Allow-Origin', `${protocol}://www.sitetest4.robloxlabs.com`);
		}
	}
}

export class OriginMasterDescriptive {
	public static Do(appHost: string, origin: string, protocol: string, responseBase: Response) {
		const host = new URL(origin || `http://no-origin.com`);

		if (host.hostname in FileBaseUrls) {
			responseBase.setHeader('Access-Control-Allow-Origin', StripTheTrailingSlash(host.toString()));
			responseBase.setHeader('Access-Control-Allow-Credentials', 'true');
		} else {
			if (!origin) responseBase.setHeader('Access-Control-Allow-Origin', `${protocol}://${appHost}`);
		}
	}
}
