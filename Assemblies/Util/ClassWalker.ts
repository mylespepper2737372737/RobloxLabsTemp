/**
 * Walks thru the file until it finds the IController
 * Returns NULL if none found.
 */
export function ClassWalker<TClass extends any = null>(data: any): TClass {
	if (!(data instanceof Object)) return null;
	const classMap = new Map<string, any>(Object.entries(data));
	let hasFound = false;
	classMap.forEach((newClass) => {
		if (hasFound) return;
		if ((!newClass || !newClass.IsController) && newClass.length !== 0) {
			data = ClassWalker(newClass);
		} else {
			hasFound = true;
			data = new newClass();
		}
	});
	return data;
}
