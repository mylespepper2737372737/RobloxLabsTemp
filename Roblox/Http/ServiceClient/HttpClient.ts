import { Task } from '../Task';
import { IClientRequest } from './IClientRequest';
import { IClientResponse } from './IClientResponse';
import query from 'querystring';
import { HttpRequestMethodEnum } from './HttpRequestMethodEnum';
import Http from 'axios';
import Https from 'https';
import { BaseURL } from '../../Data/Client/BaseUrl';
import { Version } from '../../Data/Client/Version';

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
				switch (this.request.Method) {
					case HttpRequestMethodEnum.GET:
						Http.get(requestUrl, {
							httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
							headers: {
								...this.request.AdditionalHeaders,
								'User-Agent': `Roblox/AspNet 4.8.4210.0 (${BaseURL.GetSecureBaseURL()} v${Version.GetVersion()})`,
							},
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
						break;
					case HttpRequestMethodEnum.HEAD:
						Http.head(requestUrl, {
							httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
							headers: {
								...this.request.AdditionalHeaders,
								'User-Agent': `Roblox/AspNet 4.8.4210.0 (${BaseURL.GetSecureBaseURL()} v${Version.GetVersion()})`,
							},
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
						break;
					case HttpRequestMethodEnum.POST:
						Http.post(requestUrl, this.request.Payload, {
							httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
							headers: {
								...this.request.AdditionalHeaders,
								'User-Agent': `Roblox/AspNet 4.8.4210.0 (${BaseURL.GetSecureBaseURL()} v${Version.GetVersion()})`,
							},
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
						break;
					case HttpRequestMethodEnum.PUT:
						Http.put(requestUrl, this.request.Payload, {
							httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
							headers: {
								...this.request.AdditionalHeaders,
								'User-Agent': `Roblox/AspNet 4.8.4210.0 (${BaseURL.GetSecureBaseURL()} v${Version.GetVersion()})`,
							},
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
						break;
					case HttpRequestMethodEnum.DELETE:
						Http.delete(requestUrl, {
							httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
							headers: {
								...this.request.AdditionalHeaders,
								'User-Agent': `Roblox/AspNet 4.8.4210.0 (${BaseURL.GetSecureBaseURL()} v${Version.GetVersion()})`,
							},
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
						break;
					case HttpRequestMethodEnum.OPTIONS:
						Http.options(requestUrl, {
							httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
							headers: {
								...this.request.AdditionalHeaders,
								'User-Agent': `Roblox/AspNet 4.8.4210.0 (${BaseURL.GetSecureBaseURL()} v${Version.GetVersion()})`,
							},
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
						break;
					case HttpRequestMethodEnum.PATCH:
						Http.patch(requestUrl, this.request.Payload, {
							httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
							headers: {
								...this.request.AdditionalHeaders,
								'User-Agent': `Roblox/AspNet 4.8.4210.0 (${BaseURL.GetSecureBaseURL()} v${Version.GetVersion()})`,
							},
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
						break;
				}
			});
		}
	}
}
