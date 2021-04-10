import { IFTUXAssetIdArray } from './IFTUXAssetIdArray';
import { IFTUXBodiesType } from './IFTUXBodiesType';
import { IFTUXBodyColorType } from './IFTUXBodyColorType';

export interface IFTUXAssetMap {
	bodies: IFTUXBodiesType[];
	bodyColors: IFTUXBodyColorType[];
	clothing: IFTUXAssetIdArray[];
	heads: IFTUXAssetIdArray[];
}
