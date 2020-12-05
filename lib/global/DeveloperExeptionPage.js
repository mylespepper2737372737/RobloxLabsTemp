"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeveloperExceptionPage = (app) => {
    return new Promise((r) => {
        app.all('/Error.ashx', (request, response) => {
            response.status(request.query.code !== undefined ? parseInt(request.query.code) || 400 : 400);
            const msg = request.query.message;
            response.send({
                Error: parseInt(request.query.code) || response.statusCode,
                Message: `${msg || (response.statusCode === 400 ? 'BadRequest' : response.statusCode === 404 ? 'NotFound' : '')}`,
                Redirect: request.query.redirect
                    ? `Redirect from: ${request.query.redirect.split(';')[0].startsWith('http')
                        ? request.query.redirect.split(';')[0]
                        : 'unknownuri'} to ${(request.query.redirect.split(';')[1]
                        ? request.query.redirect.split(';')[1].startsWith('http')
                            ? request.query.redirect.split(';')[1]
                            : 'unknownuri'
                        : 'unknownuri') || 'unknownuri'}`
                    : undefined,
            });
        });
        r();
    });
};
exports.default = DeveloperExceptionPage;
