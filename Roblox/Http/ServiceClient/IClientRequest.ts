import { HttpRequestMethodEnum } from './HttpRequestMethodEnum';
import { IHttpHeaders } from './IHttpHeaders';
import { IHttpQueries } from './IHttpQueries';

export interface IClientRequest {
	/*String*/ Url: String;
	/*HttpRequestMethodEnum*/ Method: HttpRequestMethodEnum;
	/*String*/ Payload: String;
	/*IHttpHeaders*/ AdditionalHeaders: IHttpHeaders;
	/*IHttpQueries*/ QueryString: IHttpQueries;
}
