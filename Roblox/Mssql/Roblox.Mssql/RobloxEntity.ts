import { SqlCondition } from './Contiion';
import { IRobloxDataBase } from './IRobloxDataBase';
import { IRobloxEntity } from './IRobloxEntity';

export class RobloxEntity<TEntity, TPrimaryKey extends keyof TEntity> {
	public _DB: IRobloxDataBase;
	public selectAllKeys: boolean;
	private canExecute: boolean;
	private keysToSelect: any[];
	public Entity: unknown;
	private constructor(primaryKey: TPrimaryKey, db: IRobloxDataBase) {
		this._DB = db;
		this.canExecute = false;
	}

	/**
	 * Select keys from a TEntity.
	 * canExecute will be set to true after this.
	 * @param keyOrKeys
	 * @returns
	 */
	public Select<TEntityKey extends keyof TEntity>(keyOrKeys?: TEntityKey | TEntityKey[] | undefined): IRobloxEntity {
		if (typeof keyOrKeys === 'undefined') this.selectAllKeys = true;
		if (typeof keyOrKeys === 'string') this.keysToSelect.push(keyOrKeys);
		if (Array.isArray(keyOrKeys)) keyOrKeys.forEach((key) => this.keysToSelect.push(key));
		this.canExecute = true;
		return this;
	}

	public Where<TEntityKey extends keyof TEntity, TEntityKeyValue extends TEntity[TEntityKey]>(
		key: TEntityKey,
		conition: SqlCondition,
		value: TEntityKeyValue,
	): IRobloxEntity {
		return this;
	}

	public Execute() {
		if (!this.canExecute) return;
	}

	public static GetOrCreate<TExtendedEntity, TPrimaryEntityKey extends keyof TExtendedEntity>(
		db: IRobloxDataBase,
		primaryKey: TPrimaryEntityKey,
	) {
		return new RobloxEntity<TExtendedEntity, TPrimaryEntityKey>(primaryKey, db);
	}
}
