import { Request, Response } from 'express';
import { AssetIdListModel } from '../../../../ApiSites/Roblox.Avatar.Api/Models/AssetIdListModel';
import { AvatarFetchResponseModel } from '../../../../Services/Roblox.ApiProxy.Service/Models/AvatarFetchResponseModel';
import { AvatarBodyColorsModel } from '../../../../Services/Roblox.ApiProxy.Service/Models/AvtarBodyColorsModel';
import { GetByUserNameResponse } from '../../../../Services/Roblox.ApiProxy.Service/Models/GetByUserNameResponse';
import { Convert } from '../../../../System/Convert';
import { Task } from '../../../../System/Threading/Task';
import { BodyColorsRequest } from '../../../../Websites/Roblox.GameWebsite/Models/Game/BodyColorsRequest';
import { AvatarAccoutrementsRequest } from '../../../../Websites/Roblox.GameWebsite/Models/Game/IAvatarAccoutrementsRequest';
import { ApiKeys } from '../../../Common/Client/Roblox.Common.Client/Api/ApiKeys';
import { BaseURL } from '../../../Common/Client/Roblox.Common.Client/BaseUrl';
import {
	FetchKeyFromObjectCaseInsensitive,
	FetchKeyFromObjectCaseInsensitiveOrDefault,
} from '../../../Common/KeyValueMapping/Roblox.Common.KeyValueMapping/FetchKeyFromObjectCaseInsensitive';
import { HttpRequestMethodEnum } from '../../../Http/ServiceClient/Roblox.Http.ServiceClient/Enumeration/HttpRequestMethodEnum';
import { ServiceClient } from '../../../Http/ServiceClient/Roblox.Http.ServiceClient/Implementation/HttpClient';
import { CachePolicy, IClientRequest } from '../../../Http/ServiceClient/Roblox.Http.ServiceClient/Models/IClientRequest';
import {
	DFLog,
	DYNAMIC_LOGVARIABLE,
	FASTLOG,
	FASTLOG1,
	FASTLOG2,
	FASTLOG3,
	FASTLOGNOFILTER,
	FASTLOGS,
} from '../../Util/Roblox.Web.Util/Logging/FastLog';

DYNAMIC_LOGVARIABLE('CacheStore', 7);
DYNAMIC_LOGVARIABLE('RoundRobinRunThrough', 7);
DYNAMIC_LOGVARIABLE('RoundRobinCacheBalancer', 7);

/* TODO: Actually cache this... It takes an average of 200ms to execute each request. */

export class AvatarRequestProcessor {
	/* Constants */
	private static readonly GLOBAL_CONFIG: IClientRequest = {
		QueryString: {
			ApiKey: ApiKeys.TestApi,
		},
		Method: HttpRequestMethodEnum.GET,
		CachePolicy: CachePolicy.StaleAfterOneHour /* 6 */,
		CheckResponseDataForOKStatus: true /* NotImplemented */,
	};
	private static readonly API_PROXY_GET_BY_USERNAME = BaseURL.ConstructServicePathFromHostSimple(
		'api.roblox.com',
		'users/get-by-username',
		true,
	);
	private static readonly AVATAR_API_SITE_GET_CURRENTLY_WEARING_ASSET_IDS = (userID: number) =>
		BaseURL.ConstructServicePathFromHostSimple('avatar.roblox.com', `v1/users/${userID}/currently-wearing`, true);

	private static readonly API_PROXY_AVATAR_FETCH = BaseURL.ConstructServicePathFromHostSimple(
		'api.roblox.com',
		`v1.1/avatar-fetch`,
		true,
	);

	private static AVATAR_DEFAULT_COLORS = (userID: long, allowUseOfSSL: bool = false) =>
		BaseURL.ConstructServicePathFromSubDomain('assetgame', '/Asset/BodyColors.ashx', { userID }, allowUseOfSSL, false, true);

	/* Mutable Data */

	private userID: long = undefined;
	private userName: string = null;
	private DoNotCache: bool = false;

	/* Usable private members */
	private readonly _response: Response;
	private readonly _cachedClient: ServiceClient.HttpClientInvoker;

