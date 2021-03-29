export function GetValueFromFormDataString(valueName: string, formString: string): string {
	return GetValuesFromFormDataString([valueName], formString);
}

export function GetValuesFromFormDataString(valueNames: string[], formString: string): string {
	let value = formString;
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
