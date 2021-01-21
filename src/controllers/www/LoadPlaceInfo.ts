import crypto from 'crypto';
import fs from 'fs';
import { _dirname } from '../../modules/constants/directories';
const txt =
	'-- Loaded by StartGameSharedScript --\r\npcall(function() game:SetCreatorID(0, Enum.CreatorType.User) end)\r\npcall(function() game:GetService("SocialService"):SetFriendUrl("http://www.mfdlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsFriendsWith&playerid=%d&userid=%d") end)\r\npcall(function() game:GetService("SocialService"):SetBestFriendUrl("http://www.mfdlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsBestFriendsWith&playerid=%d&userid=%d") end)\r\npcall(function() game:GetService("SocialService"):SetGroupUrl("http://www.mfdlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsInGroup&playerid=%d&groupid=%d") end)\r\npcall(function() game:GetService("SocialService"):SetGroupRankUrl("http://www.mfdlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRank&playerid=%d&groupid=%d") end)\r\npcall(function() game:GetService("SocialService"):SetGroupRoleUrl("http://www.mfdlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=%d&groupid=%d") end)\r\npcall(function() game:GetService("GamePassService"):SetPlayerHasPassUrl("http://api.mfdlabs.com/Game/GamePass/GamePassHandler.ashx?Action=HasPass&UserID=%d&PassID=%d") end)\r\npcall(function() game:GetService("MarketplaceService"):SetProductInfoUrl("http://api.mfdlabs.com/marketplace/productinfo?assetId=%d") end)\r\npcall(function() game:GetService("MarketplaceService"):SetDevProductInfoUrl("http://api.mfdlabs.com/marketplace/productDetails?productId=%d") end)\r\npcall(function() game:GetService("MarketplaceService"):SetPlayerOwnsAssetUrl("http://api.mfdlabs.com/ownership/hasasset?userId=%d&assetId=%d") end)\r\npcall(function() game:SetPlaceVersion(0) end)';

export default {
	dir: '/Game/LoadPlaceInfo.ashx',
	method: 'all',
	func: (_req: unknown, res: { send: (arg0: string) => void }): void => {
		const sign = crypto.createSign('sha1');
		const dick = '\r\n' + txt;
		sign.write(dick);
		sign.end();

		const key = fs.readFileSync(_dirname + '\\rbx\\PrivateKey.pem');
		const sig = sign.sign(key, 'base64');

		const out = `--rbxsig%${sig}%${dick}`;

		res.send(out);
	},
};
