import { IEmail } from '../Credentials/IEmail';
import { IPassword } from '../Credentials/IPassword';
import { UserModelBuildersClubMembershipTypeEnum } from './UserModelBuildersClubMembershipTypeEnum';
export interface IUser {
	/*Number*/ UserId: Number;
	/*String*/ UserName: String;
	/*String*/ DisplayName: String;
	/*UserModelBuildersClubMembershipTypeEnum*/ MembershipType: UserModelBuildersClubMembershipTypeEnum;
	/*String*/ SecurityToken: String;
	/*String*/ Description: String;
	/*IPassword*/ Password: IPassword;
	/*String*/ Created: String;
	/*Boolean*/ IsBanned: Boolean;
	/*IEmail*/ Email: IEmail;
	/*Boolean*/ HasPasswordSet: Boolean;
	/*Number*/ AgeBracket: Number;
	/*Array*/ Roles: Array<String>;
	/*Number*/ RobuxBalance: Number;
	/*Number*/ NotificationCount: Number;
	/*Boolean*/ EmailNotificationsEnabled: Boolean;
	/*String*/ CountryCode: String;
	/*Boolean*/ UserAbove13: Boolean;
	/*String*/ ThumbnailUrl: String;
	/*Boolean*/ IsAnyBuildersClubMember: Boolean;
	/*Boolean*/ IsPremium: Boolean;
	/*Boolean*/ ChangeUsernameEnabled: Boolean;
	/*Boolean*/ IsAdmin: Boolean;
}
