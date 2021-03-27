import { Request, Response } from 'express';
import {
	DFFlag,
	DFString,
	DYNAMIC_FASTFLAGVARIABLE,
	DYNAMIC_FASTSTRINGVARIABLE,
} from '../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { User } from '../../../../Platform/Membership/User';

DYNAMIC_FASTSTRINGVARIABLE('SiteBanner', 'Test');
DYNAMIC_FASTFLAGVARIABLE('ShouldShowLeftNavOnTestPage', false);

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		const user = await User.GetById(1);

		response.render('BlankBody', {
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
			pageMeta: {
				SiteBanner: DFString('SiteBanner'),
				shouldShowLeftNavOnTestPage: DFFlag('ShouldShowLeftNavOnTestPage'),
			},
		});
	},
};
