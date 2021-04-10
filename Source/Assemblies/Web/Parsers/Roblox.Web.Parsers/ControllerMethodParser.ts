import { Request, Response } from 'express';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { DFLog, FASTLOG3 } from '../../Util/Roblox.Web.Util/Logging/FastLog';
import { HttpRequestMethodEnum } from '../../../Http/ServiceClient/Roblox.Http.ServiceClient/Enumeration/HttpRequestMethodEnum';
import { StripTheTrailingSlash } from './StripTheTrailingSlash';

export function ControllerMethodParser(app: IApplicationBuilder, controller: any, apiName: string) {
	if (!controller.ControllerMethods || !Array.isArray(controller.ControllerMethods)) return false;
	if (controller.ControllerMethods.length === 0) return true; // Return true here because.
	const controllerName: string = (controller.Name || '').toString();
	let routePrefix: string = (controller.Route || '').toString();
	if (!routePrefix) routePrefix = controllerName.toLocaleLowerCase().replace('controller', '');
	if (!routePrefix.startsWith('/')) routePrefix = '/' + routePrefix;
	if (!routePrefix.endsWith('/')) routePrefix = routePrefix + '/';
	controller.ControllerMethods.forEach((controllerMethod) => {
		let name: string = (controllerMethod.Name || '').toString();
		let route: string = (controllerMethod.Route || '').toString();
		if (!route) {
			if (name.toLocaleLowerCase() === 'index') {
				route = routePrefix;
			} else {
				if (name.startsWith('/')) name = name.replace('/', '');
				if (name.endsWith('/')) name = StripTheTrailingSlash(name);
				route = routePrefix + name.toLocaleLowerCase();
			}
		}
		const params = route.matchAll(/\[(.*?)\]/);
		for (const param in params) {
			route = route.replace(`[${param}]`, `:${param}`);
		}

		FASTLOG3(
			DFLog('Tasks'),
			`[DFLog::Tasks] Parsing the Controller method 'https://%s%s' for the Controller '%s'.`,
			apiName,
			route,
			controller,
		);

		/* Method */
		const method: HttpRequestMethodEnum = controllerMethod.Method || null;
		const func =
			controllerMethod.Function ||
			((_request: Request, _response: Response) => {
				throw new Error('This endpoint is not implemented yet.');
			});
		if (!method) {
			const methods: string[] = controllerMethod.Methods || null;
			const badRequestMethodHandler = controllerMethod.BadRequestMethodHandler || null;
			if (!methods) {
				app.all(route, func);
			} else if (methods) {
				app.all(route, (request, response, next) => {
					let badRequestMethod = true;
					methods.forEach((method) => {
						if (request.method.toLocaleLowerCase() === method.toLocaleLowerCase()) badRequestMethod = false;
					});
					if (badRequestMethodHandler && badRequestMethod) return badRequestMethodHandler(request, response, next);
					// TODO: Make the badRequestMethodHandler required for multi-methods.
					return func(request, response, next);
				});
			}
		} else {
			switch (<HttpRequestMethodEnum>method) {
				case HttpRequestMethodEnum.GET:
					app.get(route, func);
					break;
				case HttpRequestMethodEnum.DELETE:
					app.delete(route, func);
					break;
				case HttpRequestMethodEnum.HEAD:
					app.head(route, func);
					break;
				case HttpRequestMethodEnum.OPTIONS:
					app.options(route, func);
					break;
				case HttpRequestMethodEnum.PATCH:
					app.patch(route, func);
					break;
				case HttpRequestMethodEnum.POST:
					app.post(route, func);
					break;
				case HttpRequestMethodEnum.PUT:
					app.put(route, func);
					break;
			}
		}
	});
}
