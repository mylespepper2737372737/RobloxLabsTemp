import { _dirname } from '../../modules/constants/directories';
export default {
	dir: '/v1.0/SequenceStatistics/BatchAddToSequencesV2',
	method: 'all',
	func: (
		_req: any,
		res: { status: (arg0: number) => { (): any; new (): any; sendFile: { (arg0: string): void; new (): any } } },
	): void => {
		res.status(503).sendFile(_dirname + '\\views\\ecs503.html');
	},
};
