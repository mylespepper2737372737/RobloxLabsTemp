/**
 * The metadata response
 */
export interface IMetadataResponse {
	/*Boolean*/ isUpdateUsernameEnabled: boolean;
	/**
	 * A JSON stringified representation of the IFTUXAvatarAssetMap
	 */
	/*String*/ ftuxAvatarAssetMap: string;
	/*Boolean*/ IsEmailUpsellAtLogoutEnabled: boolean;
	/*Boolean*/ IsAccountRecoveryPromptEnabled: boolean;
}
