import { GetManifests } from '../Roblox.DB/DEPRECATED_Roblox.Api.Helpers.DB.GetManifest';

export const CheckIfAuthTokenExists = (id: string) => {
	const Manifests = GetManifests();
	let isValidId = false;
	Manifests.forEach((value) => {
		value.sessionIds.forEach((v) => {
			if (v === id) {
				isValidId = true;
				return;
			}
		});
		if (isValidId) return;
	});
	return isValidId;
};
