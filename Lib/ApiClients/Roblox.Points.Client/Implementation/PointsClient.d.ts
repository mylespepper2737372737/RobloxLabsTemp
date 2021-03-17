import { Task } from '../../../Http/Task';
import { IUser } from '../../../Platform/Membership/IUser';
import { IUniverse } from '../../../Platform/Universes/IUniverse';
export declare namespace PointsClient {
    function CheckHealth(isRequestSecure?: boolean): Task<[Boolean, Number, String, String]>;
    function GetUserAllTimePoints(user: IUser, universe: IUniverse, isRequestSecure?: boolean): Task<[Boolean, Number, any, Error]>;
}
