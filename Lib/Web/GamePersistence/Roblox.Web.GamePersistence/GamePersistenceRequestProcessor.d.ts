import { Task } from '../../../Http/Task';
import { IDataStoreApiResponse } from '../../../Platform/GamePersistence/IDataStoreApiResponse';
import { IDataStoreRequest } from '../../../Platform/GamePersistence/IDataStoreRequest';
export declare namespace GamePeristenceRequestProcessor {
    function GetDataStoresForTheUniverse(Request: IDataStoreRequest): Task<[Boolean, IDataStoreApiResponse]>;
}
