import { RobloxDataBase } from '../../Mssql/Roblox.Mssql/RobloxDataBase';
import { DAL } from './TestDAL';
import { ITestEntity } from './TestEntity';

const db = RobloxDataBase.GetDataBaseByDAL(new DAL());
db.From<ITestEntity, 'Id'>('Id');
