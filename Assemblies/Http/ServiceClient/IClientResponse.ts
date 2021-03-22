import { HttpRequestMethodEnum } from './HttpRequestMethodEnum';
import { IHttpHeaders } from './IHttpHeaders';

export interface IClientResponse {
	/*String*/ Url: String;
	/*HttpRequestMethodEnum*/ Method: HttpRequestMethodEnum;
	/*Nullable*/ ResponsePayload: any;
	/*IHttpHeaders*/ Headers: IHttpHeaders;
	/*Int32*/ StatusCode: Number;
	/*String*/ StatusMessage: String;
}
