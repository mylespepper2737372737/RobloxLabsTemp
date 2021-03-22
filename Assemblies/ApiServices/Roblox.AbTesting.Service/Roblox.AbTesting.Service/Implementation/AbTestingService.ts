import { Experiments } from '../../../../Data/AbTesting/Experiments';
import { IEnrollment } from '../../../../Platform/AbTesting/IEnrollment';
import { ExperimentStatusEnum } from '../../../../Platform/AbTesting/ExperimentStatusEnum';
import { SubjectTypeEnum } from '../../../../Platform/AbTesting/SubjectTypeEnum';
import { Response } from 'express';

export namespace AbTestingService {
	export function HandleEnrollTo(enrollments: Array<IEnrollment>, response: Response) {
		const experimentStatuses = [];
		// Begin validations for enrollments
		enrollments.forEach((enrollment) => {
			// We are verifying if this enrollment is safe
			if (enrollment) {
				const experiment_status = Experiments.GetExperimentStatus(enrollment);
				const experiment = {
					ExperimentName: experiment_status.ExperimentName,
					SubjectTargetId: experiment_status.SubjectTargetId,
					SubjectType: '',
					Status: '',
					Variation: experiment_status.Variation,
				};
				switch (experiment_status.Status) {
					case ExperimentStatusEnum.Enrolled:
						experiment.Status = 'Enrolled';
						break;
					case ExperimentStatusEnum.Inactive:
						experiment.Status = 'Inactive';
						break;
					case ExperimentStatusEnum.NoExperiment:
						experiment.Status = 'NoExperiment';
						break;
				}
				switch (experiment_status.SubjectType) {
					case SubjectTypeEnum.User:
						experiment.SubjectType = 'User';
						break;
					case SubjectTypeEnum.BrowserTracker:
						experiment.SubjectType = 'BrowserTracker';
						break;
				}
				experimentStatuses.push(experiment);
			}
		});
		return response.send({ data: experimentStatuses });
	}
}
