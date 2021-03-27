import { RobloxLegacy } from '../../Api';

export namespace BaseURL {
	export function GetBaseURL() {
		return 'http://' + RobloxLegacy.Api.Constants.URLS.RobloxWebsite;
	}
	export function GetSecureBaseURL() {
		return 'https://' + RobloxLegacy.Api.Constants.URLS.RobloxWebsite;
	}
	export function ConstructServicePath(subDomain: string, servicePath: string = '/', secure: boolean = true): string {
		return `${(secure ? GetSecureBaseURL() : GetBaseURL()).replace(/www/, subDomain)}${
			!servicePath.startsWith('/') ? `/${servicePath}` : servicePath
		}`;
	}
}
