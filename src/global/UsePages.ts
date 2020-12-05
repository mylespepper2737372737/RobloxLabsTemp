import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { static as Pages } from 'express';
import { OutgoingMessage } from 'http';
const _dirname = 'C:\\Users\\Padraig\\Git\\Mfd\\Web\\mfdlabs.com\\lib';
interface PageDirOpts {
	path?: string;
}
interface PageOpts<R extends OutgoingMessage = OutgoingMessage> {
	cacheControl?: boolean;
	dotfiles?: string;
	etag?: boolean;
	extensions?: string[] | false;
	fallthrough?: boolean;
	immutable?: boolean;
	index?: boolean | string | string[];
	lastModified?: boolean;
	maxAge?: number | string;
	redirect?: boolean;
	setHeaders?: (res: R, path: string, stat: unknown) => unknown;
}
const UsePages = (app: IApplicationBuilder, opts: PageDirOpts, PagesOpts: PageOpts): Promise<void> => {
	return new Promise((r) => {
		const path = (opts !== undefined ? opts.path : _dirname + '\\pages') || _dirname + '\\pages';
		app.use(Pages(path, PagesOpts));
		r();
	});
};
export default UsePages;
