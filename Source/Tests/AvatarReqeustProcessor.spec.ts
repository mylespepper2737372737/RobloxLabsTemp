import { CachePolicy } from '../Assemblies/Http/ServiceClient/Roblox.Http.ServiceClient/Models/IClientRequest';
import { AvatarRequestProcessor } from '../Assemblies/Web/Avatars/Roblox.Web.Avatars/AvatarRequestProcessor';

describe('AvatarRequestProcessor', () => {
	it("Should be able to fetch the user's character string from their user ID and then clear the cache after 30s", async () => {
		const cachedRequestProcessor = new AvatarRequestProcessor(CachePolicy.SateAfterThirtySeconds, null);

		await cachedRequestProcessor.GetAvatarAccoutrementsAsync(1, null, false);

		setTimeout(() => {
			expect(AvatarRequestProcessor.IsCacheCleared).toEqual(true);
		}, 30000);
	});
});
