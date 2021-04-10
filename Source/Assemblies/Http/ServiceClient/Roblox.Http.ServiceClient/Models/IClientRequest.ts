import { HttpRequestMethodEnum } from '../Enumeration/HttpRequestMethodEnum';
import { IHttpHeaders } from './JSON/IHttpHeaders';
import { IHttpQueries } from './JSON/IHttpQueries';

export interface IClientRequest {
	/*String*/ Url: String;
	/*HttpRequestMethodEnum*/ Method: HttpRequestMethodEnum;
	/*String*/ Payload: String;
	/*IHttpHeaders*/ AdditionalHeaders: IHttpHeaders;
	/*IHttpQueries*/ QueryString: IHttpQueries;
	/*String*/ FailedMessage?: String;
}
