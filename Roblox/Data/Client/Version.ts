import { DFString, DYNAMIC_FASTSTRINGVARIABLE } from '../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

// Set this to the default 0 version in case something breaks.
DYNAMIC_FASTSTRINGVARIABLE('WebVersion', '0.001.0.000001');

export namespace Version {
	export function GetVersion(): string {
		return DFString('WebVersion');
	}
}
