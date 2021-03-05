import { Express as IApplicationBuilder } from 'express-serve-static-core';
interface EndpointOpts {
    path?: string;
    logSetups?: boolean;
    apiName?: string;
}
declare const MapControllers: (app?: IApplicationBuilder, opts?: EndpointOpts) => Promise<void>;
export default MapControllers;
