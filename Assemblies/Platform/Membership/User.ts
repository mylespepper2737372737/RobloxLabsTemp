import { IEmail } from '../Credentials/IEmail';
import { IPassword } from '../Credentials/IPassword';
import { IUser } from './IUser';
import { UserModelBuildersClubMembershipTypeEnum } from './UserModelBuildersClubMembershipTypeEnum';

export class User implements IUser {
	public Id: Number;
	public Name: String;
	public DisplayName: String;
	public MembershipType: UserModelBuildersClubMembershipTypeEnum;
	public SecurityToken: String;
	public Description: String;
	public Password: IPassword;
	public Created: String;
	public IsBanned: Boolean;
	public Email: IEmail;
	public HasPasswordSet: Boolean;
	public AgeBracket: Number;
	public Roles: String[];
	public RobuxBalance: Number;
	public NotificationCount: Number;
	public EmailNotificationsEnabled: Boolean;
	public CountryCode: String;
	public UserAbove13: Boolean;
	public ThumbnailUrl: String;
	public IsAnyBuildersClubMember: Boolean;
	public IsPremium: Boolean;
	public ChangeUsernameEnabled: Boolean;
	public IsAdmin: Boolean;

	/**
	 * Partial implementation, full implementation when DataBase is fully setup.
	 * @param {number} Id The userId.
	 * @returns {IUser} Returns an IUser.
	 */
	public static GetByUserId(Id: number): IUser {
		const user = new User();
		user.Id = Id;
		user.Name = 'Test';
		user.DisplayName = 'Test';
		user.MembershipType = UserModelBuildersClubMembershipTypeEnum.None;
		return user;
	}
}
