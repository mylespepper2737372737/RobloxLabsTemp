import { IFTUXAssetIdArray } from './IFTUXAssetIdArray';
import { IFTUXBodiesTypeV2 } from './IFTUXBodiesTypeV2';
import { IFTUXBodyColorType } from './IFTUXBodyColorType';

export interface IFTUXAssetMapV2 {
	bodies: IFTUXBodiesTypeV2[];
	bodyColors: IFTUXBodyColorType[];
	clothing: IFTUXAssetIdArray[];
	heads: IFTUXAssetIdArray[];
}