	public constructor(policy: CachePolicy, response: Response) {
		AvatarRequestProcessor.RegisterTheRoundRobin(this, policy);

		this._response = response;
		this._cachedClient = new ServiceClient.HttpClientInvoker(AvatarRequestProcessor.GLOBAL_CONFIG);
	}

	public static get IsCacheCleared() {
		return (
			AvatarRequestProcessor.GeneralCacheStore.size === 0 &&
			AvatarRequestProcessor.UserNameCacheStore.size === 0 &&
			AvatarRequestProcessor.AssetIDsCacheStore.size === 0 &&
			AvatarRequestProcessor.ColorCacheStore.size === 0 &&
			AvatarRequestProcessor.SimpleCharacterFetchCacheStore.size === 0
		);
	}

	public ExtractDataFromQueryStringForAvatarAccoutrementsRequest(
		request: Request<null, string, null, AvatarAccoutrementsRequest>,
	): [ulong, string, bool] {
		let UserID = FetchKeyFromObjectCaseInsensitive<long>(request.query, 'UserID');
		const UserName = FetchKeyFromObjectCaseInsensitiveOrDefault<string>(request.query, 'UserName', null);
		const allowSSL = FetchKeyFromObjectCaseInsensitiveOrDefault<bool>(request.query, 'AllowSSL', false);
		return [Convert.ToUInt64(UserID), UserName, Convert.ToBoolean(allowSSL)];
	}

	public ExtractDataFromQueryStringForBodyColorsRequest(request: Request<null, string, null, BodyColorsRequest>): [ulong, string] {
		let UserID = FetchKeyFromObjectCaseInsensitive<long>(request.query, 'UserID');
		const UserName = FetchKeyFromObjectCaseInsensitiveOrDefault<string>(request.query, 'UserName', null);
		return [Convert.ToUInt64(UserID), UserName];
	}

	public async GetAvatarBodyColorsAsync(userID: long, userName: string) {
		if (typeof userName === 'string') userName = userName.toLowerCase().trim();
		this.UpdateConfiguredMutables(userID, userName);
		await this.TryUpdateUserIDByUserName();
		const collectionId = `Avatars_GetAvatarBodyColorsAsync:${this.userID}:${this.userName}`;
		if (this.TryCheckColorCache(collectionId)) return;
		return await this.GetBodyColors();
	}

	private TryCheckColorCache(collectionId: string): bool {
		FASTLOGS(DFLog('CacheStore'), "[DFLog::CacheStore] Try get collection '%s' from the ColorCacheStore.", collectionId);
		if (this.DoNotCache) {
			FASTLOG(DFLog('CacheStore'), '[DFLog::CacheStore] DoNotCache 1, returning false.');
			return false;
		}
		if (AvatarRequestProcessor.ColorCacheStore.has(collectionId)) {
			FASTLOGS(DFLog('CacheStore'), "[DFLog::CacheStore] The collection '%s' from the ColorCacheStore is persistent.", collectionId);
			this.RespondWithContentTypeAndData('text/xml', AvatarRequestProcessor.ColorCacheStore.get(collectionId));
			return true;
		}
		FASTLOGS(DFLog('CacheStore'), "[DFLog::CacheStore] The collection '%s' from the ColorCacheStore is not persistent.", collectionId);
		return false;
	}

	public async GetAvatarAccoutrementsAsync(userID: long, userName: string, allowUseOfSSL: bool = false) {
		if (typeof userName === 'string') userName = userName.toLowerCase().trim();
		this.UpdateConfiguredMutables(userID, userName);
		await this.TryUpdateUserIDByUserName();
		const collectionId = `Avatars_GetAvatarAccoutrementsAsync:${this.userID}:${this.userName}`;
		if (this.TryCheckCache(collectionId)) return;
		return await this.ConstructResponseString(allowUseOfSSL);
	}

	/* UTIL */

	private async ClearCacheAsync() {
		await this._cachedClient.ClearCacheAsync();
	}

	private async ClearConfigAndCacheAsync() {
		this._cachedClient.ClearConfiguration();
		await this.ClearCacheAsync();
	}

