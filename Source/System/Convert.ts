export class Convert {
	public static ToBoolean(value: any, def?: bool): bool {
		const defaultReturn = def !== undefined && def !== null ? def : false;
		value = typeof value === 'string' ? value.toLowerCase() : null;
		if (value === null) return defaultReturn;
		try {
			return JSON.parse(value);
		} catch {
			return defaultReturn;
		}
	}
}
