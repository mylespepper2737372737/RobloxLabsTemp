import { IEmail } from '../Credentials/IEmail';
import { IPassword } from '../Credentials/IPassword';
import { UserModelBuildersClubMembershipTypeEnum } from './UserModelBuildersClubMembershipTypeEnum';
export interface IUser {
	/*Int64*/ Id: Number;
	/*String*/ Name: String;
	/*String*/ DisplayName: String;
	/*UserModelBuildersClubMembershipTypeEnum*/ MembershipType: UserModelBuildersClubMembershipTypeEnum;
	/*String*/ SecurityToken: String;
	/*String*/ Description: String;
	/*IPassword*/ Password: IPassword;
	/*String*/ Created: String;
	/*Boolean*/ IsBanned: Boolean;
	/*IEmail*/ Email: IEmail;
	/*Boolean*/ HasPasswordSet: Boolean;
	/*Int32*/ AgeBracket: Number;
	/*Array*/ Roles: Array<String>;
	/*Int64*/ RobuxBalance: Number;
	/*Int32*/ NotificationCount: Number;
	/*Boolean*/ EmailNotificationsEnabled: Boolean;
	/*String*/ CountryCode: String;
	/*Boolean*/ UserAbove13: Boolean;
	/*String*/ ThumbnailUrl: String;
	/*Boolean*/ IsAnyBuildersClubMember: Boolean;
	/*Boolean*/ IsPremium: Boolean;
	/*Boolean*/ ChangeUsernameEnabled: Boolean;
	/*Boolean*/ IsAdmin: Boolean;
}
