import { IncomingMessage } from 'http';
import ws from 'ws';
declare const _default: {
    dir: string;
    func: (socket: ws, req: IncomingMessage) => void;
};
export default _default;
