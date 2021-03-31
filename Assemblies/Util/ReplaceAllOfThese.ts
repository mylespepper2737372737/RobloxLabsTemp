export function ReplaceAllOfThese(str: string, key: string, replaceWith: any) {
	return str.split(key).join(replaceWith);
}
export function ReplaceAllOfTheseValues(str: string, values: Record<string, any>) {
	if (!values) values = {};
	const newVals = new Map<string, any>(Object.entries(values));
	newVals.forEach((v, k) => {
		str = ReplaceAllOfThese(str, k, v);
	});
	return str;
}
