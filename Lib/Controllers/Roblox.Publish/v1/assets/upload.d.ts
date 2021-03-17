/// <reference types="qs" />
/// <reference types="express" />
declare const _default: {
    method: string;
    func: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>[];
};
export default _default;
