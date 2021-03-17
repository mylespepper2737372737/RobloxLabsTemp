import { SqlCondition } from './Contiion';
import { IRobloxDataBase } from './IRobloxDataBase';
import { IRobloxEntity } from './IRobloxEntity';
export declare class RobloxEntity<TEntity, TPrimaryKey extends keyof TEntity> {
    _DB: IRobloxDataBase;
    selectAllKeys: boolean;
    private canExecute;
    private keysToSelect;
    Entity: unknown;
    private constructor();
    Select<TEntityKey extends keyof TEntity>(keyOrKeys?: TEntityKey | TEntityKey[] | undefined): IRobloxEntity;
    Where<TEntityKey extends keyof TEntity, TEntityKeyValue extends TEntity[TEntityKey]>(key: TEntityKey, conition: SqlCondition, value: TEntityKeyValue): IRobloxEntity;
    Execute(): void;
    static GetOrCreate<TExtendedEntity, TPrimaryEntityKey extends keyof TExtendedEntity>(db: IRobloxDataBase, primaryKey: TPrimaryEntityKey): RobloxEntity<TExtendedEntity, TPrimaryEntityKey>;
}
