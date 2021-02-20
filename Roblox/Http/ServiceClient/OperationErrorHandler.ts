import { IHttpRequest, IHttpResponse } from './Http';

export namespace OperationErrorHandler {
	export function CheckResponse(httpResponse: IHttpResponse, httpRequest: IHttpRequest) {
		if (httpResponse.StatusCode > 200) {
			return false;
		}
		return true;
	}
}
