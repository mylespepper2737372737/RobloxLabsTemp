import { HttpRequestMethodEnum } from '../Enumeration/HttpRequestMethodEnum';
import { IHttpHeaders } from './JSON/IHttpHeaders';

export interface IClientResponse {
	/*String*/ Url: System.String;
	/*HttpRequestMethodEnum*/ Method: HttpRequestMethodEnum;
	/*Nullable*/ ResponsePayload: any;
	/*IHttpHeaders*/ Headers: IHttpHeaders;
	/*Int32*/ StatusCode: System.Int32;
	/*String*/ StatusMessage: System.String;
}
