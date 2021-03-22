import { IHttpRequest, IHttpResponse } from './Http';

export namespace OperationErrorHandler {
	export function CheckResponse(httpResponse: IHttpResponse, httpRequest: IHttpRequest) {
		return true;
	}
}
