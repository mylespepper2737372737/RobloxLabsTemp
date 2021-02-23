import { IUniverse } from '../Universes/IUniverse';
import { IDataStoreRequestPayload } from './IDataStoreRequestPayload';

export interface IDataStoreRequest {
	/*IUniverse*/ Universe: IUniverse;
	/*String*/ UserSecurityToken: String;
	/*Array<IDataStoreRequestPayload>*/ Payloads: Array<IDataStoreRequestPayload>;
	/*Number*/ MaxItemsToReturn: Number;
}
