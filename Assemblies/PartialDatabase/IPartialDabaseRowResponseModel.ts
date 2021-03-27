import { IPartialDataBaseRowsByKeyModel } from './IPartialDataBaseRowsByKeyModel';

export interface IPartialDabaseRowResponseModel<TEntity, TKey extends keyof TEntity, TValue extends TEntity[TKey]> {
	/*IPartialDataBaseRowsByKeyModel<TEntity, TKey, TValue>[]*/ Rows: IPartialDataBaseRowsByKeyModel<TEntity, TKey, TValue>[];
}
