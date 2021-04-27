import Urls from '../../Constants/Roblox.Common.Constants/Urls';

export namespace BaseURL {
	export function GetBaseURL() {
		return 'http://' + Urls.RobloxWebsite;
	}
	export function GetSecureBaseURL() {
		return 'https://' + Urls.RobloxWebsite;
	}
	export function ConstructServicePath(subDomain: string, servicePath: string = '/', secure: boolean = true): string {
		return `${(secure ? GetSecureBaseURL() : GetBaseURL()).replace(/www/, subDomain)}${
			!servicePath.startsWith('/') ? `/${servicePath}` : servicePath
		}`;
	}
}
