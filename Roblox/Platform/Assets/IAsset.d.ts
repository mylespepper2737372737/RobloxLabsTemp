declare namespace Roblox.Platform.Assets {
	interface IAsset {
		public TypeId: Int32;
		public Name: String;
		public Description: String;
		public CreatorType: Roblox.Platform.Core.CreatorType;
		public CreatorTargetId: Int64;
		public AssetGenres: Int64;
		public IsArchived: Boolean;
		public Created: Date;
		public Updated: Date;
		public Id: Int64;
	}
}
