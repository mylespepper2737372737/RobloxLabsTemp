// Channel 1: Non-chatty / important events (Game started, loaded UI script) -- more permanent messages
// Channel 2: Per frame data
// Channel 3-5: User defined / used for debugging / more temporary

import { GetSettings, Group } from './GetSettings';
const FFlag = GetSettings(Group.FFlag);

/**
 * Create a new LogGroup
 * @param Group The name of the group
 * @constructor
 */
export const LOGGROUP = (Group: string): void => {
	FLog[Group] = Group;
};

/**
 * Make a COMMENT Log
 * @param Group The group to log for
 * @param message The message to log with
 * @constructor
 */
export const FASTLOG1 = (Group: string, message: string): void => {
	if (!FFlag['AreLogsEnabled']) return;
	if (!FLog[Group]) return;
	console.log(`\x1b[90m${new Date(Date.now()).toISOString()} \[\x1b[37m${Group.toUpperCase()}-COMMENT\x1b[90m\] %s\x1b[0m`, message);
};

/**
 * Make a INFO Log
 * @param Group The group to log for
 * @param message The message to log with
 * @constructor
 */
export const FASTLOG2 = (Group: string, message: string): void => {
	if (!FFlag['AreLogsEnabled']) return;
	if (!FLog[Group]) return;
	console.log(`\x1b[37m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-INFO\x1b[37m\] %s\x1b[0m`, message);
};

/**
 * Make a LOG Log
 * @param Group The group to log for
 * @param message The message to log with
 * @constructor
 */
export const FASTLOG3 = (Group: string, message: string): void => {
	if (!FFlag['AreLogsEnabled']) return;
	if (!FLog[Group]) return;
	console.log(`\x1b[36m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-LOG\x1b[36m\] %s\x1b[0m`, message);
};

/**
 * Make a WARN Log
 * @param Group The group to log for
 * @param message The message to log with
 * @constructor
 */
export const FASTLOG4 = (Group: string, message: string): void => {
	if (!FFlag['AreLogsEnabled']) return;
	if (!FLog[Group]) return;
	console.log(`\x1b[33m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-WARN\x1b[33m\] %s\x1b[0m`, message);
};

/**
 * Make a DEBUG Log
 * @param Group The group to log for
 * @param message The message to log with
 * @constructor
 */
export const FASTLOG5 = (Group: string, message: string): void => {
	if (!FFlag['AreLogsEnabled']) return;
	if (!FLog[Group]) return;
	console.log(`\x1b[35m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-DEBUG\x1b[35m\] %s\x1b[0m`, message);
};

/**
 * Make a ERROR Log
 * @param Group The group to log for
 * @param message The message to log with
 * @constructor
 */
export const FASTLOG6 = (Group: string, message: string): void => {
	if (!FFlag['AreLogsEnabled']) return;
	if (!FLog[Group]) return;
	console.log(`\x1b[31m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-ERROR\x1b[31m\] %s\x1b[0m`, message);
};

/**
 * Make a FATAL Log
 * @param Group The group to log for
 * @param message The message to log with
 * @constructor
 */
export const FASTLOG7 = (Group: string, message: string): void => {
	if (!FFlag['AreLogsEnabled']) return;
	if (!FLog[Group]) return;
	console.log(`\x1b[91m${new Date(Date.now()).toISOString()} \[\x1b[90m${Group.toUpperCase()}-FATAL\x1b[91m\] %s\x1b[0m`, message);
};

export const FLog = {
	test: 'test',
};
