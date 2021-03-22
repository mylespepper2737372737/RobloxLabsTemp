import { AssetRequestProcessor } from '../Web/Assets/Roblox.Web.Assets/AssetRequestProcessor';

(async () => {
	await AssetRequestProcessor.GetUri('', {}, false, false, 'hash');
})();
