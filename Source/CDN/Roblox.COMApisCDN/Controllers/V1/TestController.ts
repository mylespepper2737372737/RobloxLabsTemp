import { Request, Response } from 'express';
import { IController } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Setup/Models/IController';
import { Route } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Setup/Attributes/Route';
import { RoutePrefix } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Setup/Attributes/RoutePrefix';

export namespace Roblox.ComApis.Api.Controllers {
	@IController()
	@RoutePrefix()
	export class TestController {
		@Route()
		public Index(request: Request, response: Response) {
			response.status(200).send('OK');
		}
	}
}
