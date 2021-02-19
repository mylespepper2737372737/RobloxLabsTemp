import evts from 'events';
const evtss = [];
export default {
	subscribe: (evt: evts.EventEmitter) => {
		evtss.push(evt);
	},
	push: (cid: string, userid: number[]) => {
		evtss.forEach((v) => {
			v.emit('message', cid, userid);
		});
	},
};
