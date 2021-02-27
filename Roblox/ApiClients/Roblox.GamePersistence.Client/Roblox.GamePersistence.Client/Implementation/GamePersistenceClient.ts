import { Task } from '../../../../Http/Task';
import Http from 'axios';
import { ApiKeys } from '../../../../Data/Keys/Api';
import { BaseURL } from '../../../../Data/Client/BaseUrl';
import { DFLog, DYNAMIC_LOGGROUP, FASTLOGS } from '../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import https from 'https';

DYNAMIC_LOGGROUP('Tasks');

export namespace GamePersistenceClient {
	/**
	 * Try enroll the current IEntrollments.
	 * @param {Number} universeId The universeId to fetch from.
	 * @param {String} UserAuthToken The Authentication Token for the user being validated.
	 * @param {Boolean} requireSecureUri Should the ApiClient request with a HTTPS Uri
	 * @returns {Task<[Boolean, String, Number]>} Returns a Task to be awaited for response.
	 */
	export async function TryFetchTheDataStoresForThisUniverse(
		universeId: Number,
		UserAuthToken: String,
		requireSecureUri: Boolean,
	): Task<[Boolean, String, Number | null]> {
		return new Promise<[Boolean, String, Number | null]>((resumeFunction) => {
			const AbTestingApiEnrollToExperimentsUrl = `${(requireSecureUri ? BaseURL.GetSecureBaseURL() : BaseURL.GetBaseURL()).replace(
				/www/,
				'gamepersistence.api',
			)}/v4/datastores/fetch-this-universe?ApiKey=${ApiKeys.AbTesingApi}`;
			const postData = { universeId };
			Http.post(AbTestingApiEnrollToExperimentsUrl, postData, {
				headers: {
					Cookie: `.ROBLOSECURITY=${UserAuthToken}`,
				},
				httpsAgent: new https.Agent({ rejectUnauthorized: false }),
			})
				.then((Response) => {
					resumeFunction([true, JSON.stringify(Response.data), Response.status]);
				})
				.catch((Err) => {
					if (!Err.response) {
						const message = new Error(`Error enrolling to experiments for the user: ${
							UserAuthToken || 'NoUser'
						}. Roblox.Http.ServiceClient.ConnectionException: An error has occurred with your request.
	Status code: None (None)
	Url: ${(requireSecureUri ? BaseURL.GetSecureBaseURL() : BaseURL.GetBaseURL()).replace(
		/www/,
		'gamepersistence.api',
	)}/v4/datastores/fetch-this-universe
	Response Machine Id: RA-WEB82
	Error code: ${Err.message}`).stack;
						FASTLOGS(DFLog['Tasks'], '[DFLog::Tasks] %s', message);
						return resumeFunction([false, message, 500]);
					}
					resumeFunction([false, Err.response.statusText, Err.response.status]);
				});
		});
	}
}
