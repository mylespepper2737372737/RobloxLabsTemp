import { Response } from 'express';
import { RequestType } from './Enumeration/RequestType';
import { CloudEditFactory } from './Factories/CloudEditFactory';
import { RequestFollowUserFactory } from './Factories/RequestFollowUserFactory';
import { RequestGameFactory } from './Factories/RequestGameFactory';
import { RequestGameJobFactory } from './Factories/RequestGameJobFactory';
import { RequestPlayWithPartyFactory } from './Factories/RequestPlayWithPartyFactory';
import { RequestPrivateGameFactory } from './Factories/RequestPrivateGameFactory';
import { IGameLaunchFactoryBase } from './Interfaces/IGameLaunchFactoryBase';
import { GameLaunchRequestProcessor } from './RequestProcessor';

export class GameLaunchFactory {
	private static _response: Response;

	public static IsInitialized = false;

	public static Init(response: Response) {
		if (!this.IsInitialized) {
			GameLaunchFactory._response = response;
			this.IsInitialized = true;
		}
	}

	public static Get(type: RequestType): IGameLaunchFactoryBase {
		switch (type) {
			case RequestType.RequestGame:
				/* We are requesting a game, if there is a game session existent already, use that. */
				return new RequestGameFactory(GameLaunchFactory._response);
			case RequestType.RequestGameJob:
				/* We are requesting a game with an explicit gameID */
				return new RequestGameJobFactory(GameLaunchFactory._response);
			case RequestType.CloudEdit:
				/* We are requesting a cloud edit session */
				return new CloudEditFactory(GameLaunchFactory._response);
			case RequestType.RequestFollowUser:
				/* We are following another user. */
				return new RequestFollowUserFactory(GameLaunchFactory._response);
			case RequestType.RequestPlayWithParty:
				/* DEPRECATED */
				return new RequestPlayWithPartyFactory(GameLaunchFactory._response);
			case RequestType.RequestPrivateGame:
				/* We are joining a private game, use the PrivateGameFactory in Roblox.Platform.Assets.Places */
				return new RequestPrivateGameFactory(GameLaunchFactory._response);
			default:
				/* Just in case it makes it past the request type check. */
				GameLaunchRequestProcessor.ReportISXError(GameLaunchFactory._response, 'Invalid request type');
				break;
		}
	}
}
