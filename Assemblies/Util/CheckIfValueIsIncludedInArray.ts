export function CheckIfValueIsIncludedInArray<TValue>(value: TValue, array: TValue[]) {
	return array.indexOf(value) > -1;
}
