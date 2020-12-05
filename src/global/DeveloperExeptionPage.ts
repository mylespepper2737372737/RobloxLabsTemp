import { Express as IApplicationBuilder } from 'express-serve-static-core';
/**
 *
 * @param app The app you wish to add to
 */
const DeveloperExceptionPage = (app: IApplicationBuilder): Promise<void> => {
	return new Promise((r) => {
		app.all('/Error.ashx', (request, response) => {
			response.status(request.query.code !== undefined ? parseInt(request.query.code as string) || 400 : 400);
			const msg = request.query.message;
			response.send({
				Error: parseInt(request.query.code as string) || response.statusCode,
				Message: `${
					msg || (response.statusCode === 400 ? 'BadRequest' : response.statusCode === 404 ? 'NotFound' : '')
				}`,
				Redirect: request.query.redirect
					? `Redirect from: ${
							(request.query.redirect as string).split(';')[0].startsWith('http')
								? (request.query.redirect as string).split(';')[0]
								: 'unknownuri'
					  } to ${
							((request.query.redirect as string).split(';')[1]
								? (request.query.redirect as string).split(';')[1].startsWith('http')
									? (request.query.redirect as string).split(';')[1]
									: 'unknownuri'
								: 'unknownuri') || 'unknownuri'
					  }`
					: undefined,
			});
		});
		r();
	});
};
export default DeveloperExceptionPage;
