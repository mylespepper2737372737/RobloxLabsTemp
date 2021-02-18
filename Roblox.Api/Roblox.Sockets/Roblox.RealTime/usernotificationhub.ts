/*
	FileName: router.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: WWW's websocket
	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com
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

//{"C":"d-9042436C-B,0|z9cD,1|z8Ru,5|z9cE,1","M":[{"H":"UserNotificationHub","M":"notification","A":["FriendshipNotifications","{\"Type\":\"FriendshipRequested\",\"EventArgs\":{\"UserId1\":2377893199,\"UserId2\":158190828},\"SequenceNumber\":49}",0]}]}

import { IncomingMessage } from 'http';
import ws from 'ws';
import { FASTLOG3 } from '../../Roblox.Helpers/Roblox.Helpers/Roblox.Util/Roblox.Util.FastLog';

export default {
	dir: '/notifications/connect',
	func: (socket: ws, req: IncomingMessage): void => {
		FASTLOG3('WebSockets', 'Connection opened for realtime, echoeing back and closing');
		socket.send(JSON.stringify({ C: 'd-9042436C-B,0|z9cD,0|z8Ru,0|z9cE,1', S: 1, M: [] }));
		socket.send(
			JSON.stringify({
				C: 'd-9042436C-B,0|z9cD,1|z8Ru,0|z9cE,1',
				M: [
					{
						H: 'UserNotificationHub',
						M: 'subscriptionStatus',
						A: [
							'Subscribed',
							'{"MillisecondsBeforeHandlingReconnect":0,"SequenceNumber":4852,"NamespaceSequenceNumbers":{"GameCloseNotifications":286,"CloudEditChatNotifications":152,"AuthenticationNotifications":30,"ChatNotifications":86,"FriendshipNotifications":48,"UserTagChangeNotification":3,"AvatarAssetOwnershipNotifications":3,"NotificationStream":13,"GameFavoriteNotifications":1}}',
						],
					},
				],
			}),
		);
		let r = setInterval(() => {
			socket.send('{}');
		}, 10000);
		socket.on('close', () => {
			r.unref();
			r = undefined;
			socket.close();
		});
	},
};
