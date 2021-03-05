import { HttpRequestMethodEnum } from './HttpRequestMethodEnum';
import { IHttpHeaders } from './IHttpHeaders';
import { IHttpQueries } from './IHttpQueries';
export interface IClientRequest {
    Url: String;
    Method: HttpRequestMethodEnum;
    Payload: String;
    AdditionalHeaders: IHttpHeaders;
    QueryString: IHttpQueries;
}
