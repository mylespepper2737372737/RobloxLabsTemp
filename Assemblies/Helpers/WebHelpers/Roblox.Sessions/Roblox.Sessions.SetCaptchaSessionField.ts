import filestream from 'fs';
import { _dirname } from '../../Constants/Directories';

export const SetCaptchaSessionField = (
	sessionId: string,
	field: string,
	value: unknown,
	concatToString?: boolean,
	pushIfArray?: boolean,
	popIfUndefined?: boolean,
	index?: number,
	spliceIfIndex?: boolean,
	createIfDoesntExist?: boolean,
) => {
	let session;
	try {
		session = JSON.parse(filestream.readFileSync(_dirname + `\\DataBase\\sessions\\${sessionId}.json`, { encoding: 'utf-8' }));
	} catch (e) {
		return e;
	}
	if (session) {
		if (!createIfDoesntExist && session[field] !== null && !session[field]) return "The field doesn't exist";
		else {
			if (Array.isArray(session[field])) {
				if (spliceIfIndex && index && value === undefined) {
					session[field].splice(index, 1);
					if (!session[field]) session[field] = [];
				} else if (pushIfArray && !popIfUndefined) {
					session[field].push(value);
					if (!session[field]) session[field] = [];
				} else if (popIfUndefined && value === undefined) {
					session[field].pop();
					if (!session[field]) session[field] = [];
				} else {
					session[field] = value;
					if (!session[field]) session[field] = [];
				}
			} else if (typeof session[field] === 'string' && concatToString) {
				session[field] += value.toString();
			} else {
				session[field] = value;
			}
		}
	}
	return filestream.writeFileSync(_dirname + `\\DataBase\\sessions\\${sessionId}.json`, JSON.stringify(session, undefined, 4), {
		encoding: 'utf-8',
	});
};
