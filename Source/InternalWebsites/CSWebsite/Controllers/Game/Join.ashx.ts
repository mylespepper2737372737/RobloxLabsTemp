import { Request, Response } from 'express';
import { DFString, DYNAMIC_FASTSTRINGVARIABLE } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { GetSignedData, SendSignedResponse } from '../../../../Assemblies/Data/HashMaps/Roblox.Data.HashMaps/SignData';
import { DateTimeConverter } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Converters/DateTimeConverter';

DYNAMIC_FASTSTRINGVARIABLE('CharacterAppearanceUrl', 'http://assetgame.sitetest4.robloxlabs.com/Asset/CharacterFetch.ashx');

export default {
	method: 'all',
	func: (request: Request, response: Response): void => {
		const date = DateTimeConverter.DateToLocaleDate(new Date(Date.now()));
		const txt = {
			ClientPort: 0,
			MachineAddress: request.query['IpAddress'] || '127.0.0.1',
			ServerPort: parseInt(<string>request.query['port']) || 53640,
			PingUrl: '',
			PingInterval: 120,
			UserName: request.query['username'] || 'Default',
			SeleniumTestMode: false,
			UserId: parseInt(<string>request.query['userId']) || 1,
			RobloxLocale: 'en_us',
			GameLocale: 'en_us',
			SuperSafeChat: false,
			CharacterAppearance: DFString('CharacterAppearanceUrl'),
			ClientTicket: `${date};${GetSignedData(
				`${parseInt(<string>request.query['userId']) || 1}\n${request.query['username'] || 'Default'}\n${DFString(
					'CharacterAppearanceUrl',
				)}\n00000000-0000-0000-0000-000000000000\n${date}`,
			)};${GetSignedData(`${parseInt(<string>request.query['userId']) || 1}\n00000000-0000-0000-0000-000000000000\n${date}`)}`,
			GameId: '00000000-0000-0000-0000-000000000000',
			PlaceId: parseInt(<string>request.query['placeId']) || 1,
			MeasurementUrl: '',
			WaitingForCharacterGuid: '00000000-0000-0000-0000-000000000000',
			BaseUrl: 'http://www.sitetest4.robloxlabs.com/',
			ChatStyle: 'Classic',
			VendorId: 0,
			ScreenShotInfo: '',
			VideoInfo: '',
			CreatorId: 0,
			CreatorTypeEnum: 'User',
			MembershipType: 'OutrageousBuildersClub',
			AccountAge: 0,
			CookieStoreFirstTimePlayKey: 'rbx_evt_ftp',
			CookieStoreFiveMinutePlayKey: 'rbx_evt_fmp',
			CookieStoreEnabled: true,
			IsRobloxPlace: request.query['IsRobloxPlace'] ? true : false,
			GenerateTeleportJoin: false,
			IsUnknownOrUnder13: false,
			GameChatType: 'NoOne',
			SessionId: '',
			AnalyticsSessionId: '00000000-0000-0000-0000-000000000000',
			DataCenterId: 0,
			UniverseId: 0,
			BrowserTrackerId: 0,
			UsePortraitMode: false,
			characterAppearanceId: 0,
			CountryCode: 'US',
		};
		SendSignedResponse(JSON.stringify(txt), response);
	},
};
