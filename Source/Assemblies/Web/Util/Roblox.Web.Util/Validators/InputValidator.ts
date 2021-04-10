import { Profanity } from '../../../../DataV2/Filtering/Roblox.DataV2.Filtering/Profanity';
import { Whitespace } from '../../../../DataV2/Filtering/Roblox.DataV2.Filtering/Whitespace';
import { SomeFactory } from '../Factories/SomeFactory';

export namespace InputValidator {
	export function CheckDoesNumberStringIncludeAlphaChars(input: string | number) {
		if (typeof input === 'number') {
			if (isNaN(input)) return true;
			return false;
		}
		if (!input) return false; // TODO Maybe do some extra response shit here?
		return input.match(/[a-zA-Z]+/g) === null;
	}

	export function CheckDoesStringIncludeASPExtension(str: string) {
		str = str.toLowerCase();
		return str.endsWith('.aspx') || str.endsWith('.ashx') || str.endsWith('.asmx');
	}

	export function CheckDoesStringIncludeInvalidChars(str: string) {
		return str.match(/^[A-Za-z0-9_-]*$/g) === null;
	}

	export function CheckDoesStringIncludeProfanity(str: string) {
		let isInvalid = false;
		Profanity.every((p) => {
			if (str.match(p) !== null) {
				isInvalid = true;
				return false;
			}
			return true;
		});
		return isInvalid;
	}

	export function CheckDoesStringIncludeWhitespace(str: string) {
		return SomeFactory((char) => str.indexOf(char) > -1, Whitespace);
	}

	export function CheckIfValueIsIncludedInArray<TValue>(value: TValue, array: TValue[]) {
		return array.indexOf(value) > -1;
	}

	export function CheckIsDateStringAnISODate(str: string) {
		if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
		var d = new Date(str);
		return d.toISOString() === str;
	}
}
