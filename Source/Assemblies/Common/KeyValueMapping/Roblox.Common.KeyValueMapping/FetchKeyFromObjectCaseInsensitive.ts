export function FetchKeyFromObjectCaseInsensitive(object: { [x: string]: any }, key: string) {
	return object[Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase())];
}
