import { Roblox } from '../../Api';

export namespace BaseURL {
	export function GetBaseURL() {
		return 'http://' + Roblox.Api.Constants.URLS.ROBLOX_WWW;
	}
	export function GetSecureBaseURL() {
		return 'https://' + Roblox.Api.Constants.URLS.ROBLOX_WWW;
	}
}
