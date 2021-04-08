const fs = require('fs');

const allGroupSettings = {
	FVariable: {},
	FLog: {
		Pages: 7,
		EphemeralCounters: 7,
		dmp: 7,
	},
	DFLog: {
		Tasks: 7,
	},
	SFLog: {},
	FFlag: {
		RequireGlobalHTTPS: true,
		AutoHttpRedirect: false,
		AreLogsEnabled: true,
	},
	DFFlag: {
		IsCaptchaV2Enabled: true,
		IsCaptchaV2Hardcoded: false,
		CanCaptchaV2AdminKeyBeUsed: false,
		IsCSRFV2Enabled: false,
		IsCSRFV2Hardcoded: false,
		IsCSRFV2BasedOnAuthenticationId: false,
		IsCSRFV2BasedOnIPAddress: false,
		IsCSRFV2BasedOnIpAddressAndAuthenticationId: true,
		CanCSRFV2AdminKeyBeUsed: false,
		IsAuthV2Enabled: false,
		IsWWWAuthV1Enabled: true,
		WWWAuthV1AllowAllMethods: true,
		IsClientSettingsAPIEnabled: true,
		IsWWWAuthSignupPubliclyListed: true,
		DataStoreV2MaxItemsToReturnShould403OnBadNumber: false,
		IsLoginCodeButtonDisplayed: true,
		IsCodeValidationDisplayed: true,
		DoesTheWorldGetToViewTheSite: true,
		CanAdminsBypassTheSystem: true,
		NoMaintenance: false,
		Debug: true,
		PointsServiceEnabled: true,
		ShouldShowLeftNavOnTestPage: false,
		IsBannerEnabled: true,
		WWWIndexPageControllerEnabled: true,
		DefaultModerationCanReactivate: true,
		DefaultModerationIsPermanent: false,
		IsSignupFormDarkThemeEnabled: true,
	},
	SFFlag: {},
	FInt: {
		CSRFV2Timeout: 120000,
		CSRFV2MaxRefreshCount: 100,
		CaptchaV2Timeout: 60000,
		CaptchaV2TimeoutAdditionAfter200GetImageHashes: 900000,
	},
	DFInt: {
		CaptchaV2FailedStatus: 403,
		WWWAuthV1MaxAuthTokenAge: 946100000000,
		MetricsLogRatio: 0.05,
		MultiGetContactsMaxSize: 200,
		CookieLawNoticeTimeout: 20000,
		TestCurrency: 0,
	},
	SFInt: {},
	FString: {
		CSRFV2FailedResponseStatusText: 'Token Validation Failed',
		CaptchaV2FailedResponseStatusText: 'Captcha Validation Failed',
		CDNAdminAuthCompletedStatusText: 'Verified',
		CaptchaV2CaptchaProvider: 'PROVIDER_MFD_LABS_300',
		CSRFV2HardcodedKey: 'TestKey',
	},
	DFString: {
		CharacterAppearanceUrl: 'http://assetgame.sitetest4.robloxlabs.com/Asset/CharacterFetch.ashx',
		CharacterAppearranceTestString:
			'http://assetgame.sitetest4.robloxlabs.com/Asset/BodyColors.ashx?userId=0;http://assetgame.sitetest4.robloxlabs.com/Asset?id=21070012;http://assetgame.sitetest4.robloxlabs.com/Asset?id=6395566584',
		WebVersion: '1.313.13.88764',
		SiteBanner: 'Ze test',
		DefaultModerationTitle: 'Warning',
		DefaultModerationReviewedDate: '3/29/2021 3:18:10 AM',
		DefaultModerationNote:
			'This is a test warning, if you are not a moderator, please contact a moderator or appeals@roblox.com to re-active this account, or ask in #moderation-test-front-guild slack channel.',
	},
	SFString: {},
};