	private RespondWithData(data: string = null) {
		if (this._response !== null) this._response.contentType('text/plain').send(data);
		return data;
	}

	private RespondWithContentTypeAndData(contentType: string = 'text/plain', data: string = null) {
		if (this._response !== null) this._response.contentType(contentType).send(data);
		return data;
	}

	private RespondWithStatusAndData(status: int = 200, data: string = null) {
		if (this._response !== null) {
			this._response.statusCode = status;

			return this.RespondWithData(data);
		}
	}

	private UpdateConfiguredMutables(userID: number, userName: string) {
		this.userID = userID;
		this.userName = userName;
	}

	private async TryUpdateUserIDByUserName() {
		if (this.userName) {
			if (this.TryUpdateUserIDFromCache()) return;

			this.UpdateConfigForUsernameFetch();
			await this.TryGetUsernameFromUserIDAsync();
			await this.ClearConfigAndCacheAsync();
		}
	}

	private TryUpdateUserIDFromCache() {
		const collectionId = `Users_TryUpdateUserIDByUserName:${this.userName}`;

		FASTLOGS(DFLog('CacheStore'), "[DFLog::CacheStore] Try get collection '%s' from the UserNameCacheStore.", collectionId);
		if (this.DoNotCache) {
			FASTLOG(DFLog('CacheStore'), '[DFLog::CacheStore] DoNotCache 1, returning false.');
			return false;
		}

		if (AvatarRequestProcessor.UserNameCacheStore.has(collectionId)) {
			FASTLOGS(
				DFLog('CacheStore'),
				"[DFLog::CacheStore] The collection '%s' from the UserNameCacheStore is persistent.",
				collectionId,
			);
			const cachedUserID = AvatarRequestProcessor.UserNameCacheStore.get(collectionId);
			if (cachedUserID !== null) this.userID = cachedUserID;
			return true;
		}
		FASTLOGS(
			DFLog('CacheStore'),
			"[DFLog::CacheStore] The collection '%s' from the AssetIDsCacheStore is not persistent.",
			collectionId,
		);
		return false;
	}

	private async TryGetUsernameFromUserIDAsync() {
		const collectionId = `Users_TryUpdateUserIDByUserName:${this.userName}`;
		const [WasSuccessful, CachedResponse] = await this._cachedClient.ExecuteAsync<GetByUserNameResponse>();

		const WasRemotelySuccessful = FetchKeyFromObjectCaseInsensitive<bool>(CachedResponse.ResponsePayload, 'Success');
		const RemoteUserID = FetchKeyFromObjectCaseInsensitiveOrDefault<long>(CachedResponse.ResponsePayload, 'ID', null);

		this.SetCacheValue(AvatarRequestProcessor.UserNameCacheStore, collectionId, RemoteUserID);

		if (WasSuccessful && WasRemotelySuccessful !== false) {
			this.userID = RemoteUserID;
		} else {
			this.userName = null;
		}
	}

	private UpdateConfigForUsernameFetch() {
		this._cachedClient.UpdateConfiguration({
			...AvatarRequestProcessor.GLOBAL_CONFIG,
			Url: AvatarRequestProcessor.API_PROXY_GET_BY_USERNAME,
			QueryString: { ...AvatarRequestProcessor.GLOBAL_CONFIG.QueryString, UserName: this.userName },
		});
	}

	private async GetAvatarFetchModel(): Task<AvatarFetchResponseModel> {
		return new Promise(async (resumeFunction) => {
			if (this.userID) {
				const [WasCached, CachedModel] = this.TryGetCachedAvatarFetchModel();
				if (WasCached) return CachedModel;
				this.UpdateConfigForAvatarFetchRequest();
				return resumeFunction(await this.ExecuteGetAvatarFetchAsync());
			} else {
				this.RespondWithDefaultBodyColors(resumeFunction);
			}
		});
	}

