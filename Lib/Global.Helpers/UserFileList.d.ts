import { Express as IApplicationBuilder } from 'express-serve-static-core';
interface PageDirOpts {
    path?: string;
}
declare const UseFileList: (app: IApplicationBuilder, opts: PageDirOpts) => Promise<void>;
export default UseFileList;
