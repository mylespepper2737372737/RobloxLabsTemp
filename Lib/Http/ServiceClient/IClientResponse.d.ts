import { HttpRequestMethodEnum } from './HttpRequestMethodEnum';
import { IHttpHeaders } from './IHttpHeaders';
export interface IClientResponse {
    Url: String;
    Method: HttpRequestMethodEnum;
    ResponsePayload: any;
    Headers: IHttpHeaders;
    StatusCode: Number;
    StatusMessage: String;
}
