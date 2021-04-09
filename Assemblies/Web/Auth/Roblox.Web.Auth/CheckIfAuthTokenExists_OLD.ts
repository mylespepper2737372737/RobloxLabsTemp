import { GetManifests } from '../../../Caching/Database/Roblox.Caching.Database/DEPRECATED_GetManifest';

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
