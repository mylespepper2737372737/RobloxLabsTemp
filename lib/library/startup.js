"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const DeveloperExeptionPage_1 = __importDefault(require("../global/DeveloperExeptionPage"));
const UseRouting_1 = __importDefault(require("../global/UseRouting"));
const MapControllers_1 = __importDefault(require("../global/MapControllers"));
const UsePages_1 = __importDefault(require("../global/UsePages"));
class Startup {
}
exports.default = Startup;
Startup.Configure = async (opts) => {
    try {
        opts.app.disable('etag');
        opts.app.disable('case sensitive routing');
        opts.app.enable('trust proxy');
        opts.app.disable('x-powered-by');
        opts.app.disable('strict routing');
        opts.app.use(cookie_parser_1.default(), express_1.json(), body_parser_1.default.urlencoded({ extended: false }));
        if (opts.UsePages) {
            await UsePages_1.default(opts.app, opts.PagesOpts, opts.PageOpts);
        }
        if (opts.UseRouting) {
            await UseRouting_1.default(opts.app, opts.RoutingOpts);
        }
        if (opts.UseEndpoints) {
            await MapControllers_1.default(opts.app, opts.EndpointOpts);
        }
        if (opts.errorpage) {
            await DeveloperExeptionPage_1.default(opts.app);
        }
    }
    catch (err) {
        throw new Error(err);
    }
};
