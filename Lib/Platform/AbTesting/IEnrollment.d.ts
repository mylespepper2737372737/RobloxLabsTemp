import { SubjectTypeEnum } from './SubjectTypeEnum';
export interface IEnrollment {
    ExperimentName: String;
    SubjectType: SubjectTypeEnum;
    SubjectTargetId: Number;
}