	private async ExecuteGetAvatarFetchAsync(): Task<AvatarFetchResponseModel> {
		return new Promise(async (resumeFunction) => {
			const collectionId = `Avatars_GetAvatarSimple:${this.userID}:${this.userName}`;
			const [WasSuccessful, CachedAvatarResponse] = await this._cachedClient.ExecuteAsync<AvatarFetchResponseModel>();

			this.SetCacheValue(AvatarRequestProcessor.SimpleCharacterFetchCacheStore, collectionId, CachedAvatarResponse.ResponsePayload);

			if (!WasSuccessful) {
				return this.RespondWithDefaultBodyColors(resumeFunction);
			}

			return resumeFunction(CachedAvatarResponse.ResponsePayload);
		});
	}

	private TryGetCachedAvatarFetchModel(): [bool, AvatarFetchResponseModel] {
		const collectionId = `Avatars_GetAvatarSimple:${this.userID}:${this.userName}`;
		FASTLOGS(DFLog('CacheStore'), "[DFLog::CacheStore] Try get collection '%s' from the SimpleCharacterFetchCacheStore.", collectionId);
		if (this.DoNotCache) {
			FASTLOG(DFLog('CacheStore'), '[DFLog::CacheStore] DoNotCache 1, returning false.');
			return [false, null];
		}

		if (AvatarRequestProcessor.SimpleCharacterFetchCacheStore.has(collectionId)) {
			FASTLOGS(
				DFLog('CacheStore'),
				"[DFLog::CacheStore] The collection '%s' from the SimpleCharacterFetchCacheStore is persistent.",
				collectionId,
			);
			const cachedData = AvatarRequestProcessor.SimpleCharacterFetchCacheStore.get(collectionId);
			return [true, cachedData];
		}
		FASTLOGS(
			DFLog('CacheStore'),
			"[DFLog::CacheStore] The collection '%s' from the SimpleCharacterFetchCacheStore is not persistent.",
			collectionId,
		);
		return [false, null];
	}

	private async GetAvatarAssetIDS() {
		if (this.userID) {
			const [WasCached, CachedData] = this.TryGetCachedAssetIDs();
			if (WasCached) return CachedData;
			this.UpdateConfigForAvatarAssetIDsFetch();
			return await this.ExecuteGetAvatarAssetIDsAsync();
		} else {
			this.SetCacheValue(
				AvatarRequestProcessor.GeneralCacheStore,
				`Avatars_GetAvatarAccoutrementsAsync:${this.userID}:${this.userName}`,
				AvatarRequestProcessor.AVATAR_DEFAULT_COLORS(this.userID, false),
			);
			this.RespondWithDefault();
			return null;
		}
	}
	private TryGetCachedAssetIDs(): [bool, long[]] {
		const collectionId = `Assets_TryGetCachedAssetIDs:${this.userID}:${this.userName}`;
		FASTLOGS(DFLog('CacheStore'), "[DFLog::CacheStore] Try get collection '%s' from the AssetIDsCacheStore.", collectionId);
		if (this.DoNotCache) {
			FASTLOG(DFLog('CacheStore'), '[DFLog::CacheStore] DoNotCache 1, returning false.');
			return [false, null];
		}

		if (AvatarRequestProcessor.UserNameCacheStore.has(collectionId)) {
			FASTLOGS(
				DFLog('CacheStore'),
				"[DFLog::CacheStore] The collection '%s' from the AssetIDsCacheStore is persistent.",
				collectionId,
			);
			const cachedData = AvatarRequestProcessor.AssetIDsCacheStore.get(collectionId);
			return [true, cachedData];
		}
		FASTLOGS(
			DFLog('CacheStore'),
			"[DFLog::CacheStore] The collection '%s' from the AssetIDsCacheStore is not persistent.",
			collectionId,
		);
		return [false, null];
	}

	private async ExecuteGetAvatarAssetIDsAsync() {
		const collectionId = `Assets_TryGetCachedAssetIDs:${this.userID}:${this.userName}`;
		const [WasSuccessful, CachedAvatarResponse] = await this._cachedClient.ExecuteAsync<AssetIdListModel>();
		const collection = FetchKeyFromObjectCaseInsensitiveOrDefault<long[]>(CachedAvatarResponse.ResponsePayload, 'AssetIDs', null);

		this.SetCacheValue(AvatarRequestProcessor.AssetIDsCacheStore, collectionId, collection);

		if (!WasSuccessful) {
			this.SetCacheValue(
				AvatarRequestProcessor.GeneralCacheStore,
				`Avatars_GetAvatarAccoutrementsAsync:${this.userID}:${this.userName}`,
				AvatarRequestProcessor.AVATAR_DEFAULT_COLORS(this.userID, false),
			);
			this.RespondWithDefault();
			return null;
		}

		return collection;
	}

