import { Response } from 'express';
import { ICustomError } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
export declare namespace Errors {
    function RespondWithCustomErrors(statusCode: number, customErrors: ICustomError[], response: Response, shouldEndResponse?: boolean): void;
    function RespondWithAHttpError(response: Response, exception: Error): void;
    function RespondWithInternalServerError(response: Response): void;
    function RespondWithAHttpStatusError(status: number, response: Response): void;
    function RespondWithADefaultHttpError(status: number, response: Response): void;
    function RespondWithADetailedError(response: Response, exception: Error): void;
}
