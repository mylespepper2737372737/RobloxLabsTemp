import { RobloxLegacy } from '../../../Common/Legacy/Roblox.Common.Legacy/RobloxLegacyWrapper';

export default (
	req: { method: string },
	res: { status: (arg0: number) => { (): any; new (): any; sendFile: { (arg0: string): void; new (): any } } },
) => {
	res.status(req.method === 'OPTIONS' ? 200 : 404).sendFile(
		RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\ErrorViews\\DOSArrest\\DOSArrest.404.html',
	);
};
