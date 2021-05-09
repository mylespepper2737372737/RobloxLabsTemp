import { ResponseStatus } from '../Enumeration/ResponseStatus';
import { IGameLaunchRequestBase } from './IGameLaunchRequestBase';

export type ReportDebatableErrorDelegate = (status: ResponseStatus, message: string) => void;

export interface IGameLaunchFactoryBase {
	Invoke(request: IGameLaunchRequestBase, reportDebatableErrorDelegate: ReportDebatableErrorDelegate): bool;
}
