"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetSettings_1 = require("../../modules/Helpers/GetSettings");
const FString = GetSettings_1.GetSettings(GetSettings_1.Group.FString);
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
exports.default = {
    dir: '/csrf/v1/get-csrf-token',
    method: 'ALL',
    func: (request, response) => {
        const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag);
        if (request.method === 'OPTIONS')
            return response.status(200).send({ success: true, message: '' });
        if (!DFFlag['IsCSRFV2Enabled'])
            return response.status(503).send({
                success: false,
                message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
                userfacingmessage: 'Service disabled for an unknown amount of time.',
            });
        if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
            return response.status(403).send({ success: false, message: 'HTTPS Required.' });
        if (request.method !== 'POST')
            return response.status(405).send({
                success: false,
                message: `The requested resource does not support http method '${request.method}.'`,
                userfacingmessage: 'Something went wrong.',
            });
        if (DFFlag['IsCSRFV2Hardcoded']) {
            return response
                .status(200)
                .header({
                'access-control-expose-headers': 'X-CSRF-TOKEN, API-TRANSFER',
                'x-csrf-token': FString['CSRFV2HardcodedKey'],
                'api-transfer': 'Expose-Hardcoded-Session-Token#433',
            })
                .send({ success: true, message: 'OK' });
        }
    },
};
