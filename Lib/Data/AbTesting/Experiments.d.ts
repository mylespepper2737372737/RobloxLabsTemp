import { IEnrollment } from '../../Platform/AbTesting/IEnrollment';
import { IEnrollmentResponse } from '../../Platform/AbTesting/IEnrollmentResponse';
export declare let UserExperiments: {};
export declare let BrowserTrackerExperiments: {};
export declare let SharedExperiments: {};
export declare const Setting: {
    done: boolean;
};
export declare namespace Experiments {
    function GetExperimentStatus(enrollment: IEnrollment): IEnrollmentResponse;
}
