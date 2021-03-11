import { IEnrollment } from '../../../../Platform/AbTesting/IEnrollment';
import { Response } from 'express';
export declare namespace AbTestingService {
    function HandleEnrollTo(enrollments: Array<IEnrollment>, response: Response): Response<any, Record<string, any>>;
}
