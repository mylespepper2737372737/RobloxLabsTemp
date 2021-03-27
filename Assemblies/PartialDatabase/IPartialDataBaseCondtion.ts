import { PartialDatabaseConditionType } from './PartialDatabaseConditionType';

export interface IPartialDataBaseCondition<TEntity, TKey extends keyof TEntity, TValue extends TEntity[TKey]> {
	Key: TKey;
	Condition: PartialDatabaseConditionType;
	Value: TValue;
}
