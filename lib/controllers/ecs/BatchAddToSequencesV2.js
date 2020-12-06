"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directories_1 = require("../../modules/constants/directories");
exports.default = {
    dir: '/v1.0/SequenceStatistics/BatchAddToSequencesV2',
    method: 'all',
    func: (_req, res) => {
        res.status(503).sendFile(directories_1._dirname + '\\views\\ecs503.html');
    },
};
