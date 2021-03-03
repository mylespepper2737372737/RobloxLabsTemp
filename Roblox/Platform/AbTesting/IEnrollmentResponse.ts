import { ExperimentStatusEnum } from './ExperimentStatusEnum';
import { SubjectTypeEnum } from './SubjectTypeEnum';

export interface IEnrollmentResponse {
	/*ISubjectType*/ SubjectType: SubjectTypeEnum;
	/*Number*/ SubjectTargetId: Number;
	/*String*/ ExperimentName: String;
	/*IExperimentStatus*/ Status: ExperimentStatusEnum;
	/*String*/ Variation: String;
}
