export function SanitizeData(data: string) {
	if (!data) return null;
	return (data || '').replace(/[^a-z0-9+]+/gi, '');
}
