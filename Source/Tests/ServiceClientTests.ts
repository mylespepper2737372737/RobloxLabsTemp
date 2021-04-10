import { BaseURL } from '../Assemblies/Common/Client/Roblox.Common.Client/BaseUrl';
import { ApiKeys } from '../Assemblies/Common/Client/Roblox.Common.Client/Api/ApiKeys';
import { DFLog, DYNAMIC_LOGVARIABLE, FASTLOGS } from '../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { ServiceClient } from '../Assemblies/Http/ServiceClient/Roblox.Http.ServiceClient/Implementation/HttpClient';
import { ServiceClientExceptions } from '../Assemblies/Http/ServiceClient/Roblox.Http.ServiceClient/Exceptions/HttpException';
import { HttpRequestMethodEnum } from '../Assemblies/Http/ServiceClient/Roblox.Http.ServiceClient/Enumeration/HttpRequestMethodEnum';
import ssl from 'sslkeylog';
ssl.hookAll();

DYNAMIC_LOGVARIABLE('Debug', 7);

(async () => {
	const TestUrl = `${BaseURL.GetSecureBaseURL().replace(/www/, 'apis')}/echo-server/test-qs`;
	const postData = { Data: [{ Test: 4, STest: 'TestString' }] };
	const Client = new ServiceClient.HttpClient({
		Url: TestUrl,
		QueryString: {
			ApiKey: ApiKeys.TestApi,
		},
		AdditionalHeaders: { Cookie: `.ROBLOSECURITY=;`, 'Content-Type': 'application/json' },
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
			new ServiceClientExceptions.HttpException(
				TestUrl,
				'Failure on TestClient',
				<number>Response.StatusCode,
				'Funny',
				'Test Failure',
			).fetch().stack,
		);
	}
})();
