import { IHttpRequest, IHttpResponse } from './Http';
export declare namespace OperationErrorHandler {
    function CheckResponse(httpResponse: IHttpResponse, httpRequest: IHttpRequest): boolean;
}
