import { IUser } from '../Membership/IUser';
import { IUniverse } from '../Universes/IUniverse';

export interface IDataStoreRequest {
	/*IUniverse*/ Universe: IUniverse;
	/*IUser*/ User: IUser;
	/*Int32*/ MaxItemsToReturn: System.Int32;
}
