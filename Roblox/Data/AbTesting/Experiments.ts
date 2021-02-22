import { Roblox } from '../../Api';
import { IEnrollment } from '../../Platform/AbTesting/IEnrollment';
import { IEnrollmentResponse } from '../../Platform/AbTesting/IEnrollmentResponse';
import { IExperimentStatus } from '../../Platform/AbTesting/IExperimentStatus';

export let UserExperiments = {};
export let BrowserTrackerExperiments = {};
export let SharedExperiments = {};
export const Setting = {
	done: false,
};

export namespace Experiments {
	function InternalInitializeExperimentsFromManifest() {
		UserExperiments = Roblox.Api.Helpers.Util.ClientSettings.GetUserExperiments();
		BrowserTrackerExperiments = Roblox.Api.Helpers.Util.ClientSettings.GetBrowserTrackerExperiments();
		SharedExperiments = Roblox.Api.Helpers.Util.ClientSettings.GetSharedExperiments();
		Setting.done = true;
		return;
	}
	export function GetExperimentStatus(enrollment: IEnrollment): IEnrollmentResponse {
		if (!Setting.done) {
			InternalInitializeExperimentsFromManifest();
		}
		// Validate the AbTest when we get Roblox.Api.Helpers.Util.AbTestManifest
		return <IEnrollmentResponse>{
			ExperimentName: enrollment.ExperimentName,
			SubjectTargetId: enrollment.SubjectTargetId,
			SubjectType: enrollment.SubjectType,
			Status: IExperimentStatus.Inactive,
			Variation: null,
		};
	}
}
