import { Task } from '../../../Http/Task';
import { IExperiment } from '../../../Platform/AbTesting/IExperiment';
import { IBrowserTracker } from '../../../Platform/Membership/IBrowserTracker';
import { IUser } from '../../../Platform/Membership/IUser';
export declare namespace AbTestingRequestProcessor {
    function TryEnrollToExperiment(experimentName: String, user: IUser, browserTracker: IBrowserTracker, requireSecureUri: Boolean): Task<[Boolean, String]>;
    function TryEnrollToExperiments(experiments: Array<IExperiment>, user: IUser, browserTracker: IBrowserTracker, requireSecureUri: Boolean): Task<[Boolean, String, Number | null]>;
}
