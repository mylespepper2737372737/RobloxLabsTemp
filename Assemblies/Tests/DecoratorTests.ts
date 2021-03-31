function decorator() {
	return function (ctor: Function) {};
}

function reportableClassDecorator() {
	return function <T extends { new (...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			reportingURL = 'http://www...';
		};
	};
}

@decorator()
@reportableClassDecorator()
export class Test {
	public a;
}
