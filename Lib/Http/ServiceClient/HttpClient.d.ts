import { Task } from '../Task';
import { IClientRequest } from './IClientRequest';
import { IClientResponse } from './IClientResponse';
export declare namespace ServiceClient {
    class HttpClient {
        private request;
        constructor(request: IClientRequest);
        execute(): Task<[Boolean, IClientResponse]>;
    }
}
