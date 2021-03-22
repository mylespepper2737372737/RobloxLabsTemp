/**
 * Jak: Try to shorten this, it's too long!
 * ROBLOX: This is too long, refactor it to happen on files.api
 * This uses https://files.api.sitetest4.robloxlabs.com/ClientSettingsFormatted?clientSettingsType=Client&apiKey=91105AEA-2038-4BFE-B98E-BF6A009E2AF7
 * And https://files.api.sitetest4.robloxlabs.com/WebSettingsFormatted?webSettingsType=Web&apiKey=91105AEA-2038-4BFE-B98E-BF6A009E2AF7
 *
 * files.api needs a ROBLOX specific IP for it to actually not infinitely load,
 * why does it do this? It's an internal api, so we don't want people to hack into it because it has archived clientsettings and archived builds,
 * we don't purge things on it because we need backups for any sponsors that would like to see our old work.
 * Sponsors... definitely sponsors hahaha... no we need this incase we break something, or we want old binaries and can't find them.
 *
 */

import filestream from 'fs';
import { _dirname } from '../../Constants/Directories';

export enum Group {
	'FVariable',
	'FLog',
	'DFLog',
	'SFLog',
	'FFlag',
	'DFFlag',
	'SFFlag',
	'FInt',
	'DFInt',
	'SFInt',
	'FString',
	'DFString',
	'SFString',
	'FPFilter',
	'FSettings',
	'UExperiment',
	'BTExperiment',
	'SExperiment',
	'All',
}

//ClientSettings namespace, beacause you know, it's 100% just client settings, not like WebSettings are here also.
export namespace ClientSettings {
	// This is helper for grabbing BigSettings, just type cast it if you din't want to say `ClientSettings.GetDFFlag("WebNoOpt")` etc.
	// it's also used by GetDFFlag, so yeah
	export const GetSettings = <SettingsType extends Group>(
		settingsType: SettingsType,
		settingsGroup: string = 'Web',
	): Record<string, unknown> | string[] | Error => {
		const settings = JSON.parse(filestream.readFileSync(_dirname + '\\Default\\Roblox.Settings.json', 'ascii'));
		if (settingsType || settingsType === 0 || settingsType === Group.FFlag) {
			switch (settingsType as Group) {
				case Group.FVariable:
					return settings[settingsGroup]['FVariable'];
				case Group.FLog:
					return settings[settingsGroup]['FLog'];
				case Group.SFLog:
					return settings[settingsGroup]['SFLog'];
				case Group.DFLog:
					return settings[settingsGroup]['DFLog'];
				case Group.FFlag:
					return settings[settingsGroup]['FFlag'];
				case Group.DFFlag:
					return settings[settingsGroup]['DFFlag'];
				case Group.SFFlag:
					return settings[settingsGroup]['SFFlag'];
				case Group.FInt:
					return settings[settingsGroup]['FInt'];
				case Group.DFInt:
					return settings[settingsGroup]['DFInt'];
				case Group.SFInt:
					return settings[settingsGroup]['SFInt'];
				case Group.FString:
					return settings[settingsGroup]['FString'];
				case Group.DFString:
					return settings[settingsGroup]['DFString'];
				case Group.SFString:
					return settings[settingsGroup]['SFString'];
				case Group.FPFilter:
					return settings[settingsGroup]['FPFilter'];
				case Group.FSettings:
					return settings['FSettings'];
				case Group.UExperiment:
					return settings[settingsGroup]['UExperiment'];
				case Group.BTExperiment:
					return settings[settingsGroup]['BTExperiment'];
				case Group.SExperiment:
					return settings[settingsGroup]['SExperiment'];
				case Group.All:
					return settings[settingsGroup];
				default:
					return new Error(`Settings Group '${settingsType}' doesn't exist.`);
			}
		}
	};
	export const GetFVariables = (ctx: string = 'Web') => {
		return GetSettings(Group.FVariable, ctx);
	};
	export const GetFLogs = (ctx: string = 'Web') => {
		return GetSettings(Group.FLog, ctx);
	};
	export const GetDFLogs = (ctx: string = 'Web') => {
		return GetSettings(Group.DFLog, ctx);
	};
	export const GetFFlags = (ctx: string = 'Web') => {
		return GetSettings(Group.FFlag, ctx);
	};
	export const GetDFFlags = (ctx: string = 'Web') => {
		return GetSettings(Group.DFFlag, ctx);
	};
	export const GetSFFlags = (ctx: string = 'Web') => {
		return GetSettings(Group.SFFlag, ctx);
	};
	export const GetFInts = (ctx: string = 'Web') => {
		return GetSettings(Group.FInt, ctx);
	};
	export const GetDFInts = (ctx: string = 'Web') => {
		return GetSettings(Group.DFInt, ctx);
	};
	export const GetSFInts = (ctx: string = 'Web') => {
		return GetSettings(Group.SFInt, ctx);
	};
	export const GetFStrings = (ctx: string = 'Web') => {
		return GetSettings(Group.FString, ctx);
	};
	export const GetDFStrings = (ctx: string = 'Web') => {
		return GetSettings(Group.DFString, ctx);
	};
	export const GetSFStrings = (ctx: string = 'Web') => {
		return GetSettings(Group.SFString, ctx);
	};
	export const GetFPFilters = (ctx: string = 'Web') => {
		return GetSettings(Group.FPFilter, ctx);
	};
	export const GetFSettings = (ctx: string = 'Web') => {
		return GetSettings(Group.FSettings, ctx);
	};
	export const GetUserExperiments = (ctx: string = 'Web') => {
		return GetSettings(Group.UExperiment, ctx);
	};
	export const GetBrowserTrackerExperiments = (ctx: string = 'Web') => {
		return GetSettings(Group.BTExperiment, ctx);
	};
	export const GetSharedExperiments = (ctx: string = 'Web') => {
		return GetSettings(Group.SExperiment, ctx);
	};
	export const GetSFLogs = (ctx: string = 'Web') => {
		return GetSettings(Group.SFLog, ctx);
	};

	export const GetAllSettings = (ctx: string = 'Web') => {
		return GetSettings(Group.All, ctx);
	};

	export const GetPlaceIdInPlaceFilter = (key: string, placeId: number, ctx: string = 'Web') => {
		const FPFilter = ClientSettings.GetFPFilters(ctx);
		// This should never go through unless files.api.sitetest4.robloxlabs.com/ClientSettingsFormatted dies.
		if (FPFilter === undefined) return false;

		const keyFilter = FPFilter[key] as Record<string, unknown>;
		if (keyFilter === undefined) return false;
		let isInFilter = false;
		(<number[]>keyFilter['PlaceIds']).forEach((id) => {
			if (id === placeId) isInFilter = true;
		});
		return isInFilter;
	};
}
