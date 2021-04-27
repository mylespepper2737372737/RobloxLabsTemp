import { IEnrollment } from '../../../Platform/AbTesting/Roblox.Platform.AbTesting/IEnrollment';
import { IEnrollmentResponse } from '../../../Platform/AbTesting/Roblox.Platform.AbTesting/IEnrollmentResponse';
import { ExperimentStatusEnum } from '../../../Platform/AbTesting/Roblox.Platform.AbTesting/ExperimentStatusEnum';
import { ClientSettings } from '../../../Platform/ClientSettings/Roblox.Platform.ClientSettings/Implementation/ClientSettingsUtil';

export let UserExperiments = {};
export let BrowserTrackerExperiments = {};
export let SharedExperiments = {};
export const Setting = {
	done: false,
};

export namespace Experiments {
	function InternalInitializeExperimentsFromManifest() {
		UserExperiments = ClientSettings.GetUserExperiments();
		BrowserTrackerExperiments = ClientSettings.GetBrowserTrackerExperiments();
		SharedExperiments = ClientSettings.GetSharedExperiments();
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
