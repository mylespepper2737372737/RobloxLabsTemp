import { Request, Response } from 'express';
import { AssetIdListModel } from '../../../../ApiSites/Roblox.Avatar.Api/Models/AssetIdListModel';
import { GetByUserNameResponse } from '../../../../Services/Roblox.ApiProxy.Service/Models/GetByUserNameResponse';
import { Convert } from '../../../../System/Convert';
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
	FASTLOG3F,
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

	private static AVATAR_DEFAULT_COLORS = (userID: long, allowUseOfSSL: bool = false) =>
		BaseURL.ConstructServicePathFromSubDomain('assetgame', '/Asset/BodyColors.ashx', { userID }, allowUseOfSSL, false, true);

	/* Mutable Data */

	private userID: long = undefined;
	private userName: string = null;
	private DoNotCache: bool = false;

	/* Usable private members */
	private readonly _response: Response;
	private readonly _cachedClient: ServiceClient.HttpClient;

	public constructor(policy: CachePolicy, response: Response) {
		const cachePolicy = AvatarRequestProcessor.GetPolicy(policy);

		this.DoNotCache = cachePolicy === null;

		AvatarRequestProcessor.RegisterTheRoundRobin(cachePolicy);

		this._response = response;
		this._cachedClient = new ServiceClient.HttpClient(AvatarRequestProcessor.GLOBAL_CONFIG);
	}

	public ExtractDataFromQueryString(request: Request<null, string, null, AvatarAccoutrementsRequest>): [ulong, string, bool] {
		let UserID = FetchKeyFromObjectCaseInsensitive<long>(request.query, 'UserID');
		const UserName = FetchKeyFromObjectCaseInsensitiveOrDefault<string>(request.query, 'UserName', null);
		const allowSSL = FetchKeyFromObjectCaseInsensitiveOrDefault<bool>(request.query, 'AllowSSL', false);
		return [Convert.ToUInt64(UserID), UserName, Convert.ToBoolean(allowSSL)];
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
		return this._response.contentType('text/plain').send(data);
	}

	private RespondWithStatusAndData(status: int = 200, data: string = null) {
		this._response.statusCode = status;

		return this.RespondWithData(data);
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

	private async ConstructResponseString(allowUseOfSSL: bool = false) {
		const collectionId = `Avatars_GetAvatarAccoutrementsAsync:${this.userID}:${this.userName}`;
		const avatarAssetIDs = await this.GetAvatarAssetIDS();
		let RESPONSE_STRING = AvatarRequestProcessor.AVATAR_DEFAULT_COLORS(this.userID, allowUseOfSSL);

		if (avatarAssetIDs === null) {
			this.SetCacheValue(AvatarRequestProcessor.GeneralCacheStore, collectionId, RESPONSE_STRING);
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

	private RespondWithDefault() {
		return this.RespondWithStatusAndData(200, AvatarRequestProcessor.AVATAR_DEFAULT_COLORS(this.userID, false));
	}

	private GetNextResponseStringForSequence(assetID: number, allowUseOfSSL: boolean) {
		return `;${BaseURL.ConstructServicePathFromSubDomain('assetgame', '/Asset', { ID: assetID }, allowUseOfSSL, false, true)}`;
	}

	private SetCacheValue(cacheStore: Map<any, any>, collectionId: string, value: any) {
		FASTLOG2(DFLog('CacheStore'), "[DFLog::CacheStore] Set cache store value for collection '%s' to '%s", collectionId, value);
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
						v,
					);
				});
			});
		}
	}

	private static RegisterTheRoundRobin(cacheRefreshInterval: int) {
		FASTLOG(DFLog('RoundRobinCacheBalancer'), '[DFLog::RoundRobinCacheBalancer] Try register the round robin cache store.');
		if (!AvatarRequestProcessor.PersistentRoundRobinState.WasRegisteredForCacheReset) {
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
						AvatarRequestProcessor.AssetIDsCacheStore.size > 0
					) {
						FASTLOG3F(
							DFLog('CacheStore'),
							'[DFlog::CacheStore] Perform Round Robin cache clearance on cache stores, count of GeneralCacheStore(%d), UserNameCacheStore(%d) and AssetIDsCacheStore(%d)',
							AvatarRequestProcessor.GeneralCacheStore.size,
							AvatarRequestProcessor.UserNameCacheStore.size,
							AvatarRequestProcessor.AssetIDsCacheStore.size,
						);

						AvatarRequestProcessor.RunTheRoundRobinRunThrough(
							[
								AvatarRequestProcessor.GeneralCacheStore,
								AvatarRequestProcessor.UserNameCacheStore,
								AvatarRequestProcessor.AssetIDsCacheStore,
							],
							['GeneralCacheStore', 'UserNameCacheStore', 'AssetIDsCacheStore'],
						);

						AvatarRequestProcessor.GeneralCacheStore.clear();
						AvatarRequestProcessor.UserNameCacheStore.clear();
						AvatarRequestProcessor.AssetIDsCacheStore.clear();
					}
				}, cacheRefreshInterval);
		}
	}
}
