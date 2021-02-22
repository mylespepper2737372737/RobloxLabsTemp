import { Experiments } from '../../../../Data/AbTesting/Experiments';
import { IHttpResponse } from '../../../../Http/ServiceClient/Http';
import { IEnrollment } from '../../../../Platform/AbTesting/IEnrollment';
import { IExperimentStatus } from '../../../../Platform/AbTesting/IExperimentStatus';
import { ISubjectType } from '../../../../Platform/AbTesting/ISubjectType';

export namespace AbTestingService {
	export function HandleEnrollTo(enrollments: Array<IEnrollment>, response: IHttpResponse) {
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
					case IExperimentStatus.Enrolled:
						experiment.Status = 'Enrolled';
						break;
					case IExperimentStatus.Inactive:
						experiment.Status = 'Inactive';
						break;
					case IExperimentStatus.NoExperiment:
						experiment.Status = 'NoExperiment';
						break;
				}
				switch (experiment_status.SubjectType) {
					case ISubjectType.User:
						experiment.SubjectType = 'User';
						break;
					case ISubjectType.BrowserTracker:
						experiment.SubjectType = 'BrowserTracker';
						break;
				}
				experimentStatuses.push(experiment);
			}
		});
		return response.send({ data: experimentStatuses });
	}
}
