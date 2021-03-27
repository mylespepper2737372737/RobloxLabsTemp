import { IPartialDataBaseRowsByKeyValueModel } from './IPartialDataBaseRowsByKeyValueModel';

export interface IPartialDataBaseRowsByKeyModel<TEntity, TKey extends keyof TEntity, TValue extends TEntity[TKey]> {
	/*IPartialDataBaseRowsByKeyValueModel<TEntity, TKey, TValue>[]*/ Data: IPartialDataBaseRowsByKeyValueModel<TEntity, TKey, TValue>[];
}
