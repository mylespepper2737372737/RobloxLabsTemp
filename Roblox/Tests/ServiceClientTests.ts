import { BaseURL } from '../Data/Client/BaseUrl';
import { ApiKeys } from '../Data/Keys/Api';
import { DFLog, DYNAMIC_LOGVARIABLE, FASTLOGS } from '../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { ServiceClient } from '../Http/ServiceClient/HttpClient';
import { ServiceClientExceptions } from '../Http/ServiceClient/HttpException';
import { HttpRequestMethodEnum } from '../Http/ServiceClient/HttpRequestMethodEnum';

DYNAMIC_LOGVARIABLE('Debug', 7);

(async () => {
	const TestUrl = `${BaseURL.GetSecureBaseURL().replace(/www/, 'apis')}/echo-server/test-qs`;
	const postData = { Hello: 'World' };
	const Client = new ServiceClient.HttpClient({
		Url: TestUrl,
		QueryString: {
			ApiKey: ApiKeys.TestApi,
		},
		AdditionalHeaders: { Cookie: `.ROBLOSECURITY=;` },
		Payload: JSON.stringify(postData),
		Method: HttpRequestMethodEnum.POST,
	});
	const [Success, Response] = await Client.execute();
	if (Success) {
		FASTLOGS(DFLog('Debug'), '[DFLog::Debug] %s', JSON.stringify(Response));
	} else if (!Success) {
		return FASTLOGS(
			DFLog('Debug'),
			'[DFLog::Debug] %s',
			<string>(
				new ServiceClientExceptions.HttpException(
					TestUrl,
					'Failure on TestClient',
					<number>Response.StatusCode,
					'Funny',
					'Test Failure',
				).fetch()
			),
		);
	}
})();
