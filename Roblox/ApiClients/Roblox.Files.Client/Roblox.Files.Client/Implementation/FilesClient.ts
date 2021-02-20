import Http from 'axios';
import { OperationErrorHandler } from '../../../../Http/ServiceClient/OperationErrorHandler';

export namespace FilesClient {
	export async function GetUri(hash: String, IsRequestSecure: Boolean) {
		const url = `http://files.api.sitetest4.robloxlabs.com/v1/GetUri?apiKey=`;
		let response: [boolean, String] = [false, ''];
		try {
			const Response = await Http.post(url, { hash, requireSecureUri: IsRequestSecure });
			if (!OperationErrorHandler.CheckResponse({ StatusCode: Response.status }, { Url: Response.config.baseURL })) {
				throw new Error(`Error fetching Uri for the replacedhash: ${hash}. Roblox.Http.ServiceClient.ServiceOperationErrorException: An error has occurred with your request.
				Status code: ${Response.statusText} (None)
				Url: http://files.api.roblox.com/v1/GetUri
				Response Machine Id: ${Response.headers['roblox-machine-id']}
				Error code: None`);
			}
		} catch (Err) {
			if (!OperationErrorHandler.CheckResponse({ StatusCode: Err.response.status }, { Url: Err.response.config.baseURL })) {
				response = [
					false,
					new Error(`Error fetching Uri for the replacedhash: ${hash}. Roblox.Http.ServiceClient.ServiceOperationErrorException: An error has occurred with your request.
Status code: ${Err.response.statusText} (None)
Url: http://files.api.roblox.com/v1/GetUri
Response Machine Id: ${Err.response.headers['roblox-machine-id'] || 'RA-WEB231'}
Error code: None`).stack,
				];
			}
			return response;
		}
	}
}
