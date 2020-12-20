"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("./modules/constants/ws"));
const ssl_1 = __importDefault(require("./modules/constants/ssl"));
const mapconfig_1 = __importDefault(require("./modules/configs/mapconfig"));
const urls_1 = __importDefault(require("./modules/constants/urls"));
const init_middleware_1 = __importDefault(require("./modules/middleware/init_middleware"));
const _404_1 = require("./modules/middleware/404");
const startup_1 = __importDefault(require("./library/startup"));
const express_1 = __importDefault(require("express"));
(async () => {
    const www = express_1.default();
    const staticcdn = express_1.default();
    const js = express_1.default();
    const css = express_1.default();
    const images = express_1.default();
    const setup = express_1.default();
    const api = express_1.default();
    const ephemeralcounters = express_1.default();
    www.use(init_middleware_1.default);
    staticcdn.use(init_middleware_1.default);
    js.use(init_middleware_1.default);
    css.use(init_middleware_1.default);
    images.use(init_middleware_1.default);
    setup.use(init_middleware_1.default);
    api.use(init_middleware_1.default);
    ephemeralcounters.use(init_middleware_1.default);
    await startup_1.default.Configure(mapconfig_1.default(staticcdn, '\\static', '\\lib\\controllers\\static', urls_1.default['staticcdn']));
    await startup_1.default.Configure(mapconfig_1.default(js, '\\lib\\js', '\\lib\\controllers\\js', urls_1.default['js']));
    await startup_1.default.Configure(mapconfig_1.default(css, '\\css', '\\lib\\controllers\\css', urls_1.default['css']));
    await startup_1.default.Configure(mapconfig_1.default(images, '\\images', '\\lib\\controllers\\images', urls_1.default['images']));
    await startup_1.default.Configure(mapconfig_1.default(api, '\\api', '\\lib\\controllers\\api', urls_1.default['api']));
    await startup_1.default.Configure(mapconfig_1.default(setup, '\\setup', '\\lib\\controllers\\setup', urls_1.default['setup']));
    await startup_1.default.Configure(mapconfig_1.default(www, '\\www', '\\lib\\controllers\\www', urls_1.default['www'], true));
    await startup_1.default.Configure(mapconfig_1.default(ephemeralcounters, '\\ecs', '\\lib\\controllers\\ecs', urls_1.default['ephemeralcounters']));
    api.use(_404_1.api404);
    staticcdn.use(_404_1.staticcdn404);
    js.use(_404_1.js404);
    css.use(_404_1.css404);
    images.use(_404_1.images404);
    setup.use(_404_1.setup404);
    www.use(_404_1.www404);
    ephemeralcounters.use(_404_1.ecs404);
    await (async () => {
        try {
            ssl_1.default(images, urls_1.default['images']);
            ssl_1.default(www, urls_1.default['www']);
            const [apiHttp, apiHttps] = ssl_1.default(api, urls_1.default['api']);
            ssl_1.default(staticcdn, urls_1.default['staticcdn']);
            ssl_1.default(js, urls_1.default['js']);
            ssl_1.default(css, urls_1.default['css']);
            ssl_1.default(setup, urls_1.default['setup']);
            ssl_1.default(ephemeralcounters, urls_1.default['ephemeralcounters']);
            await ws_1.default(apiHttp, apiHttps, '\\lib\\sockets\\api', urls_1.default['api']);
        }
        catch (e) {
            throw new Error(e);
        }
    })();
})();
