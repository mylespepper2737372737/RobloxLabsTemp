export function FetchKeyFromObjectCaseInsensitive<T = any>(object: { [x: string]: any }, key: string): T {
	return object[Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase())];
}

export function FetchKeyFromObjectCaseInsensitiveOrDefault<T = any>(object: { [x: string]: any }, key: string, defaultValue: T = null): T {
	return object[Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase())] || defaultValue;
}

export function FetchKeyFromObjectCaseInsensitiveGeneric<
	TObject extends any = any,
	TKey extends keyof TObject = any,
	TValue extends TObject[TKey] = any
>(object: TObject, key: TKey): TValue {
	return object[Object.keys(object).find((k) => k.toLowerCase() === (<string>key).toLowerCase())];
}

export function FetchKeyFromObjectCaseInsensitiveOrDefaultGeneric<
	TObject extends any = any,
	TKey extends keyof TObject = any,
	TValue extends TObject[TKey] = any
>(object: TObject, key: TKey, defaultValue: TValue = null): TValue {
	return object[Object.keys(object).find((k) => k.toLowerCase() === (<string>key).toLowerCase())] || defaultValue;
}
