/// <reference types="Roblox/System" />

type Int64 = System.Int64;

declare namespace Roblox.AbTesting.Api.Models.Request {
	class ExperimentSubjectModel {
		public SubjectType: SubjectType;
		public SubjectTargetId: Int64;
		public ExperimentName: String;
	}
}
