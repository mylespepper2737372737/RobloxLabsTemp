import { Request, Response } from 'express';
import { IController } from '../../../../Global.Helpers/IController';
import { Route } from '../../../../Global.Helpers/Route';
import { RoutePrefix } from '../../../../Global.Helpers/RoutePrefix';

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
