import { IDataStoreRespose } from './IDataStoreRespose';
export interface IDataStoreApiResponse {
    ISODate: String;
    Message: String;
    Data: Array<IDataStoreRespose>;
}
