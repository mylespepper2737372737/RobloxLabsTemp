const fs = require('fs');

const clientSettings = new Map(
	Object.entries({
		NeedInstallBgTask: 'False',
		NeedRunBgTask: 'False',
		IsPreDeployOn: 'False',
		PreVersion: '',
		ForceSilentMode: 'False',
		CountersLoad: '100',
		EnabledWebRedirect: 'True',
		LaunchWithLegacyFlagEnabled: '100',
		BetaPlayerLoad: '100',
		CountersFireImmediately: 'True',
		GoogleAnalyticsAccountPropertyID: 'UA-43420590-16',
		ExeVersion: '0.300.0.138971',
		ValidateInstalledExeVersion: 'True',
		UseNewCdn: 'True',
		UseFastStartup: 'True',
		CheckIsStudioOutofDate: 'True',
		ShowInstallSuccessPrompt: 'True',
		InfluxUrl: 'https://web.archive.org/web/20170801010213/http://ec2-52-8-11-103.us-west-1.compute.amazonaws.com:8086',
		InfluxDatabase: 'roblox_bootstrapper',
		InfluxHundredthsPercentage: '0',
		InfluxInstallHundredthsPercentage: '10000',
		ReplaceCdnTxt: 'True',
		GuidVersion: 'a4781a8a67bb4885',
		ReplaceStaticCdnHost: 'False',
		HardcodeCdnHost: 'False',
		UseNewInfluxBootstrapper: 'True',
		PerModeLoggingEnabled: 'True',
		UseCdn: 'True',
		UseNewDeprecatedOSXCheck: 'True',
		DeprecatedOSXMinorVersion: '6',
		DeprecatedOSXLinkURL:
			'https://web.archive.org/web/20170801010213/http://blog.roblox.com/2016/09/roblox-discontinuing-support-for-mac-os-x-10-6/',
		UseRelaunchEmptyArgs: 'True',
		DFFlagInfluxEscapeSlashes: 'True',
		DFStringHttpInfluxDatabase: 'roblox_bootstrapper',
		FFlagDontPatchBootstrapperInfluxFlags: 'True',
		DeprecatePropertyTree: 'True',
		FFlagJoinTimeCounters: 'True',
		FFlagDisableUninstallUpdateTask: 'True',
		FFlagDontInstallProxyPlugins: 'True',
		FFlagUninstallProxyPluginsOnInstall: 'True',
		FFlagUseNewVersionFetchFixed2: 'False',
		FFlagDontInstallProxyPluginsMac: 'True',
		FFlagUninstallProxyPluginsOnInstallMac: 'True',
		FFlagUseCountryCodesForAnalyticsLocation: 'True',
		FFlagChromefixStrictMatch: 'True',
		FFlagChromefixOnlyIfFound: 'True',
		FFlagChromefixOpenFileUnicode: 'True',
		FFlagChromefixSkipLocalState: 'True',
		FFlagChromefixOpenDefaultPreferences: 'True',
		FFlagIncludeTranslationsFolder: 'True',
		FFlagIncludeTranslationsFolderStudio: 'True',
		FFlagBetterErrorReporting: 'True',
		FIntInfluxReportExceptionPermyriad: '10000',
		DFFlagNewInfluxDb: 'True',
		FFlagUseNewVersionFetch4: 'True',
		FFlagThrowLastErrorAlwaysThrow: 'True',
		DFFlagBootstrapperHttpToolsDetectJsonParseError: 'True',
		DFFlagMacBootstrapperDetectJsonParseError: 'True',
		FFlagRelaunchAfterInstallPassUrlString: 'True',
		FFlagMacUseNewVersionFetch4: 'True',
	}),
);
const clientSettingsFormatted = {
	FVariable: {},
	FLog: {},
	DFLog: {},
	SFLog: {},
	FFlag: {},
	DFFlag: {},
	SFFlag: {},
	FInt: {},
	DFInt: {},
	SFInt: {},
	FString: {},
	DFString: {},
	SFString: {},
	FPFilter: {},
	FPFilter: {},
};

