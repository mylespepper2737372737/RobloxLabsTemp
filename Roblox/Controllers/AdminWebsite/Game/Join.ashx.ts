/*
	FileName: Join.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://assetgame.sitetest4.robloxlabs.com/game/Join.ashx, gets join information for the RakPeer in order to connect to that peer.

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

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

import crypto from 'crypto';
import fs from 'fs';
import { Roblox } from '../../../Api';

export default {
	method: 'all',
	func: (_req: { query: { [x: string]: any } }, res: { send: (arg0: string) => void }): void => {
		const DFString = Roblox.Api.Helpers.Util.ClientSettings.GetDFStrings();
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
			BaseUrl: 'https://broom.sitetest4.robloxlabs.com/',
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

		const key = fs.readFileSync(Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\InternalCDN\\PrivateKey.pem');
		const sig = sign.sign(key, 'base64');

		const out = `--rbxsig%${sig}%${dick}`;

		res.send(out);
	},
};
