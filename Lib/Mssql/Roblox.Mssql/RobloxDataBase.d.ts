import { RobloxDAL } from './IRobloxDAL';
import { IRobloxDataBase } from './IRobloxDataBase';
import { IRobloxEntity } from './IRobloxEntity';
export declare class RobloxDataBase implements IRobloxDataBase {
    private _Name;
    private _Dal;
    private constructor();
    From<TEntity extends IRobloxEntity, TPrimaryEntityKey extends keyof TEntity>(primaryKey: TPrimaryEntityKey): IRobloxEntity;
    get Name(): any;
    get DAL(): any;
    static GetDataBaseByDAL<TDal extends RobloxDAL>(dal: TDal): RobloxDataBase;
}
