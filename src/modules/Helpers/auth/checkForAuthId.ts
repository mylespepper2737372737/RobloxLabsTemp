import { GetManifests } from '../manifest/GetManifests';

export = (id: string) => {
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
