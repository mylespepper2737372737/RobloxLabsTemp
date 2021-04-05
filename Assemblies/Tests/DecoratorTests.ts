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

function test() {
	return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log(target, propertyKey, descriptor);
	};
}

@decorator()
@reportableClassDecorator()
export class Test {
	public a = 1;
	@test()
	public b() {}
}
