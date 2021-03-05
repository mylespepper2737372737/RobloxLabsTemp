import { IUniverse } from '../Universes/IUniverse';
export interface IDataStoreRequest {
    Universe: IUniverse;
    UserSecurityToken: String;
    MaxItemsToReturn: Number;
}
