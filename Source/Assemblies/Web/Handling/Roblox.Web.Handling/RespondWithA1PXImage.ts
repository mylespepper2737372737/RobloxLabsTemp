import { Response } from 'express';
import { __baseDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';

export function RespondWithA1PXImage(response: Response) {
	return response.sendFile(__baseDirName + '/InternalCDN/1px.png');
}
