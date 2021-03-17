/// <reference types="Roblox/System" />

declare namespace Roblox.AbTesting.Api.Models.Request {
	class EnrollmentResponseModel {
		public SubjectType: SubjectType;
		public SubjectTargetId: Int64;
		public ExperimentName: String;
		public Variation: Int32;
	}
}
