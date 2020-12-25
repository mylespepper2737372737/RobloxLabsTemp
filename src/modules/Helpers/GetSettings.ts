import filestream from 'fs';
import { _dirname } from '../constants/directories';

export enum Group {
	FFlag,
	DFFlag,
	FInt,
	DFInt,
	FString,
	DFString,
}

export const GetSettings = <SettingsGroup extends Group>(settingsGroup?: SettingsGroup): Record<string, unknown> | string[] | Error => {
	const settings = JSON.parse(filestream.readFileSync(_dirname + '\\global\\flags.json', 'ascii'));
	if (settingsGroup || settingsGroup === 0 || settingsGroup === Group.FFlag) {
		switch (settingsGroup as Group) {
			case Group.FFlag:
				return settings['FFlag'] as Record<string, boolean>;
			case Group.DFFlag:
				return settings['DFFlag'] as Record<string, boolean>;
			case Group.FInt:
				return settings['FInt'] as Record<string, number>;
			case Group.DFInt:
				return settings['DFInt'] as Record<string, number>;
			case Group.FString:
				return settings['FString'] as Record<string, string>;
			case Group.DFString:
				return settings['DFString'] as Record<string, string>;
			default:
				return new Error(`Settings Group '${settingsGroup}' doesn't exist.`);
		}
	}
	return settings;
};
