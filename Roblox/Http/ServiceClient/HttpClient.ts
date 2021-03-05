import { Task } from '../Task';
import { IClientRequest } from './IClientRequest';
import { IClientResponse } from './IClientResponse';
import query from 'querystring';
import { HttpRequestMethodEnum } from './HttpRequestMethodEnum';
import Http, { Method } from 'axios';
import Https from 'https';
import { BaseURL } from '../../Data/Client/BaseUrl';
import { Version } from '../../Data/Client/Version';
import { DFString, DYNAMIC_FASTSTRINGVARIABLE } from '../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

DYNAMIC_FASTSTRINGVARIABLE('GlobalConfigRA', 'RA-14');
DYNAMIC_FASTSTRINGVARIABLE('ProxiedIP', '208.223.313.3');

export namespace ServiceClient {
	// TODO Have 2 variants of this, one with no callback and one with a callback?
	// TODO Clean up the monster of Copy and pasted code below.
	export class HttpClient {
		private request: IClientRequest;
		public constructor(request: IClientRequest) {
			this.request = request;
		}
		/**
		 * We only ever want this to resume, never error, or the client will receive a call stack
		 * @returns {Task<[Boolean, IClientResponse]>} Returns a task to be awaited.
		 */
		public async execute(): Task<[Boolean, IClientResponse]> {
			return new Promise<[Boolean, IClientResponse]>((resumeFunction) => {
				const parsedQs = query.stringify(this.request.QueryString);
				const requestUrl = `${this.request.Url}?${parsedQs}`;
				let requestMethod: Method = 'GET';
				switch (this.request.Method) {
					case HttpRequestMethodEnum.GET:
						requestMethod = 'GET';
						break;
					case HttpRequestMethodEnum.POST:
						requestMethod = 'POST';
						break;
					case HttpRequestMethodEnum.DELETE:
						requestMethod = 'DELETE';
						break;
					case HttpRequestMethodEnum.HEAD:
						requestMethod = 'HEAD';
						break;
					case HttpRequestMethodEnum.OPTIONS:
						requestMethod = 'OPTIONS';
						break;
					case HttpRequestMethodEnum.PATCH:
						requestMethod = 'PATCH';
						break;
					case HttpRequestMethodEnum.PUT:
						requestMethod = 'PUT';
						break;
				}
				Http.request({
					url: requestUrl,
					method: requestMethod,
					httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
					headers: {
						...this.request.AdditionalHeaders,
						'User-Agent': `Roblox/ApiServiceClientAspNet 4.8.4210.0 (${BaseURL.GetSecureBaseURL()} v${Version.GetVersion()})`,
						'Roblox-Machine-Id': DFString('GlobalConfigRA'),
						'Roblox-Grid-Proxied-IP': DFString('ProxiedIP'),
						'X-Roblox-ChannelType': 'Roblox.Http.ServiceClient.Channel.Main',
						'X-Roblox-Is-ApiRequest': 'True',
					},
					data: this.request.Payload,
				})
					.then((response) => {
						resumeFunction([
							true,
							{
								Url: requestUrl,
								Method: this.request.Method,
								ResponsePayload: response.data,
								Headers: response.headers,
								StatusCode: response.status,
								StatusMessage: response.statusText,
							},
						]);
					})
					.catch((err) => {
						if (err.response) {
							return resumeFunction([
								false,
								{
									Url: requestUrl,
									Method: this.request.Method,
									ResponsePayload: err.response.data,
									Headers: err.response.headers,
									StatusCode: err.response.status,
									StatusMessage: err.response.statusText,
								},
							]);
						}
						return resumeFunction([
							false,
							{
								Url: requestUrl,
								Method: this.request.Method,
								ResponsePayload: null,
								Headers: null,
								StatusCode: 0,
								StatusMessage: 'ConnectionError',
							},
						]);
					});
			});
		}
	}
}
