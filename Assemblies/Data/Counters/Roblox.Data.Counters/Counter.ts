import { DFLog, DYNAMIC_LOGGROUP, FASTLOGS } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { Task } from '../../../Http/Task';
import { PartialDataBase } from '../../../PartialDatabase/PartialDataBase';
import { PartialDatabaseConditionType } from '../../../PartialDatabase/PartialDatabaseConditionType';
import { ICounter } from './ICounter';
import { SanitizeData } from '../../../Util/SanitizeData'

DYNAMIC_LOGGROUP('Tasks');

export class Counter implements ICounter {
	public Id: Number;
	public Name: string;
	public Count: number;
	

	public static async IncrementCounter(Name_: string, Amount: number): Task<number> {
		let Name = SanitizeData(Name_)
		const db = new PartialDataBase('RobloxAnalytics', 'root', 'Io9/9DEF'); //change back to 'Io9/9DEF'
		const [didConnect, err] = await db.Connect();
		if (!didConnect) {
			FASTLOGS(DFLog('Tasks'), '[DFLog::Tasks] Error when connecting to DB: %s', err);
			return 500;

			return null;
		}
		const [, , sessions] = db.GetTable<ICounter>('counter', 'Id', true);
		const [, message, result] = await sessions.SelectKeysWhere(['Id', 'Count'], {
			Key: 'Name',
			Condition: PartialDatabaseConditionType.Equal,
			Value: Name,
		});
		if (result.Rows[0] == null) {
			FASTLOGS(DFLog['Tasks'], "[DFLog::Tasks] Counter doesn't exist: %s", message);
			const count = new Counter();
			count.Name = Name;
			count.Count = Amount;
			const [s, m] = await sessions.InsertValues([
				{ Key: "Name", Value: Name },
				{ Key: "Count", Value: Amount }
			])
			if (!s) {
				FASTLOGS(DFLog['Tasks'], "[DFLog::Tasks] Error Creating Counter %s", m);
				return 500;

			}
			await db.Disconnect()
			return 200;
		} else {
			const countOld = result.Rows[0];
			let n = <number>countOld.Data[1].Value;
			n+=Amount
			const [s, m] = await sessions.UpdateKey("Count", n, {
				Key: 'Name',
				Condition: PartialDatabaseConditionType.Equal,
				Value: Name,
			})
			if (!s) {
				FASTLOGS(DFLog['Tasks'], "[DFLog::Tasks] Error Updating Counter %s", m);
				return 500;

			}
			const count = new Counter();
			count.Name = Name;

			count.Count = n;
			await db.Disconnect()
			return 200;

		}
		
		
	}

	
}