	private UpdateConfigForAvatarAssetIDsFetch() {
		this._cachedClient.UpdateConfiguration({
			...AvatarRequestProcessor.GLOBAL_CONFIG,
			Url: AvatarRequestProcessor.AVATAR_API_SITE_GET_CURRENTLY_WEARING_ASSET_IDS(this.userID),
		});
	}

	private UpdateConfigForAvatarFetchRequest() {
		this._cachedClient.UpdateConfiguration({
			...AvatarRequestProcessor.GLOBAL_CONFIG,
			Url: AvatarRequestProcessor.API_PROXY_AVATAR_FETCH,
			QueryString: {
				...AvatarRequestProcessor.GLOBAL_CONFIG.QueryString,
				UserID: this.userID,
			},
		});
	}

	private async ConstructResponseString(allowUseOfSSL: bool = false) {
		const collectionId = `Avatars_GetAvatarAccoutrementsAsync:${this.userID}:${this.userName}`;
		const avatarAssetIDs = await this.GetAvatarAssetIDS();
		let RESPONSE_STRING = AvatarRequestProcessor.AVATAR_DEFAULT_COLORS(this.userID, allowUseOfSSL);

		if (avatarAssetIDs === null) {
			return;
		}

		let isAllowed: bool = true;
		if (Array.isArray(avatarAssetIDs) && avatarAssetIDs.length > 0)
			avatarAssetIDs.forEach(async (assetID, idx, arr) => {
				if (isAllowed) {
					RESPONSE_STRING += this.GetNextResponseStringForSequence(assetID, allowUseOfSSL);
					if (idx === arr.length - 1) {
						this.SetCacheValue(AvatarRequestProcessor.GeneralCacheStore, collectionId, RESPONSE_STRING);
						return this.RespondWithData(RESPONSE_STRING);
					}
				}
			});
		else {
			this.SetCacheValue(AvatarRequestProcessor.GeneralCacheStore, collectionId, RESPONSE_STRING);
			return this.RespondWithData(RESPONSE_STRING);
		}
	}

	private async GetBodyColors() {
		return new Promise(async (resumeFunction) => {
			const simpleAvatarResponse = await this.GetAvatarFetchModel();

			if (simpleAvatarResponse === null) {
				return;
			}

			const bodyColors = FetchKeyFromObjectCaseInsensitive<AvatarBodyColorsModel>(simpleAvatarResponse, 'BodyColors');

			if (bodyColors && !this.isEmptyObject(bodyColors)) {
				return this.RespondWithBodyColors(bodyColors, (_err, res) => {
					if (_err) return resumeFunction(null);
					this.SetCacheValue(
						AvatarRequestProcessor.ColorCacheStore,
						`Avatars_GetAvatarBodyColorsAsync:${this.userID}:${this.userName}`,
						res,
					);
					this.RespondWithContentTypeAndData('text/xml', res);
					return resumeFunction(null);
				});
			} else {
				return this.RespondWithDefaultBodyColors(resumeFunction);
			}
		});
	}

	private isEmptyObject(obj: Object) {
		return !Object.keys(obj).length;
	}

	private RespondWithDefault() {
		return this.RespondWithStatusAndData(200, AvatarRequestProcessor.AVATAR_DEFAULT_COLORS(this.userID, false));
	}

	private RespondWithDefaultBodyColors(resumeFunction: (...args: any) => any) {
		return this.RespondWithBodyColors(
			{
				HeadColor: 1004,
				LeftArmColor: 1004,
				LeftLegColor: 1004,
				RightArmColor: 1004,
				RightLegColor: 1004,
				TorsoColor: 1004,
			},
			(_err, res) => {
				if (_err) return resumeFunction(null);
				this.SetCacheValue(
					AvatarRequestProcessor.ColorCacheStore,
					`Avatars_GetAvatarBodyColorsAsync:${this.userID}:${this.userName}`,
					res,
				);
				return resumeFunction(null);
			},
		);
	}

