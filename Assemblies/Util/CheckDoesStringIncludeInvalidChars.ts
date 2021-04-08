export function CheckDoesStringIncludeInvalidChars(str: string) {
	return str.match(/^[A-Za-z0-9_-]*$/g) === null;
}
