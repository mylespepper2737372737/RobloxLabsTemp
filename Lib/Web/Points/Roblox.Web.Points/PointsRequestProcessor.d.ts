import { Response } from 'express';
import { Task } from '../../../Http/Task';
import { IUser } from '../../../Platform/Membership/IUser';
import { IUniverse } from '../../../Platform/Universes/IUniverse';
export declare namespace PointsRequestProcessor {
    function GetUserAllTimePoints(universe: IUniverse, user: IUser): Task<[Boolean, Number, any, Error]>;
    function CheckUniverseAndUser(universeId: number, userId: number, response: Response): [boolean, IUniverse, IUser];
}
