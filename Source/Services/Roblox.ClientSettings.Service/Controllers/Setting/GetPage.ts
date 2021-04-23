import { Request, Response } from 'express';
import { ClientSettingsService } from '../../../../Assemblies/ApiServices/Roblox.ClientSettings.Service/Roblox.ClientSettings.Service/ClientSettingsService';
import { ApiKeys } from '../../../../Assemblies/Common/Client/Roblox.Common.Client/Api/ApiKeys';
import { FetchKeyFromObjectCaseInsensitive } from '../../../../Assemblies/Common/KeyValueMapping/Roblox.Common.KeyValueMapping/FetchKeyFromObjectCaseInsensitive';
import { ApiKeyValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ApiKeyValidator';
import { MethodValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/MethodValidator';
import { Page } from '../../Models/Page';
import { PageRequest } from '../../Models/PageRequest';

export default {
	method: 'all',
	func: (request: Request<null, Page, null, PageRequest>, response: Response<Page>) => {
		if (!MethodValidator.CheckMethod(request.method, 'GET', response, true)) return;
		if (
			!ApiKeyValidator.ValidateApiKeys(
				FetchKeyFromObjectCaseInsensitive(request.query, 'ApiKey'),
				[ApiKeys.ClientSettingsApi, ApiKeys.ClientSettingsApiV2],
				response,
				'The service is unavailable.',
			)
		)
			return;

		const pageIndex = parseInt(<System.String>request.query.PageIndex) || 0;
		return ClientSettingsService.Setting.HandleGetPage({ PageIndex: pageIndex }, response);
	},
};