	private RespondWithBodyColors(bodyColors: AvatarBodyColorsModel, cb?: (e: Error, r: string) => void) {
		if (this._response !== null)
			this._response.render(
				'Game/BodyColors',
				{
					bodyColors: bodyColors,
				},
				cb,
			);
	}

	private GetNextResponseStringForSequence(assetID: number, allowUseOfSSL: boolean) {
		return `;${BaseURL.ConstructServicePathFromSubDomain('assetgame', '/Asset', { ID: assetID }, allowUseOfSSL, false, true)}`;
	}

	private SetCacheValue(cacheStore: Map<any, any>, collectionId: string, value: any) {
		FASTLOG2(
			DFLog('CacheStore'),
			"[DFLog::CacheStore] Set cache store value for collection '%s' to '%s'",
			collectionId,
			typeof value === 'string' ? value.trim().split('\r\n').join('\\r\\n') : value instanceof Object ? JSON.stringify(value) : value,
		);
		if (this.DoNotCache) {
			FASTLOG(DFLog('CacheStore'), '[DFLog::CacheStore] DoNotCache 1, returning.');
			return;
		}
		cacheStore.set(collectionId, value);
	}

	private TryCheckCache(collectionId: string): bool {
		FASTLOGS(DFLog('CacheStore'), "[DFLog::CacheStore] Try get collection '%s' from the GeneralCacheStore.", collectionId);
		if (this.DoNotCache) {
			FASTLOG(DFLog('CacheStore'), '[DFLog::CacheStore] DoNotCache 1, returning false.');
			return false;
		}
		if (AvatarRequestProcessor.GeneralCacheStore.has(collectionId)) {
			FASTLOGS(
				DFLog('CacheStore'),
				"[DFLog::CacheStore] The collection '%s' from the GeneralCacheStore is persistent.",
				collectionId,
			);
			this.RespondWithData(AvatarRequestProcessor.GeneralCacheStore.get(collectionId));
			return true;
		}
		FASTLOGS(
			DFLog('CacheStore'),
			"[DFLog::CacheStore] The collection '%s' from the GeneralCacheStore is not persistent.",
			collectionId,
		);
		return false;
	}

	private static readonly GeneralCacheStore = new Map<string, string>(); /* Exported so it can persist */
	private static readonly UserNameCacheStore = new Map<string, long>(); /* Exported so it can persist */
	private static readonly AssetIDsCacheStore = new Map<string, long[]>();
	private static readonly ColorCacheStore = new Map<string, string>();
	private static readonly SimpleCharacterFetchCacheStore = new Map<string, AvatarFetchResponseModel>();

	private static readonly PersistentRoundRobinState = {
		WasRegisteredForCacheReset: false,
	};

	private static GetPolicy(policy: CachePolicy) {
		FASTLOG1(
			DFLog('RoundRobinCacheBalancer'),
			'[DFLog::RoundRobinCacheBalancer] Try get the policy timout for CachePolicy[%d]',
			policy,
		);

		let timeOut = null;

		switch (policy) {
			case CachePolicy.DoNotCache:
				timeOut = null;
				break;
			case CachePolicy.StaleAfterFiveSeconds:
				timeOut = 5000;
				break;
			case CachePolicy.StaleAfterTenSeconds:
				timeOut = 10000;
				break;
			case CachePolicy.SateAfterThirtySeconds:
				timeOut = 30000;
				break;
			case CachePolicy.StaleAfterOneMinute:
				timeOut = 60000;
				break;
			case CachePolicy.StaleAfterTwoMinutes:
				timeOut = 120000;
				break;
			case CachePolicy.StaleAfterFiveMinutes:
				timeOut = 300000;
				break;
			case CachePolicy.StaleAfterTenMinutes:
				timeOut = 600000;
				break;
			case CachePolicy.StaleAfterFifteenMinutes:
				timeOut = 900000;
				break;
			case CachePolicy.StateAfterThirtyMinutes:
				timeOut = 1.8e6;
				break;
			case CachePolicy.StaleAfterOneHour:
				timeOut = 3.6e6;
				break;
		}

		FASTLOG2(
			DFLog('RoundRobinCacheBalancer'),
			'[DFLog::RoundRobinCacheBalancer] The policy timout for CachePolicy[%d] = %d',
			policy,
			timeOut,
		);

		return timeOut;
	}