clientSettings.forEach((value, key) => {
	const str = key;

	if (str.endsWith('_PlaceFilter') || str.startsWith('FStringPlaceFilter_')) {
		let prefix = 'FVariable';
		let isDynamicOrSync = false;
		let subRange = null;
		if (str.startsWith('FFlag') || str.startsWith('DFFlag') || str.startsWith('SFFlag')) {
			isDynamicOrSync = str.startsWith('S') || str.startsWith('D');
			prefix = isDynamicOrSync ? str.substr(0, 6) : str.substr(0, 5);
			subRange = isDynamicOrSync ? 6 : 5;
			what = 1;
		} else if (str.startsWith('FInt') || str.startsWith('DFInt') || str.startsWith('SFInt')) {
			isDynamicOrSync = str.startsWith('S') || str.startsWith('D');
			prefix = isDynamicOrSync ? str.substr(0, 5) : str.substr(0, 4);
			subRange = isDynamicOrSync ? 5 : 4;
			what = 2;
		} else if (str.startsWith('FLog') || str.startsWith('DFLog') || str.startsWith('SFLog')) {
			isDynamicOrSync = str.startsWith('S') || str.startsWith('D');
			prefix = isDynamicOrSync ? str.substr(0, 5) : str.substr(0, 4);
			subRange = isDynamicOrSync ? 5 : 4;
			what = 3;
		} else if (str.startsWith('FString') || str.startsWith('DFString') || str.startsWith('SFString')) {
			isDynamicOrSync = str.startsWith('S') || str.startsWith('D');
			prefix = isDynamicOrSync ? str.substr(0, 8) : str.substr(0, 7);
			subRange = isDynamicOrSync ? 8 : 7;
		}
		value = value.split(';');
		let filterValue = value[0];
		const filterIds = [];
		if (typeof filterValue === 'string') {
			if (!isNaN(parseFloat(filterValue))) filterValue = typeof filterValue !== 'number' ? parseFloat(filterValue) || 0 : filterValue;
			else if (filterValue === 'True' || filterValue === 'False') filterValue = filterValue === 'True' ? true : false;
			else filterValue = filterValue.toString();
		} else {
			filterValue = typeof filterValue !== 'number' ? parseFloat(filterValue) || 0 : filterValue;
		}
		value.shift();
		value.forEach((id) => {
			id = parseInt(id);

			if (!isNaN(id)) filterIds.push(id);
		});
		clientSettingsFormatted['FPFilter'][
			subRange
				? str.substr(subRange).replace('_PlaceFilter', '').replace('PlaceFilter_', '')
				: str.replace('_PlaceFilter', '').replace('PlaceFilter_', '')
		] = {
			Value: filterValue,
			Ids: filterIds,
			Prefix: prefix,
		};
	} else {
		if (str.startsWith('FFlag') || str.startsWith('DFFlag') || str.startsWith('SFFlag')) {
			const isDynamicOrSync = str.startsWith('S') || str.startsWith('D');
			const prefix = isDynamicOrSync ? str.substr(0, 6) : str.substr(0, 5);
			if (typeof value !== 'boolean') value = value === 'True' ? true : false;
			clientSettingsFormatted[prefix][isDynamicOrSync ? str.substr(6) : str.substr(5)] = value;
		} else if (str.startsWith('FInt') || str.startsWith('DFInt') || str.startsWith('SFInt')) {
			const isDynamicOrSync = str.startsWith('S') || str.startsWith('D');
			const prefix = isDynamicOrSync ? str.substr(0, 5) : str.substr(0, 4);
			value = typeof value !== 'number' ? parseFloat(value) || 0 : value;
			clientSettingsFormatted[prefix][isDynamicOrSync ? str.substr(5) : str.substr(4)] = value;
		} else if (str.startsWith('FLog') || str.startsWith('DFLog') || str.startsWith('SFLog')) {
			const isDynamicOrSync = str.startsWith('S') || str.startsWith('D');
			const prefix = isDynamicOrSync ? str.substr(0, 5) : str.substr(0, 4);
			value = typeof value !== 'number' ? parseFloat(value) || 0 : value;
			clientSettingsFormatted[prefix][isDynamicOrSync ? str.substr(5) : str.substr(4)] = value;
		} else if (str.startsWith('FString') || str.startsWith('DFString') || str.startsWith('SFString')) {
			const isDynamicOrSync = str.startsWith('S') || str.startsWith('D');
			const prefix = isDynamicOrSync ? str.substr(0, 8) : str.substr(0, 7);
			value = value.toString();
			clientSettingsFormatted[prefix][isDynamicOrSync ? str.substr(8) : str.substr(7)] = value;
		} else {
			if (typeof value === 'string') {
				if (!isNaN(parseFloat(value))) value = typeof value !== 'number' ? parseFloat(value) || 0 : value;
				else if (value === 'True' || value === 'False') value = value === 'True' ? true : false;
				else value = value.toString();
			} else {
				value = typeof value !== 'number' ? parseFloat(value) || 0 : value;
			}
			clientSettingsFormatted['FVariable'][str] = value;
		}
	}
});

fs.writeFileSync(__dirname + '\\FormattedSettings.json', JSON.stringify(clientSettingsFormatted, undefined, 4));
