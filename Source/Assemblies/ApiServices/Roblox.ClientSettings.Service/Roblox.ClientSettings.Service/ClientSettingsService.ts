import { Response } from 'express';
import { Page } from '../../../../Services/Roblox.ClientSettings.Service/Models/Page';
import { PageRequest } from '../../../../Services/Roblox.ClientSettings.Service/Models/PageRequest';
import { ClientSettings } from '../../../Platform/ClientSettings/Roblox.Platform.ClientSettings/Implementation/ClientSettingsUtil';

export namespace ClientSettingsService {
	export namespace Setting {
		export function HandleGetPage(request: PageRequest, response: Response) {
			const partialResponse: Page = {
				TotalPageCount: 0,
				PageIndex: request.PageIndex,
				Settings: [],
			};

			// TODO Support greater than 10 requests here.
			const FSettings = ClientSettings.GetFSettings();
			FSettings.forEach((fsettingPage, idx) => {
				partialResponse.Settings.push({
					Key: fsettingPage,
					Value: idx.toString(),
				});
			});

			return response.send(partialResponse);
		}
	}
}
