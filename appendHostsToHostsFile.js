/**
 * Written By: Yaakov Tesviniski, Nikita Petko
 * Description: Tries to write the file `hosts.txt` to `/etc/hosts` (Linux) or `C:\Windows\System32\Drivers\etc\hosts`, this will require root, so you will have to either run the full job with sudo
 * 				or open your terminal with adminstrator permissions.
 * Note: Right now this is only supported on Win32, Linux and Darwin, it will exit if you try on anything else.
 */

const filestream = require('fs');
const path = require('path');
const { EOL } = require('os');

/**
	@param {string[]} args */ ((args) => {
	console.log(
		'If hosts were removed or changed, you will have to remove the old ones then, as this only supports add new hosts, not removing or updating them yet.',
	);
	const strArgs = ((args || []).join(' ') || '') + ' ';

	/* Pull this out to a helper that does this regex by itself */
	const showHelpMessage = checkIsSingleCommandLineArgValid(strArgs, 'h');
	if (showHelpMessage) {
		return printHelpMessageAndExit();
	}

	const isVerbose = checkIsSingleCommandLineArgValid(strArgs, 'v') || checkIsLongArgIncludedInCommandLineArgs(strArgs, 'verbose');
	const exitWithBadCodeOnFail = checkIsLongArgIncludedInCommandLineArgs(strArgs, '--exit-with-bad-code-on-failure');
	if (!checkIfOSIsAllowed()) {
		if (isVerbose) console.log(`The OS ${process.platform} is not allowed.`);
		return;
	}

	const toBeWritten = filestream.readFileSync(__dirname + '/hosts.txt', 'utf-8');
	const hostsFileLocation = getHostsFileDirectory();
	let didWrite = false;
	try {
		let data;
		const alreadyWritten = filestream.readFileSync(hostsFileLocation, 'utf-8');
		[data, didWrite] = compareAndGiveStringIfDoesNotMatch(
			toBeWritten.split(getFileEndingByOS()),
			alreadyWritten.split(getFileEndingByOS()),
			isVerbose,
		);
		if (didWrite) filestream.writeFileSync(hostsFileLocation, data, { encoding: 'utf-8' });
	} catch (e) {
		if (e.errno === -4048 || e.errno === -13) {
			console.log(
				'\x1b[31m%s\x1b[37m',
				`[Error] Could not read or write to ${hostsFileLocation}, because we didn't have permissions. ${getErrorStringByOS()}`,
			);
		} else {
			console.log(
				'\x1b[31m%s\x1b[37m',
				`[Error] Could not read or write to ${hostsFileLocation}, because an unkown error occurred, but was caught, see the error message here: ${e.message}.`,
			);
		}
		if (exitWithBadCodeOnFail) {
			return process.exit(1);
		}
		return process.exit(0);
	} finally {
		if (didWrite) {
			console.log(`Successfully wrote data to ${hostsFileLocation}.`);
			return process.exit(0);
		}
		console.log(`The file didn't need to be written to, exiting.`);
		return process.exit(0);
	}
})(process.argv.slice(2));

/**
 * Compares the already existing hosts file, and compares the new hosts file to see similarities.
 * @param {string[]} toBeWritten An array of hosts to be written.
 * @param {string[]} alreadyWritten An array of hosts that exist already.
 * @param {boolean} isVerbose Will log verbose messages if true.
 * @returns {[string, boolean]}
 */
function compareAndGiveStringIfDoesNotMatch(toBeWritten, alreadyWritten, isVerbose) {
	let didWrite = false;
	for (let i = 0; i < toBeWritten.length; ++i) {
		const element = alreadyWritten.find((v) => v === toBeWritten[i]);

		if (element === undefined) {
			if (!didWrite) didWrite = true;
			if (isVerbose) console.log(`The entry was not in the hosts file, add. ${toBeWritten[i].trim()}.`);
			alreadyWritten.push(toBeWritten[i]);
		}
	}

	return [alreadyWritten.join(getFileEndingByOS()), didWrite];
}

function getHostsFileDirectory() {
	switch (process.platform) {
		case 'linux':
			return '/etc/hosts';
		case 'win32':
			return 'C:\\Windows\\System32\\Drivers\\ETC\\hosts';
		case 'darwin':
			// It could possibly be in /etc/hosts or /private/etc/hosts, we will use /etc/hosts for now; please put an issue at https://backlog.git.mfdlabs.local/MFDLABS/RobloxTS/V4/Submit with your issue and solution.
			return '/etc/hosts';
	}
}

function getErrorStringByOS() {
	switch (process.platform) {
		case 'linux' || 'darwin':
			return `Did you run it like 'sudo ${process.argv[0]} ${__filename}'?`;
		case 'win32':
			return `Did you run ${getRunningExecutable()} as administrator?`;
	}
}

function getRunningExecutable() {
	const t = path.basename(process.title);
	return t.length > 1 ? t : 'Your Command Shell';
}

function getFileEndingByOS() {
	return EOL;
}

function checkIfOSIsAllowed() {
	return process.platform === 'win32' || process.platform === 'linux' || process.platform === 'darwin';
}

function printHelpMessageAndExit() {
	console.log(`Written by Yaakov Tesviniski and Nikita Petko, a simple javascript runtime that writes to hosts files for (https://github.com/mfdlabs/robloxlabs.com) for Linux, Win32 and Darwin

-h, --help 					Display the help message.
-v, --verbose 					Verbose.
--exit-with-bad-code-on-failure 		If catch is hit, exit with code 1.
`);
	return process.exit(0);
}

/**
 * @param {string} args
 * @param {string} singleArg
 * @returns {boolean}
 */
function checkIsSingleCommandLineArgValid(args, singleArg) {
	const regex = new RegExp(`[\s]?-[${singleArg}][^a-zA-Z][\s]?`, 'i');
	return args.match(regex) !== null;
}

/**
 * @param {string} args
 * @param {string} longArg
 * @returns {boolean}
 */
function checkIsLongArgIncludedInCommandLineArgs(args, longArg) {
	const regex = new RegExp(`--${longArg}[^a-zA-Z][\s]?`, 'i');
	return args.match(regex) !== null;
}
