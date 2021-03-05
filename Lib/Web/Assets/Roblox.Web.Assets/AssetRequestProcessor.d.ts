import { IAssetRequestItem } from '../../../Platform/Assets/IAssetRequestItem';
export declare namespace AssetRequestProcessor {
    function GetUri(assetHash: String, item: IAssetRequestItem, requireSecureUri: Boolean, isRequestedHashCopyrightProtected: Boolean, replacedHash: String): Promise<[Boolean, String]>;
}
