import { DFLog, DYNAMIC_LOGGROUP, FASTLOGS } from '../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { Task } from '../../../Http/Task';
import { PartialDataBase } from '../../../PartialDatabase/PartialDataBase';
import { PartialDatabaseConditionType } from '../../../PartialDatabase/PartialDatabaseConditionType';
import { SanitizeData } from '../../../Util/SanitizeData';
import { ICounter } from './ICounter';

DYNAMIC_LOGGROUP('Tasks');
export class Counter implements ICounter {
	public Id: number;
	public Name: string;
	public Count: number;

	public static async CreateOrIncrementCounter(Name: string, Amount: number): Task<[boolean]> {
		return new Promise<[boolean]>(async (resumeFunction) => {
			Name = SanitizeData(Name);
			const dataBase = new PartialDataBase('RobloxAnalytics', 'root', 'Io9/9DEF'); //change back to 'Io9/9DEF'
			const [didConnect, errMessage] = await dataBase.Connect();
			if (!didConnect) {
				FASTLOGS(DFLog('Tasks'), '[DFLog::Tasks] Error when connecting to DB: %s', errMessage);
				return resumeFunction([false]);
			}
			const [, , counters] = dataBase.GetTable<ICounter>('counter', 'Id', true);

			const [, , result] = await counters.SelectKeyWhere('Count', {
				Key: 'Name',
				Condition: PartialDatabaseConditionType.Equal,
				Value: Name,
			});

			const thisCounter = result.Rows[0];

			if (!thisCounter) {
				// The counter did not exist, so we are going to create one and write the single data.
				await counters.InsertValues([
					{ Key: 'Name', Value: Name },
					{ Key: 'Count', Value: Amount },
				]);
				await dataBase.Disconnect();
				return resumeFunction([true]);
			}
			let originalAmout = parseInt(<string>thisCounter.Data[0].Value);
			if (isNaN(originalAmout)) return resumeFunction([true]);
			originalAmout += Amount;

			const [didUpdate, errMsg] = await counters.UpdateKey('Count', originalAmout, {
				Key: 'Name',
				Condition: PartialDatabaseConditionType.Equal,
				Value: Name,
			});

			if (!didUpdate) {
				FASTLOGS(DFLog['Tasks'], '[DFLog::Tasks] Error Updating Counter %s', errMsg);
				return resumeFunction([false]);
			}
			await dataBase.Disconnect();
			return resumeFunction([true]);
		});
	}
}