	private static RunTheRoundRobinRunThrough(maps: Map<any, any>[], names: string[]) {
		if (DFLog('RoundRobinRunThrough') > 5) {
			maps.forEach((map, idx) => {
				map.forEach((v, k) => {
					FASTLOG3(
						DFLog('RoundRobinRunThrough'),
						'[DFlog::RoundRobinRunThrough] Run through %s, Key: %s, value: %s.',
						names[idx],
						k,
						typeof v === 'string' ? v.trim().split('\r\n').join('\\r\\n') : v instanceof Object ? JSON.stringify(v) : v,
					);
				});
			});
		}
	}

	private static RegisterTheRoundRobin(self: AvatarRequestProcessor, policy: CachePolicy) {
		FASTLOG(DFLog('RoundRobinCacheBalancer'), '[DFLog::RoundRobinCacheBalancer] Try register the round robin cache store.');
		if (!AvatarRequestProcessor.PersistentRoundRobinState.WasRegisteredForCacheReset) {
			const cacheRefreshInterval = AvatarRequestProcessor.GetPolicy(policy);
			self.DoNotCache = cacheRefreshInterval === null;
			FASTLOG(
				DFLog('RoundRobinCacheBalancer'),
				'[DFLog::RoundRobinCacheBalancer] Round robin was not registered recently, register it.',
			);
			AvatarRequestProcessor.PersistentRoundRobinState.WasRegisteredForCacheReset = true;
			if (cacheRefreshInterval !== null)
				setInterval(() => {
					if (
						AvatarRequestProcessor.GeneralCacheStore.size > 0 ||
						AvatarRequestProcessor.UserNameCacheStore.size > 0 ||
						AvatarRequestProcessor.AssetIDsCacheStore.size > 0 ||
						AvatarRequestProcessor.ColorCacheStore.size > 0 ||
						AvatarRequestProcessor.SimpleCharacterFetchCacheStore.size > 0
					) {
						FASTLOGNOFILTER(
							DFLog('CacheStore'),
							`[DFlog::CacheStore] Perform Round Robin cache clearance on cache stores, count of GeneralCacheStore(${AvatarRequestProcessor.GeneralCacheStore.size}), UserNameCacheStore(${AvatarRequestProcessor.UserNameCacheStore.size}), AssetIDsCacheStore(${AvatarRequestProcessor.AssetIDsCacheStore.size}), ColorCacheStore(${AvatarRequestProcessor.ColorCacheStore.size}) and SimpleCharacterFetchCacheStore(${AvatarRequestProcessor.SimpleCharacterFetchCacheStore.size})`,
						);

						AvatarRequestProcessor.RunTheRoundRobinRunThrough(
							[
								AvatarRequestProcessor.GeneralCacheStore,
								AvatarRequestProcessor.UserNameCacheStore,
								AvatarRequestProcessor.AssetIDsCacheStore,
								AvatarRequestProcessor.ColorCacheStore,
								AvatarRequestProcessor.SimpleCharacterFetchCacheStore,
							],
							[
								'GeneralCacheStore',
								'UserNameCacheStore',
								'AssetIDsCacheStore',
								'ColorCacheStore',
								'SimpleCharacterFetchCacheStore',
							],
						);

						AvatarRequestProcessor.GeneralCacheStore.clear();
						AvatarRequestProcessor.UserNameCacheStore.clear();
						AvatarRequestProcessor.AssetIDsCacheStore.clear();
						AvatarRequestProcessor.ColorCacheStore.clear();
						AvatarRequestProcessor.SimpleCharacterFetchCacheStore.clear();
					}
				}, cacheRefreshInterval);
		}
	}
}