const parsedGroupMappedSettings = new Map(Object.entries(allGroupSettings));
const outputGroupSettings = {};
parsedGroupMappedSettings.forEach((_value, key) => {
	if (key === 'FFlag') {
		const fflag = new Map(Object.entries(allGroupSettings[key]));
		fflag.forEach((flagValue, flagName) => {
			outputGroupSettings['FFlag' + flagName] = flagValue === true ? 'True' : 'False';
		});
	} else if (key === 'DFFlag') {
		const dfflag = new Map(Object.entries(allGroupSettings[key]));
		dfflag.forEach((flagValue, flagName) => {
			outputGroupSettings['DFFlag' + flagName] = flagValue === true ? 'True' : 'False';
		});
	} else if (key === 'SFFlag') {
		const sfflag = new Map(Object.entries(allGroupSettings[key]));
		sfflag.forEach((flagValue, flagName) => {
			outputGroupSettings['SFFlag' + flagName] = flagValue === true ? 'True' : 'False';
		});
	} else if (key === 'FLog') {
		const flog = new Map(Object.entries(allGroupSettings[key]));
		flog.forEach((flagValue, flagName) => {
			outputGroupSettings['FLog' + flagName] = flagValue.toString();
		});
	} else if (key === 'DFLog') {
		const dflog = new Map(Object.entries(allGroupSettings[key]));
		dflog.forEach((flagValue, flagName) => {
			outputGroupSettings['DFLog' + flagName] = flagValue.toString();
		});
	} else if (key === 'SFLog') {
		const sflog = new Map(Object.entries(allGroupSettings[key]));
		sflog.forEach((flagValue, flagName) => {
			outputGroupSettings['SFLog' + flagName] = flagValue.toString();
		});
	} else if (key === 'FInt') {
		const fint = new Map(Object.entries(allGroupSettings[key]));
		fint.forEach((flagValue, flagName) => {
			outputGroupSettings['FInt' + flagName] = flagValue.toString();
		});
	} else if (key === 'DFInt') {
		const dfint = new Map(Object.entries(allGroupSettings[key]));
		dfint.forEach((flagValue, flagName) => {
			outputGroupSettings['DFInt' + flagName] = flagValue.toString();
		});
	} else if (key === 'SFInt') {
		const sfint = new Map(Object.entries(allGroupSettings[key]));
		sfint.forEach((flagValue, flagName) => {
			outputGroupSettings['SFInt' + flagName] = flagValue.toString();
		});
	} else if (key === 'FString') {
		const fstring = new Map(Object.entries(allGroupSettings[key]));
		fstring.forEach((flagValue, flagName) => {
			outputGroupSettings['FString' + flagName] = flagValue;
		});
	} else if (key === 'DFString') {
		const dfstring = new Map(Object.entries(allGroupSettings[key]));
		dfstring.forEach((flagValue, flagName) => {
			outputGroupSettings['DFString' + flagName] = flagValue;
		});
	} else if (key === 'SFString') {
		const sfstring = new Map(Object.entries(allGroupSettings[key]));
		sfstring.forEach((flagValue, flagName) => {
			outputGroupSettings['SFString' + flagName] = flagValue;
		});
	} else if (key === 'FVariable') {
		const fvariable = new Map(Object.entries(allGroupSettings[key]));
		fvariable.forEach((flagValue, flagName) => {
			let value = flagValue;
			if (typeof flagValue === 'boolean') value = flagValue ? 'True' : 'False';
			if (typeof flagValue === 'number') value = flagValue.toString();
			outputGroupSettings[flagName] = value;
		});
	} else if (key === 'FPFilter') {
		const fpfilter = new Map(Object.entries(allGroupSettings[key]));
		fpfilter.forEach((flagValue, flagName) => {
			const placeFilterFlagName = flagValue.Prefix + flagName + '_PlaceFilter';
			const placeFilterFlagName2 = flagValue.Prefix + 'PlaceFilter_' + flagName;

			if (typeof flagValue.Value === 'boolean') {
				let placeFilterFlagValue = flagValue.Value ? 'True;' : 'False;';
				let iterator = 0;
				flagValue.Ids.forEach((placeId) => {
					iterator++;
					placeFilterFlagValue += placeId.toString() + (iterator !== flagValue.Ids.length ? ';' : '');
				});
				outputGroupSettings[placeFilterFlagName] = placeFilterFlagValue;
				outputGroupSettings[placeFilterFlagName2] = placeFilterFlagValue;
			} else if (typeof flagValue.Value === 'number') {
				let placeFilterFlagValue = flagValue.Value.toString() + ';';
				let iterator = 0;
				flagValue.Ids.forEach((placeId) => {
					iterator++;
					placeFilterFlagValue += placeId.toString() + (iterator !== flagValue.Ids.length ? ';' : '');
				});
				outputGroupSettings[placeFilterFlagName] = placeFilterFlagValue;
				outputGroupSettings[placeFilterFlagName2] = placeFilterFlagValue;
			} else {
				let placeFilterFlagValue = flagValue.Value + ';';
				let iterator = 0;
				flagValue.Ids.forEach((placeId) => {
					iterator++;
					placeFilterFlagValue += placeId.toString() + (iterator !== flagValue.Ids.length ? ';' : '');
				});
				outputGroupSettings[placeFilterFlagName] = placeFilterFlagValue;
				outputGroupSettings[placeFilterFlagName2] = placeFilterFlagValue;
			}
		});
	} else {
		const flagValues = new Map(Object.entries(allGroupSettings[key]));
		flagValues.forEach((flagValue, flagName) => {
			let value = flagValue;
			if (typeof flagValue === 'boolean') value = flagValue ? 'True' : 'False';
			if (typeof flagValue === 'number') value = flagValue.toString();
			outputGroupSettings[flagName] = value;
		});
	}
});
fs.writeFileSync(__dirname + '\\OutputSettings.json', JSON.stringify(outputGroupSettings, undefined, 4));
