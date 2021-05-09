import { Response } from 'express';
import { ReportDebatableErrorDelegate } from '../Interfaces/IGameLaunchFactoryBase';
import { IGameLaunchRequestBase } from '../Interfaces/IGameLaunchRequestBase';
import { GameLaunchFactoryBase } from '../Models/Abstract/GameLaunchFactoryBase';

export class RequestPrivateGameFactory extends GameLaunchFactoryBase {
	public constructor(response: Response) {
		super(response);
	}

	public Invoke(request: IGameLaunchRequestBase, reportDebatableErrorDelegate: ReportDebatableErrorDelegate): bool {
		throw new Error('Method not implemented.');
	}
}
