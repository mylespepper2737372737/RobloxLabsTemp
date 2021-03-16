import { Roblox } from '../../Api';

export namespace BaseURL {
	export function GetBaseURL() {
		return 'http://' + Roblox.Api.Constants.URLS.ROBLOX_WWW;
	}
	export function GetSecureBaseURL() {
		return 'https://' + Roblox.Api.Constants.URLS.ROBLOX_WWW;
	}
	export function ConstructServicePath(subDomain: string, servicePath: string = '/', secure: boolean = true): string {
		return `${(secure ? GetSecureBaseURL() : GetBaseURL()).replace(/www/, subDomain)}${
			!servicePath.startsWith('/') ? `/${servicePath}` : servicePath
		}`;
	}
}
