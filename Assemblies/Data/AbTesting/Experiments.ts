import { RobloxLegacy } from '../../Api';
import { IEnrollment } from '../../Platform/AbTesting/IEnrollment';
import { IEnrollmentResponse } from '../../Platform/AbTesting/IEnrollmentResponse';
import { ExperimentStatusEnum } from '../../Platform/AbTesting/ExperimentStatusEnum';

export let UserExperiments = {};
export let BrowserTrackerExperiments = {};
export let SharedExperiments = {};
export const Setting = {
	done: false,
};

export namespace Experiments {
	function InternalInitializeExperimentsFromManifest() {
		UserExperiments = RobloxLegacy.Api.Helpers.Util.ClientSettings.GetUserExperiments();
		BrowserTrackerExperiments = RobloxLegacy.Api.Helpers.Util.ClientSettings.GetBrowserTrackerExperiments();
		SharedExperiments = RobloxLegacy.Api.Helpers.Util.ClientSettings.GetSharedExperiments();
		Setting.done = true;
		return;
	}
	export function GetExperimentStatus(enrollment: IEnrollment): IEnrollmentResponse {
		if (!Setting.done) {
			InternalInitializeExperimentsFromManifest();
		}
		// Validate the AbTest when we get Roblox.Data.Helpers.AbTestManifest
		return <IEnrollmentResponse>{
			ExperimentName: enrollment.ExperimentName,
			SubjectTargetId: enrollment.SubjectTargetId,
			SubjectType: enrollment.SubjectType,
			Status: ExperimentStatusEnum.Inactive,
			Variation: null,
		};
	}
}
