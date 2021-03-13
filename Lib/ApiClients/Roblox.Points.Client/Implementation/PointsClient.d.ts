import { Task } from '../../../Http/Task';
export declare namespace PointsClient {
    function CheckHealth(isRequestSecure?: boolean): Task<[Boolean, Number, String, String]>;
}
