import { IUniverse } from '../Universes/IUniverse';

export interface IDataStoreRequest {
	/*IUniverse*/ Universe: IUniverse;
	/*String*/ UserSecurityToken: String;
	/*Int32*/ MaxItemsToReturn: Number;
}
