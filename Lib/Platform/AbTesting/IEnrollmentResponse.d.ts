import { ExperimentStatusEnum } from './ExperimentStatusEnum';
import { SubjectTypeEnum } from './SubjectTypeEnum';
export interface IEnrollmentResponse {
    SubjectType: SubjectTypeEnum;
    SubjectTargetId: Number;
    ExperimentName: String;
    Status: ExperimentStatusEnum;
    Variation: String;
}
