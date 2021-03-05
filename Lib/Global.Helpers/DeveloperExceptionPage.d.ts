import { Express as IApplicationBuilder } from 'express-serve-static-core';
declare const DeveloperExceptionPage: (app: IApplicationBuilder) => Promise<void>;
export default DeveloperExceptionPage;
