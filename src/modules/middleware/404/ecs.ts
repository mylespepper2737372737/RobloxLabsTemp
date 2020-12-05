import { _dirname } from '../../constants/directories';
export default (
	req: { method: string },
	res: { status: (arg0: number) => { (): any; new (): any; sendFile: { (arg0: string): void; new (): any } } },
) => {
	res.status(req.method === 'OPTIONS' ? 200 : 404).sendFile(_dirname + '\\views\\ecs404.html');
};
