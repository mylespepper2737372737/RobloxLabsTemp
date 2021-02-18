import evts from 'events';
const evtss = [];
export default {
	subscribe: (evt: evts.EventEmitter) => {
		evtss.push(evt);
	},
	push: (cid: string, cid2: number, userid: number[]) => {
		evtss.forEach((v) => {
			v.emit('message', cid, userid);
		});
	},
};
