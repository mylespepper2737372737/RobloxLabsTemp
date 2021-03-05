import { Task } from '../../../../Http/Task';
import { IEnrollment } from '../../../../Platform/AbTesting/IEnrollment';
export declare namespace AbTestingClient {
    function TryEnrollToExperiments(enrollments: Array<IEnrollment>, UserAuthToken: String, requireSecureUri: Boolean): Task<[Boolean, String, Number | null]>;
}
