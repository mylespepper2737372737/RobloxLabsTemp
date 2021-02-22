import { IExperimentStatus } from './IExperimentStatus';
import { ISubjectType } from './ISubjectType';

export interface IEnrollmentResponse {
	/*ISubjectType*/ SubjectType: ISubjectType;
	/*Number*/ SubjectTargetId: Number;
	/*String*/ ExperimentName: String;
	/*IExperimentStatus*/ Status: IExperimentStatus;
	/*String*/ Variation: String;
}
