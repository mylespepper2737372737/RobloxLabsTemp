import { Response } from 'express';
import { IUser } from '../../../Platform/Membership/IUser';
import { IUniverse } from '../../../Platform/Universes/IUniverse';
export declare namespace PointsService {
    function HandleGetAllTimePoints(user: IUser, universe: IUniverse, response: Response): Response<any, Record<string, any>>;
    function AskIfWeAreAvailable(response: Response): boolean;
}
