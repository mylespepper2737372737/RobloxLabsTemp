export class Convert {
	static ToInt32(arg0: string, arg1: number): number {
		return parseInt(arg0, arg1);
	}
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
