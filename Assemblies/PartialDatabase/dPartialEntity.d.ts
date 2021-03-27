/// <reference types="node_modules/@types/mysql"/>

declare namespace Roblox {
	class PartialEntity<TEntity> {
		public constructor(connection: Connection): PartialEntity;
	}
}
