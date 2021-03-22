import { StatusCodes } from '../../Web/Util/Roblox.Web.Util/StatusCodes';

export namespace ServiceClientExceptions {
	export class HttpException {
		private Url: String;
		private Status: Number;
		private MachineId: String;
		private ErrorCode: String;
		private Message: String;
		constructor(Url: String, Message = 'Error', StatusCode = 0, MachineId = 'None', ErrorCode = 'None') {
			this.Url = Url;
			this.Status = StatusCode;
			this.MachineId = MachineId;
			this.ErrorCode = ErrorCode;
			this.Message = Message;
		}
		public fetch(): Error {
			return new Error(`${this.Message}. Roblox.Http.ServiceClientExceptions.HttpException: An error has occurred with your request.
	Status code: ${StatusCodes[this.Status.toString()]} (${this.Status})
	Url: ${this.Url.split('?').shift()}
	Response Machine Id: ${this.MachineId}
	Error code: ${this.ErrorCode} (None)`);
		}
	}
}
