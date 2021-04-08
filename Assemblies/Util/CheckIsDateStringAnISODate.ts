export function CheckIsDateStringAnISODate(str: string) {
	if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
	var d = new Date(str);
	return d.toISOString() === str;
}
