import crypto from 'crypto';
import fs from 'fs';
import { _dirname } from '../../modules/constants/directories';
import { GetSettings, Group } from '../../modules/Helpers/util/GetSettings';

export default {
	dir: '/Game/Join.ashx',
	method: 'all',
	func: (_req, res: { send: (arg0: string) => void }): void => {
		const DFString = GetSettings(Group.DFString, 'Web');
		const txt = {
			ClientPort: 0,
			MachineAddress: '127.0.0.1',
			ServerPort: 53640,
			PingUrl: '',
			PingInterval: 120,
			UserName: _req.query['username'] || 'Default',
			SeleniumTestMode: false,
			UserId: parseInt(_req.query['userId']) || 1,
			RobloxLocale: 'en_us',
			GameLocale: 'en_us',
			SuperSafeChat: false,
			CharacterAppearance: DFString['CharacterAppearanceUrl'],
			ClientTicket: '',
			NewClientTicket: '',
			GameId: '00000000-0000-0000-0000-000000000000',
			PlaceId: parseInt(_req.query['placeId']) || 1,
			MeasurementUrl: '',
			WaitingForCharacterGuid: '00000000-0000-0000-0000-000000000000',
			BaseUrl: 'http://www.mfdlabs.com/',
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
			IsRobloxPlace: _req.query['IsRobloxPlace'] ? true : false,
			GenerateTeleportJoin: false,
			IsUnknownOrUnder13: false,
			GameChatType: 'NoOne',
			SessionId:
				'{"SessionId":"00000000-0000-0000-0000-000000000000","GameId":"00000000-0000-0000-0000-000000000000","PlaceId":0,"ClientIpAddress":"172.68.37.14","PlatformTypeId":5,"SessionStarted":"2013-12-4T4:20:00.0000000Z","BrowserTrackerId":0,"PartyId":null,"Age":null,"Latitude":null,"Longitude":null,"CountryId":1,"PolicyCountryId":null,"LanguageId":null,"BlockedPlayerIds":null,"JoinType":"Unknown","PlaySessionFlags":0}',
			AnalyticsSessionId: '00000000-0000-0000-0000-000000000000',
			DataCenterId: 0,
			UniverseId: 0,
			BrowserTrackerId: 0,
			UsePortraitMode: false,
			characterAppearanceId: 0,
			CountryCode: 'US',
		};
		const sign = crypto.createSign('sha1');
		const dick = '\r\n' + JSON.stringify(txt);
		sign.write(dick);
		sign.end();

		const key = fs.readFileSync(_dirname + '\\rbx\\PrivateKey.pem');
		const sig = sign.sign(key, 'base64');

		const out = `--rbxsig%${sig}%${dick}`;

		res.send(out);
	},
};
