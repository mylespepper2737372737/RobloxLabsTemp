import { BaseURL } from '../../../Data/Client/BaseUrl';
import { ApiKeys } from '../../../Data/Keys/Api';
import { ServiceClient } from '../../../Http/ServiceClient/HttpClient';
import { HttpRequestMethodEnum } from '../../../Http/ServiceClient/HttpRequestMethodEnum';
import { Task } from '../../../Http/Task';


export namespace EphemeralCountersClient {
	/**
	 * This method checks the status of the api service.
	 * @param isRequestSecure Request via a secure Url.
	 * @returns {Task<[Boolean, Number, String]>} Returns a task that describes the status.
	 */
	export async function CheckHealth(isRequestSecure: boolean = true): Task<[Boolean, Number, String, String]> {
		return new Promise<[Boolean, Number, String, String]>(async (resumeFunction) => {
			const CheckHealthUrl = BaseURL.ConstructServicePath('ephemeralcounters.api', 'checkhealth', isRequestSecure);
			const Client = new ServiceClient.HttpClient({
				Url: CheckHealthUrl,
				QueryString: {
					ApiKey: ApiKeys.PointsApi,
				},
				AdditionalHeaders: {},
				Payload: '',
				Method: HttpRequestMethodEnum.GET,
			});
			const [Success, Response] = await Client.execute();
			return resumeFunction([Success, Response.StatusCode, Response.StatusMessage, CheckHealthUrl]);
		});
	}

	/**
	 * Get the alltime points for the given IUser in the given IUniverse.
	 * @param {String} counterName The counter which will be incremented.
	 * @param {number} amount The amount to increment the counter by.
	 * @param {boolean} isRequestSecure Is the request secure
	 * @returns {Task<[Boolean, Number, String]>} Returns a Task the checks if the response was successful or not.
	 */
	export async function IncrementCounter(
		counterName: string,
		amount: number,
		isRequestSecure: boolean,
	): Task<[Boolean, Number, any, Error]> {
		return new Promise<[Boolean, Number, any, Error]>(async (resumeFunction) => {
			const Url = BaseURL.ConstructServicePath('ephemeralcounters.api', 'v1.1/Increment', isRequestSecure);
			const Client = new ServiceClient.HttpClient({
				Url: Url,
				QueryString: {
					ApiKey: ApiKeys.PointsApi,
					counterName: counterName,
					amount: amount.toString(),
				},
				AdditionalHeaders: { 'Content-Type': 'application/json' },
				Payload: "{}",
				Method: HttpRequestMethodEnum.POST,
				FailedMessage: `ERROR INCREMENTING COUNTER!`,
			});
			const [Success, Response, Error] = await Client.execute();
			return resumeFunction([Success, Response.StatusCode, Response.ResponsePayload, Error]);
		});
	}
}
