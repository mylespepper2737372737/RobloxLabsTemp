import { Response } from 'express';
import { BaseURL } from '../Common/Client/Roblox.Common.Client/BaseUrl';
import { DFFlag, DFString, DYNAMIC_FASTFLAGVARIABLE, DYNAMIC_FASTSTRINGVARIABLE } from '../Web/Util/Roblox.Web.Util/Logging/FastLog';

DYNAMIC_FASTFLAGVARIABLE('DoesTheWorldGetToViewTheSite', false);
DYNAMIC_FASTFLAGVARIABLE('CanAdminsBypassTheSystem', false);
DYNAMIC_FASTFLAGVARIABLE('NoMaintenance', false);
DYNAMIC_FASTSTRINGVARIABLE('RobloxLabsSecurityToken', 'ljWby+/HVsZXJLfRkoljWby+/HVsZXJLfRko9mPQ9mPQ==');

export function ValidateDoesTheWorldGetToViewTheSite(
	method: string,
	returnUrl: string,
	secToken: string,
	response: Response,
	doNotRedirect = false,
	allowNoMaintenance = false,
) {
	if (method === 'OPTIONS') return true;
	if (
		DFFlag('CanAdminsBypassTheSystem') &&
		(secToken === DFString('RobloxLabsSecurityToken') || secToken === encodeURIComponent(DFString('RobloxLabsSecurityToken')))
	)
		return true;
	if (!DFFlag('NoMaintenance') && DFFlag('DoesTheWorldGetToViewTheSite')) return true;

	if (!DFFlag('DoesTheWorldGetToViewTheSite')) {
		if (DFFlag('NoMaintenance') && allowNoMaintenance) {
			response.status(503).send('The service is unavailable.');
			return false;
		}
		if (!doNotRedirect) response.redirect(BaseURL.GetSecureBaseURL() + '/login/maintenance/?ReturnUrl=' + returnUrl);
		return false;
	}
	return true;
}
