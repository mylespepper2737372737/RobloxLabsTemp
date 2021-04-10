import { Response } from 'express';
import { RobloxLegacy } from '../../../Common/Legacy/Roblox.Common.Legacy/RobloxLegacyWrapper';

export function RespondWithA1PXImage(response: Response) {
	return response.sendFile(RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\InternalCDN\\1px.png');
}
