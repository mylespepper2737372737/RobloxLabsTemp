export function CheckDoesStringIncludeASPExtension(str: string) {
	str = str.toLowerCase();
	return str.endsWith('.aspx') || str.endsWith('.ashx') || str.endsWith('.asmx');
}
