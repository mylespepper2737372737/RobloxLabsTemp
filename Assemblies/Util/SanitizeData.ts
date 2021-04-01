export function SanitizeData(data: string) {
    return data.replace(/[^a-z0-9+]+/gi, '');
}