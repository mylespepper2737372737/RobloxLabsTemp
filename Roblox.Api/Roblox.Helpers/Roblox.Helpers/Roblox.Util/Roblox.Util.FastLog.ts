// Channel 1: Non-chatty / important events (Game started, loaded UI script) -- more permanent messages
// Channel 2: Per frame data
// Channel 3-7: User defined / used for debugging / more temporary

// Refactor, Refator, Refactor!!

import { ClientSettings, Group } from './Roblox.Util.ClientSettings';
const FFlag = ClientSettings.GetSettings(Group.FFlag);
import fs from 'fs';
import { _dirname } from '../../Roblox.Constants/Roblox.Directories';
import dotenv from 'dotenv';

dotenv.config({ path: _dirname + '\\.env' });

/**
 * Create a new LogGroup
 * @param Group The name of the group
 * @constructor
 */
export const LOGGROUP = (Group: string): any => {
	FLog[Group] = Group;
};

/**
 * Make a COMMENT Log
 * @param Group The group to log for
 * @param message The message to log with
 * @param LogToFile Should log to report.log
 * @constructor
 */
export const FASTLOG1 = (Group: string, message: string, LogToFile?: boolean): any => {
	if (!FFlag['AreLogsEnabled']) return;
	if (process.env['NODE_ENV'] !== 'debug') return;

	console.log(`\x1b[90m${new Date(Date.now()).toISOString()} \[\x1b[37m${Group.toUpperCase()}-COMMENT\x1b[90m\] %s\x1b[0m`, message);
	if (LogToFile)
		fs.appendFileSync(
			_dirname + '\\report.log',
			`${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-COMMENT] ${message}\n`,
			{
				encoding: 'utf-8',
			},
		);
};

/**
 * Make a INFO Log
 * @param Group The group to log for
 * @param message The message to log with
 * @param LogToFile Should log to report.log
 * @constructor
 */
