import { RobloxDAL } from './IRobloxDAL';
import { IRobloxDataBase } from './IRobloxDataBase';
import { IRobloxEntity } from './IRobloxEntity';
import { RobloxEntity } from './RobloxEntity';

export class RobloxDataBase implements IRobloxDataBase {
	private _Name;
	private _Dal;
	private constructor(dal: unknown, name: string) {
		this._Dal = dal as typeof dal;
		this._Name = name;
	}

	/////////////////////////////
	// Public Members
	/////////////////////////////

	public From<TEntity extends IRobloxEntity, TPrimaryEntityKey extends keyof TEntity>(primaryKey: TPrimaryEntityKey): IRobloxEntity {
		return RobloxEntity.GetOrCreate<TEntity, TPrimaryEntityKey>(this, primaryKey);
	}

	public get Name() {
		return this._Name;
	}

	public get DAL() {
		return this._Dal;
	}

	/////////////////////////////
	// Static Members
	/**
	 * Best way to get a database, TDal is a database template
	 * @param dal
	 * @param dataBaseName
	 * @returns
	 */
	public static GetDataBaseByDAL<TDal extends RobloxDAL>(dal: TDal): RobloxDataBase {
		return new RobloxDataBase(dal, dal['Name']);
	}
}
