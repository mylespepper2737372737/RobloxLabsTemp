"use strict";
const GetManifests_1 = require("./GetManifests");
module.exports = (id) => {
    const Manifests = GetManifests_1.GetManifests();
    let isValidId = false;
    Manifests.forEach((value, key) => {
        value.sessionIds.forEach((v) => {
            if (v === id) {
                isValidId = true;
                return;
            }
        });
        if (isValidId)
            return;
    });
    return isValidId;
};
