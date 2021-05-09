import { Response } from 'express';
import { IGameLaunchFactoryBase, ReportDebatableErrorDelegate } from '../../Interfaces/IGameLaunchFactoryBase';
import { IGameLaunchRequestBase } from '../../Interfaces/IGameLaunchRequestBase';

export abstract class GameLaunchFactoryBase implements IGameLaunchFactoryBase {
	protected _response: Response;

	public constructor(response: Response) {
		this._response = response;
	}

	public abstract Invoke(request: IGameLaunchRequestBase, reportDebatableErrorDelegate: ReportDebatableErrorDelegate): bool;
}
