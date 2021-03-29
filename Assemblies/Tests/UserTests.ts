import { User } from '../Platform/Membership/User';

(async () => {
	const user = await User.GetById(2);
	console.log(user);
	const userByCookie = await User.GetByCookie('TEST');
	console.log(userByCookie);
})();
