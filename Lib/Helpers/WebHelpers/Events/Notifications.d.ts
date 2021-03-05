import evts from 'events';
declare const _default: {
    subscribe: (key: string, evt: evts.EventEmitter) => void;
    unsubscribe: (key: string) => void;
    push: (id: string, cid: string, userid: number[]) => void;
};
export default _default;
