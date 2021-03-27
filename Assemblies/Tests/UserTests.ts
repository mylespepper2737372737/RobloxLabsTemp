import { User } from '../Platform/Membership/User';

(async () => {
	const user = await User.GetById(2);
	console.log(user);
})();
