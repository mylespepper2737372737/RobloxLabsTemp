import filestream from 'fs';
import { _dirname } from '../../constants/directories';

export enum Group {
	FFlag,
	DFFlag,
	FInt,
	DFInt,
	FString,
	DFString,
	FSettings,
	All,
}

export const GetSettings = <SettingsType extends Group>(
	settingsType: SettingsType,
	settingsGroup: string = 'Web',
): Record<string, unknown> | string[] | Error => {
	const settings = JSON.parse(filestream.readFileSync(_dirname + '\\global\\flags.json', 'ascii'));
	if (settingsType || settingsType === 0 || settingsType === Group.FFlag) {
		switch (settingsType as Group) {
			case Group.FFlag:
				return settings[settingsGroup]['FFlag'] as Record<string, boolean>;
			case Group.DFFlag:
				return settings[settingsGroup]['DFFlag'] as Record<string, boolean>;
			case Group.FInt:
				return settings[settingsGroup]['FInt'] as Record<string, number>;
			case Group.DFInt:
				return settings[settingsGroup]['DFInt'] as Record<string, number>;
			case Group.FString:
				return settings[settingsGroup]['FString'] as Record<string, string>;
			case Group.DFString:
				return settings[settingsGroup]['DFString'] as Record<string, string>;
			case Group.FSettings:
				return settings['FSettings'] as string[];
			case Group.All:
				return settings[settingsGroup] as Record<string, object>;
			default:
				return new Error(`Settings Group '${settingsType}' doesn't exist.`);
		}
	}
};
