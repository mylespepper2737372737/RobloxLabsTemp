import { Task } from '../../../Http/Task';
import { IDataStoreApiResponse } from '../../../Platform/Persistence/IDataStoreApiResponse';
import { IDataStoreRequest } from '../../../Platform/Persistence/IDataStoreRequest';
export declare namespace GamePeristenceRequestProcessor {
    function GetDataStoresForTheUniverse(Request: IDataStoreRequest, RequireSecureUri: Boolean): Task<[Boolean, IDataStoreApiResponse]>;
}
