import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { Router } from 'express';
interface RouterOptions {
	caseSensitive?: boolean;
	mergeParams?: boolean;
	strict?: boolean;
}
const UseRouting = (app: IApplicationBuilder, opts?: RouterOptions): Promise<void> => {
	return new Promise((r) => {
		app.use(Router(opts));
		r();
	});
};
export default UseRouting;
