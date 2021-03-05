import { Response } from 'express';
import { BaseURL } from '../Data/Client/BaseUrl';
import {
	DFFlag,
	DFString,
	DYNAMIC_FASTFLAGVARIABLE,
	DYNAMIC_FASTSTRINGVARIABLE,
} from '../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

DYNAMIC_FASTFLAGVARIABLE('DoesTheWorldGetToViewTheSite', false);
DYNAMIC_FASTFLAGVARIABLE('CanAdminsBypassTheSystem', false);
DYNAMIC_FASTSTRINGVARIABLE('RobloxLabsSecurityToken', 'ljWby+/HVsZXJLfRkoljWby+/HVsZXJLfRko9mPQ9mPQ==');

export function ValidateDoesTheWorldGetToViewTheSite(
	method: string,
	returnUrl: string,
	secToken: string,
	response: Response,
	doNotRedirect = false,
) {
	if (method === 'OPTIONS') return true;
	if (
		DFFlag('CanAdminsBypassTheSystem') &&
		(secToken === DFString('RobloxLabsSecurityToken') || secToken === encodeURIComponent(DFString('RobloxLabsSecurityToken')))
	)
		return true;
	if (!DFFlag('DoesTheWorldGetToViewTheSite')) {
		if (!doNotRedirect) response.redirect(BaseURL.GetSecureBaseURL() + '/login/maintenance/?ReturnUrl=' + returnUrl);
		return false;
	}
	return true;
}
