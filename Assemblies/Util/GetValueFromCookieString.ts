export function GetValueFromCookieString(valueName: string, cookieString: string): string {
	return GetValuesFromCookieString([valueName], cookieString);
}

export function GetValuesFromCookieString(valueNames: string[], cookieString: string): string {
	let value = cookieString;
	if (value === undefined) value = '';
	value = value.split(';').find((val) => {
		for (let i = 0; i < valueNames.length; ++i) {
			if (val.startsWith(valueNames[i]) || val.startsWith(` ${valueNames[i]}`))
				return val.startsWith(valueNames[i]) || val.startsWith(` ${valueNames[i]}`);
		}
	});
	if (value) value = value.split('=')[1];
	return value || null;
}
