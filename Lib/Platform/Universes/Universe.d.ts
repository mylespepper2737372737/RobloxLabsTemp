import { IUniverse } from './IUniverse';
export declare class Universe implements IUniverse {
    Name: String;
    Id: Number;
    static GetById(universeId: number): IUniverse;
}
