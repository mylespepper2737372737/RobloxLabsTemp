export function CheckDoesNumberStringIncludeAlphaChars(input: string | number) {
	if (typeof input === 'number') {
		if (isNaN(input)) return true;
		return false;
	}
	if (!input) return false; // TODO Maybe do some extra response shit here?
	return input.match(/[a-zA-Z]+/g) === null;
}
