import { DFLog, DYNAMIC_LOGGROUP, FASTLOGS } from '../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { Task } from '../../Http/Task';
import { PartialDataBase } from '../../PartialDatabase/PartialDataBase';
import { PartialDatabaseConditionType } from '../../PartialDatabase/PartialDatabaseConditionType';
import { ISessionUser } from './ISessionUser';

DYNAMIC_LOGGROUP('Tasks');

// TODO: Add GetOrCreateById()
export class SessionUser implements ISessionUser {
	public Id: System.Int64; // PK AI
	public IpAddress: System.String; // Implement an IpAdress interface here.
	public LanguageCode: System.String;
	public LanguageName: System.String;

	/**
	 * Simple implementation to fetch or, create and fetch session user from the DB, expect this to cache instead.
	 * @param {System.String} IpAddress The IP address to query by.
	 * @returns {ISessionUser} Returns null if an error occured, or an {ISessionUser} if not.
	 */
	public static async GetOrCreateByIpAddress(IpAddress: string): Task<ISessionUser> {
		/* TODO: Do this connection shit in the contructor */
		const db = new PartialDataBase('RobloxMembership', 'root', 'Io9/9DEF');
		const [didConnect, err] = await db.Connect();
		if (!didConnect) {
			FASTLOGS(DFLog('Tasks'), '[DFLog::Tasks] Error when fetching session user: %s', err);
			return null;
		}
		const [, , sessionUsers] = db.GetTable<ISessionUser>('SessionUser', 'Id', true);
		const [success, message, result] = await sessionUsers.GetFromRowsAllColumnsConditional({
			Key: 'IpAddress',
			Condition: PartialDatabaseConditionType.Equal,
			Value: IpAddress,
		});
		if (!success) {
			FASTLOGS(DFLog('Tasks'), '[DFLog::Tasks] Error when fetching user: %s', message);
			return null;
		}
		const thisSession = result.Rows[0];
		const session = new SessionUser();
		if (!thisSession) {
			sessionUsers.InsertValuesIntoTable([
				{
					Key: 'IpAddress',
					Value: IpAddress,
				},
				{ Key: 'LanguageCode', Value: 'en_us' },
				{ Key: 'LanguageName', Value: 'English' },
			]);
			session.Id = null; // Make it null because we don't know what the Id will be.
			session.IpAddress = IpAddress;
			session.LanguageCode = 'en_us';
			session.LanguageName = 'English';
			return session;
		}
		session.Id = <number>(<unknown>thisSession.Data[0].Value);
		session.IpAddress = IpAddress;
		session.LanguageCode = <string>thisSession.Data[2].Value;
		session.LanguageName = <string>thisSession.Data[3].Value;
		return session;
	}
}
