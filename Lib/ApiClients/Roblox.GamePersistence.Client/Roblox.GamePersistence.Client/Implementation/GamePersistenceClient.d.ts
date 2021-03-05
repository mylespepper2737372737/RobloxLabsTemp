import { Task } from '../../../../Http/Task';
export declare namespace GamePersistenceClient {
    function TryFetchTheDataStoresForThisUniverse(universeId: Number, UserAuthToken: String, requireSecureUri: Boolean): Task<[Boolean, String, Number | null]>;
}
