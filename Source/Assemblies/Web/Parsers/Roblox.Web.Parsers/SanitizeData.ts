export function SanitizeData(data: any) {
	if (typeof data !== 'string') return null;
	return (data || '').replace(/[^a-z0-9+]+/gi, '');
}
