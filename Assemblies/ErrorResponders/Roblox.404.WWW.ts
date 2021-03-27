/*
	FileName: www.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: root 404 middleware

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

import { User } from '../Platform/Membership/User';

export default async (_req, res) => {
	const user = await User.GetById(1);
	return res.status(404).render('Error/NotFound', {
		isUserAuthenicated: user !== null,
		authenticatedUser: { ...user, LanguageCode: 'en_us', LanguageName: 'English', Theme: 'dark' } || null,
		sessionUser: {
			LanguageCode: 'en_us',
			LanguageName: 'English',
			Device: {
				DeviceName: 'computer',
				IsInApp: false,
				IsDesktop: true,
				IsPhone: false,
				IsTablet: false,
				IsConsole: false,
				IsAndroidApp: false,
				IsIosApp: false,
				IsUWPApp: false,
				IsXboxApp: false,
				IsAmazonApp: false,
				IsWin32App: false,
				IsStudio: false,
				IsGameClientBrowser: false,
				IsIosDevice: false,
				IsAndroidDevice: false,
				IsUniversalApp: false,
			},
		},
		MachineId: 'AWA-1447',
		globalMeta: {
			Experiments: {
				DisplayNamesEnabled: true,
			},
		},
	});
};
