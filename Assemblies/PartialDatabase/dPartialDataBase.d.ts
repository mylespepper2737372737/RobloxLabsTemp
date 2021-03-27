declare namespace Roblox {
	class PartialDataBase {
		public constructor(name: System.String, username: System.String, password: System.String): Roblox.PartialDataBase;
		public GetTable<TEntity>(name: System.String): [System.Boolean, System.String, Roblox.PartialEntity<TEntity>];
		public Connect(): System.Threading.Task<[System.Boolean, System.String]>;
		public Disconnect(): System.Threading.Task<[System.Boolean, System.String]>;
	}
}