export const FASTLOG2 = (Group: string, message: string, LogToFile?: boolean): any => {
	if (!FFlag['AreLogsEnabled']) return;
	if (process.env['NODE_ENV'] !== 'debug') return;

	console.log(`\x1b[37m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-INFO\x1b[37m\] %s\x1b[0m`, message);
	if (LogToFile)
		fs.appendFileSync(_dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-INFO] ${message}\n`, {
			encoding: 'utf-8',
		});
};

/**
 * Make a LOG Log
 * @param Group The group to log for
 * @param message The message to log with
 * @param LogToFile Should log to report.log
 * @constructor
 */
export const FASTLOG3 = (Group: string, message: string, LogToFile?: boolean): any => {
	if (!FFlag['AreLogsEnabled']) return;
	if (process.env['NODE_ENV'] !== 'debug') return;

	console.log(`\x1b[36m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-LOG\x1b[36m\] %s\x1b[0m`, message);
	if (LogToFile)
		fs.appendFileSync(_dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-LOG] ${message}\n`, {
			encoding: 'utf-8',
		});
};

/**
 * Make a WARN Log
 * @param Group The group to log for
 * @param message The message to log with
 * @param LogToFile Should log to report.log
 * @constructor
 */
export const FASTLOG4 = (Group: string, message: string, LogToFile?: boolean): any => {
	if (!FFlag['AreLogsEnabled']) return;
	if (process.env['NODE_ENV'] !== 'debug') return;

	console.log(`\x1b[33m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-WARN\x1b[33m\] %s\x1b[0m`, message);
	if (LogToFile)
		fs.appendFileSync(_dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-WARN] ${message}\n`, {
			encoding: 'utf-8',
		});
};

/**
 * Make a DEBUG Log
 * @param Group The group to log for
 * @param message The message to log with
 * @param LogToFile Should log to report.log
 * @constructor
 */
export const FASTLOG5 = (Group: string, message: string, LogToFile?: boolean): any => {
	if (!FFlag['AreLogsEnabled']) return;
	if (process.env['NODE_ENV'] !== 'debug') return;

	console.log(`\x1b[35m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-DEBUG\x1b[35m\] %s\x1b[0m`, message);
	if (LogToFile)
		fs.appendFileSync(_dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-DEBUG] ${message}\n`, {
			encoding: 'utf-8',
		});
};

/**
 * Make a ERROR Log
 * @param Group The group to log for
 * @param message The message to log with
 * @param LogToFile Should log to report.log
 * @constructor
 */
export const FASTLOG6 = (Group: string, message: string, LogToFile?: boolean): any => {
	if (!FFlag['AreLogsEnabled']) return;
	if (process.env['NODE_ENV'] !== 'debug') return;

	console.log(`\x1b[31m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-ERROR\x1b[31m\] %s\x1b[0m`, message);
	if (LogToFile)
		fs.appendFileSync(_dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-ERROR] ${message}\n`, {
			encoding: 'utf-8',
		});
};

/**
 * Make a FATAL Log
 * @param Group The group to log for
 * @param message The message to log with
 * @param LogToFile Should log to report.log
 * @constructor
 */
export const FASTLOG7 = (Group: string, message: string, LogToFile?: boolean): any => {
	if (!FFlag['AreLogsEnabled']) return;
	if (process.env['NODE_ENV'] !== 'debug') return;

	console.log(`\x1b[91m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-FATAL\x1b[91m\] %s\x1b[0m`, message);
	if (LogToFile)
		fs.appendFileSync(_dirname + '\\report.log', `${new Date(Date.now()).toISOString()} [${Group.toUpperCase()}-FATAL] ${message}\n`, {
			encoding: 'utf-8',
		});
};

export const FLog = {};
export const DFLog = {};
export const SFLog = {};

const parameterizedString = (...args: any[]) => {
	const string = args[0];
	let i = 1;
	return string.replace(/%((%)|s|d|f|lf|i|x|X)/g, function (m) {
		// m is the matched format, e.g. %s, %d
		let val = null;
		if (m[2]) {
			val = m[2];
		} else {
			val = args[i];
			// A switch statement so that the formatter can be extended. Default is %s
			switch (m) {
				case '%d' || '%f' || '%lf':
					val = parseFloat(val);
					if (isNaN(val)) {
						val = 0;
					}
					break;
				case '%i':
					val = parseInt(val);
					if (isNaN(val)) {
						val = 0;
					}
					break;
				case '%x':
					val = val.toString(16).toLowerCase();
					break;
				case '%X':
					val = val.toString(16).toUpperCase();
					break;
			}
			i++;
		}
		return val;
	});
};

export namespace FastLog {
	function printMessage(
		group: string,
		level: number,
		threadId: number,
		timeStamp: string,
		message: string,
		arg0: any,
		arg1: any,
		arg2: any,
		arg3: any,
		arg4: any,
	) {
		const formatted = parameterizedString(message, arg0, arg1, arg2, arg3, arg4);
		console.log(`${timeStamp},${process.uptime()},${threadId.toString(16)},${Math.floor(level)} [${group}] ${formatted}`);
	}
	function FastLog(groupName: string, level: number, message: string, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any) {
		if (FFlag['AreLogsEnabled']) {
			printMessage(groupName, level, process.pid, new Date(Date.now()).toISOString(), message, arg0, arg1, arg2, arg3, arg4);
			const formatted = parameterizedString(message, arg0, arg1, arg2, arg3, arg4);
			fs.appendFileSync(
				_dirname + '\\report.log',
				`${new Date(Date.now()).toISOString()},${process.uptime()},${process.pid.toString(16)},${Math.floor(
					level,
				)} [${groupName}] ${formatted}\n`,
				{
					encoding: 'utf-8',
				},
			);
		}
	}
	export const FASTLOG = (groupName: string, group: number, message: string) => {
		do {
			if (group) FastLog(groupName, group, message, null, null, null, null, null);
		} while (0);
	};
	export const FASTLOG1 = (groupName: string, group: number, message: string, arg0: any) => {
		do {
			if (group) FastLog(groupName, group, message, arg0, null, null, null, null);
		} while (0);
	};
	export const FASTLOG2 = (groupName: string, group: number, message: string, arg0: any, arg1: any) => {
		do {
			if (group) FastLog(groupName, group, message, arg0, arg1, null, null, null);
		} while (0);
	};
	export const FASTLOG3 = (groupName: string, group: number, message: string, arg0: any, arg1: any, arg2: any) => {
		do {
			if (group) FastLog(groupName, group, message, arg0, arg1, arg2, null, null);
		} while (0);
	};
	export const FASTLOG4 = (groupName: string, group: number, message: string, arg0: any, arg1: any, arg2: any, arg3: any) => {
		do {
			if (group) FastLog(groupName, group, message, arg0, arg1, arg2, arg3, null);
		} while (0);
	};
	export const FASTLOG5 = (groupName: string, group: number, message: string, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any) => {
		do {
			if (group) FastLog(groupName, group, message, arg0, arg1, arg2, arg3, arg4);
		} while (0);
	};

	export const FASTLOGS = (groupName: string, group: number, message: string, sarg: string) => {
		do {
			if (group) FastLog(groupName, group, message, sarg, null, null, null, null);
		} while (0);
	};
	export const FASTLOG1F = (groupName: string, group: number, message: string, arg0: number) => {
		do {
			if (group) FastLog(groupName, group, message, arg0, null, null, null, null);
		} while (0);
	};
	export const FASTLOG2F = (groupName: string, group: number, message: string, arg0: number, arg1: number) => {
		do {
			if (group) FastLog(groupName, group, message, arg0, arg1, null, null, null);
		} while (0);
	};
	export const FASTLOG3F = (groupName: string, group: number, message: string, arg0: number, arg1: number, arg2: number) => {
		do {
			if (group) FastLog(groupName, group, message, arg0, arg1, arg2, null, null);
		} while (0);
	};
	export const FASTLOG4F = (
		groupName: string,
		group: number,
		message: string,
		arg0: number,
		arg1: number,
		arg2: number,
		arg3: number,
	) => {
		do {
			if (group) FastLog(groupName, group, message, arg0, arg1, arg2, arg3, null);
		} while (0);
	};

	export const FASTLOGNOFILTER = (groupName: string, group: number, message: string) => {
		FastLog(groupName, group, message, null, null, null, null, null);
	};
	export const FASTLOGNOFILTER2 = (groupName: string, group: number, message: string, arg0: any, arg1: any) => {
		FastLog(groupName, group, message, arg0, arg1, null, null, null);
	};

	export const LOGGROUP = (group: string) => {
		if (FLog[group] === undefined) FLog[group] = 0;
	};
	export const LOGVARIABLE = (group: string, defaulton: number) => {
		FLog[group] = defaulton;
	};

	export const DYNAMIC_LOGGROUP = (group: string) => {
		if (DFLog[group] === undefined) DFLog[group] = 0;
	};
	export const DYNAMIC_LOGVARIABLE = (group: string, defaulton: number) => {
		DFLog[group] = defaulton;
	};

	export const SYNCHRONIZED_LOGGROUP = (group: string) => {
		if (SFLog[group] === undefined) SFLog[group] = 0;
	};
	export const SYNCHRONIZED_LOGVARIABLE = (group: string, defaulton: number) => {
		SFLog[group] = defaulton;
	};
}
