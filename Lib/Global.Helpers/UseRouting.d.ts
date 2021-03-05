import { Express as IApplicationBuilder } from 'express-serve-static-core';
interface RouterOptions {
    caseSensitive?: boolean;
    mergeParams?: boolean;
    strict?: boolean;
}
declare const UseRouting: (app: IApplicationBuilder, opts?: RouterOptions) => Promise<void>;
export default UseRouting;
