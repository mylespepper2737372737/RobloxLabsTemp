import { SanitizeData } from '../../Web/Parsers/Roblox.Web.Parsers/SanitizeData';

export class UserAgentHelper {
	public static CheckIsUserAgentRoblox(userAgent: string): bool {
		if (!userAgent) return false;
		userAgent = SanitizeData(userAgent);

		return userAgent.toLowerCase().includes('roblox');
	}

	public static CheckIfStringIsValidUrl(str: string): bool {
		if (!str) return false;
		str = SanitizeData(str);

		return (
			str
				.toLowerCase()
				.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/) !== null
		);
	}
}
