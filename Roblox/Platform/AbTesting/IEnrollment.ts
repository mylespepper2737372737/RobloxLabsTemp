import { ISubjectType } from './ISubjectType';

export interface IEnrollment {
	/*String*/ ExperimentName: String;
	/*ISubjectType*/ SubjectType: ISubjectType;
	/*Int*/ SubjectTargetId: Number;
}
