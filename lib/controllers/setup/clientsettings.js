"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetSettings_1 = require("../../modules/Helpers/GetSettings");
const Log_1 = require("../../modules/Helpers/Log");
const FFlag = GetSettings_1.GetSettings(GetSettings_1.Group.FFlag);
const FSettings = GetSettings_1.GetSettings(GetSettings_1.Group.FSettings);
exports.default = {
    dir: '/clientsettings/v1/get-flags',
    method: 'all',
    func: (request, response) => {
        const DFFlag = GetSettings_1.GetSettings(GetSettings_1.Group.DFFlag);
        if (!DFFlag['IsClientSettingsAPIEnabled']) {
            Log_1.FASTLOG4(Log_1.FLog['ClientSettingsAPIV1'], 'The service is disabled currently.', true);
            return response.status(503).send({
                code: 503,
                message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
                userfacingmessage: 'Service disabled for an unknown amount of time.',
            });
        }
        if (request.method === 'OPTIONS')
            return response.status(200).send({ success: true, message: '' });
        if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
            Log_1.FASTLOG6(Log_1.FLog['ClientSettingsAPIV1'], 'HTTPS was not given where it was required.', true);
            return response.status(403).send({ success: false, message: 'HTTPS Required.' });
        }
        if (request.method !== 'GET') {
            Log_1.FASTLOG6(Log_1.FLog['ClientSettingsAPIV1'], `${request.method} is not supported`);
            return response.status(405).send({
                success: false,
                message: `The requested resource does not support http method '${request.method}'.`,
            });
        }
        if (!request.query['settingsGroup']) {
            Log_1.FASTLOG6(Log_1.FLog['ClientSettingsAPIV1'], 'settingsGroup did not exist on the request.', true);
            return response.status(400).send({ success: false, message: 'settingsGroup was not supplied' });
        }
        let found = false;
        FSettings.forEach((v) => {
            if (v === request.query['settingsGroup']) {
                found = true;
            }
        });
        if (!found) {
            Log_1.FASTLOG4(Log_1.FLog['ClientSettingsAPIV1'], `The settingsGroup matching ${request.query['settingsGroup']} was not found.`, true);
            return response.status(404).send({
                success: false,
                message: 'settingsGroup not found.',
                userfacingmessage: `The settingsGroup matching ${request.query['settingsGroup']} was not found.`,
            });
        }
        Log_1.FASTLOG1(Log_1.FLog['ClientSettingsAPIV1'], `Successfully got settings for ${request.query['settingsGroup']}`, true);
        return response.status(200).send(JSON.stringify(GetSettings_1.GetSettings(GetSettings_1.Group.All, request.query['settingsGroup'])));
    },
};
