import { IGameLaunchRequestBase } from './IGameLaunchRequestBase';

export interface IGameLaunchFactoryBase<TFactoryResponse> {
	Validate(request: IGameLaunchRequestBase): void;

	Request(): TFactoryResponse;
}
