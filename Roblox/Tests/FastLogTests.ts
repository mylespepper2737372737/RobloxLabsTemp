// Decompiled C# into Typescript
// Roblox.FastLogTests.cs - 2014
// 2fefefa-0000-a567-156e-aff2623222

import {
	FastLog,
	LOGGROUP,
	FASTLOG1,
	FASTLOG2,
	FASTLOG3,
	FASTLOG4,
	FASTLOG5,
	FASTLOG6,
	FASTLOG7,
	FLog,
} from '../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
LOGGROUP('TestsV1');

FASTLOG1(FLog['TestsV1'], 'COMMENT Example'); // This will comment
FASTLOG1(FLog['TestsV1'], 'COMMENT Example with a file log', true); // This will comment and log it
FASTLOG2(FLog['TestsV1'], 'INFO Example'); // This will info log
FASTLOG2(FLog['TestsV1'], 'INFO Example with a file log', true); // This will info log and log it
FASTLOG3(FLog['TestsV1'], 'LOG Example'); // This will log
FASTLOG3(FLog['TestsV1'], 'LOG Example with a file log', true); // This will log and log it
FASTLOG4(FLog['TestsV1'], 'WARN Example'); // This will WARN
FASTLOG4(FLog['TestsV1'], 'WARN Example with a file log', true); // This will WARN and log it
FASTLOG5(FLog['TestsV1'], 'DEBUG Example'); // This will debug
FASTLOG5(FLog['TestsV1'], 'DEBUG Example with a file log', true); // This will debug and log it
FASTLOG6(FLog['TestsV1'], 'ERROR Example'); // This will error
FASTLOG6(FLog['TestsV1'], 'ERROR Example with a file log', true); // This will error and log it
FASTLOG7(FLog['TestsV1'], 'FATAL Example'); // This will FATAL
FASTLOG7(FLog['TestsV1'], 'FATAL Example with a file log', true); // This will FATAL and log it

// FastLogV2 Tests:
// Note: Any group < 5 will not log. It will ignore it.
// Note2: 7 is not the max, it will log if it's greater than 5

// FLog
FastLog.LOGVARIABLE('SomeZeroGroup', 0);
FastLog.LOGVARIABLE('SomeOneGroup', 1);
FastLog.LOGVARIABLE('SomeTwoGroup', 2);
FastLog.LOGVARIABLE('SomeThreeGroup', 3);
FastLog.LOGVARIABLE('SomFourGroup', 4);
FastLog.LOGVARIABLE('SomeFiveGroup', 5);
FastLog.LOGVARIABLE('SomeSixGroup', 6);
FastLog.LOGVARIABLE('SomeSevenGroup', 7);

// DFLog
FastLog.DYNAMIC_LOGVARIABLE('SomeZeroGroup', 0);
FastLog.DYNAMIC_LOGVARIABLE('SomeOneGroup', 1);
FastLog.DYNAMIC_LOGVARIABLE('SomeTwoGroup', 2);
FastLog.DYNAMIC_LOGVARIABLE('SomeThreeGroup', 3);
FastLog.DYNAMIC_LOGVARIABLE('SomFourGroup', 4);
FastLog.DYNAMIC_LOGVARIABLE('SomeFiveGroup', 5);
FastLog.DYNAMIC_LOGVARIABLE('SomeSixGroup', 6);
FastLog.DYNAMIC_LOGVARIABLE('SomeSevenGroup', 7);

// SFLog
FastLog.SYNCHRONIZED_LOGVARIABLE('SomeZeroGroup', 0);
FastLog.SYNCHRONIZED_LOGVARIABLE('SomeOneGroup', 1);
FastLog.SYNCHRONIZED_LOGVARIABLE('SomeTwoGroup', 2);
FastLog.SYNCHRONIZED_LOGVARIABLE('SomeThreeGroup', 3);
FastLog.SYNCHRONIZED_LOGVARIABLE('SomFourGroup', 4);
FastLog.SYNCHRONIZED_LOGVARIABLE('SomeFiveGroup', 5);
FastLog.SYNCHRONIZED_LOGVARIABLE('SomeSixGroup', 6);
FastLog.SYNCHRONIZED_LOGVARIABLE('SomeSevenGroup', 7);

// External LogGroup references.

// FLog
FastLog.LOGGROUP('SomeZeroGroup');

// DFLog
FastLog.DYNAMIC_LOGGROUP('SomeZeroGroup');

// SFLog
FastLog.SYNCHRONIZED_LOGGROUP('SomeZeroGroup');

FastLog.FASTLOG(FLog['SomeOneGroup'], '[FLog::SomeZeroGroup] lol');
