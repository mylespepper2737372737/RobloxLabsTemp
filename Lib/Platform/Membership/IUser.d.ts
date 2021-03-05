import { IEmail } from '../Credentials/IEmail';
import { IPassword } from '../Credentials/IPassword';
import { UserModelBuildersClubMembershipTypeEnum } from './UserModelBuildersClubMembershipTypeEnum';
export interface IUser {
    UserId: Number;
    UserName: String;
    DisplayName: String;
    MembershipType: UserModelBuildersClubMembershipTypeEnum;
    SecurityToken: String;
    Description: String;
    Password: IPassword;
    Created: String;
    IsBanned: Boolean;
    Email: IEmail;
    HasPasswordSet: Boolean;
    AgeBracket: Number;
    Roles: Array<String>;
    RobuxBalance: Number;
    NotificationCount: Number;
    EmailNotificationsEnabled: Boolean;
    CountryCode: String;
    UserAbove13: Boolean;
    ThumbnailUrl: String;
    IsAnyBuildersClubMember: Boolean;
    IsPremium: Boolean;
    ChangeUsernameEnabled: Boolean;
    IsAdmin: Boolean;
}
