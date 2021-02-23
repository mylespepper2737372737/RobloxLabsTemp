import { Task } from '../../../Http/Task';
import { IDataStoreApiResponse } from '../../../Platform/Persistence/IDataStoreApiResponse';
import { IDataStoreRequest } from '../../../Platform/Persistence/IDataStoreRequest';
export namespace GamePeristenceRequestProcessor {
	export async function GetDataStoresForTheUniverse(
		Request: IDataStoreRequest,
		RequireSecureUri: Boolean,
	): Task<[Boolean, IDataStoreApiResponse]> {
		return new Promise<[Boolean, IDataStoreApiResponse]>((resumeFunction) => {});
	}
}
