import { HttpRequestMethodEnum } from './HttpRequestMethodEnum';
import { IHttpHeaders } from './IHttpHeaders';

export interface IClientResponse {
	/*String*/ Url: String;
	/*HttpRequestMethodEnum*/ Method: HttpRequestMethodEnum;
	/*String*/ ResponsePayload: String;
	/*IHttpHeaders*/ Headers: IHttpHeaders;
	/*Int32*/ StatusCode: Number;
	/*String*/ StatusMessage: String;
}
