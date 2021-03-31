import {
	DFLog,
	DYNAMIC_LOGGROUP,
	DYNAMIC_LOGVARIABLE,
	FASTLOG,
	FASTLOG1,
	FASTLOG1F,
	FASTLOG2,
	FASTLOG2F,
	FASTLOG3,
	FASTLOG3F,
	FASTLOG4,
	FASTLOG4F,
	FASTLOG5,
	FASTLOGS,
	FLog,
	LOGGROUP,
	LOGVARIABLE,
	SFLog,
	SYNCHRONIZED_LOGGROUP,
	SYNCHRONIZED_LOGVARIABLE,
} from '../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';

// Declare the defaults
LOGVARIABLE('Test', 7);
DYNAMIC_LOGVARIABLE('Test', 7);
SYNCHRONIZED_LOGVARIABLE('Test', 7);

// Reuse them (buggy)
LOGGROUP('Test'); // FLog
DYNAMIC_LOGGROUP('Test'); // DFLog
SYNCHRONIZED_LOGGROUP('Test'); // SFLog

// FASTLOG -- Singular message, no arguments.
FASTLOG(FLog['Test'], '[FLog::Test] FastLog test using FLog::Test');
FASTLOG(DFLog('Test'), '[DFLog::Test] FastLog test using DFLog::Test'); // You need to call DFLog here, as it refetches the DynamicValues
FASTLOG(SFLog['Test'], '[SFLog::Test] FastLog test using SFLog::Test');

// FASTLOGS -- Message and one string argument.
FASTLOGS(FLog['Test'], '[FLog::Test] FastLogString Test using FLog::Test with the argument "%s"', 'SomeString');
FASTLOGS(DFLog('Test'), '[DFLog::Test] FastLogString Test using DFLog::Test with the argument "%s"', 'SomeString');
FASTLOGS(SFLog['Test'], '[SFLog::Test] FastLogString Test using SFLog::Test with the argument "%s"', 'SomeString');

// FASTLOG1 -- Message and one argument of any type.
FASTLOG1(FLog['Test'], '[FLog::Test] FastLog1Arg Test using FLog::Test with the argument %d', 1);
FASTLOG1(DFLog('Test'), '[DFLog::Test] FastLog1Arg Test using DFLog::Test with the argument %d', 1);
FASTLOG1(SFLog['Test'], '[SFLog::Test] FastLog1Arg Test using SFLog::Test with the argument %d', 1);

// FASTLOG2 -- Message and 2 arguments of any type.
FASTLOG2(FLog['Test'], '[FLog::Test] FastLog2Args Test using FLog::Test with the argument %d and %s', 1, 'SomeString');
FASTLOG2(DFLog('Test'), '[DFLog::Test] FastLog2Args Test using DFLog::Test with the argument %d and %s', 1, 'SomeString');
FASTLOG2(SFLog['Test'], '[SFLog::Test] FastLog2Args Test using SFLog::Test with the argument %d and %s', 1, 'SomeString');

// FASTLOG3 -- Message and 3 arguments of any type.
FASTLOG3(FLog['Test'], '[FLog::Test] FastLog3Args Test using FLog::Test with the argument %d, %s and %i', 1, 'SomeString', 10);
FASTLOG3(DFLog('Test'), '[DFLog::Test] FastLog3Args Test using DFLog::Test with the argument %d, %s and %i', 1, 'SomeString', 10);
FASTLOG3(SFLog['Test'], '[SFLog::Test] FastLog3Args Test using SFLog::Test with the argument %d, %s and %i', 1, 'SomeString', 10);

// FASTLOG4 -- Message and 4 arguments of any type.
FASTLOG4(FLog['Test'], '[FLog::Test] FastLog4Args Test using FLog::Test with the argument %d, %s, %i and %u', 1, 'SomeString', 10, true);
FASTLOG4(DFLog('Test'), '[DFLog::Test] FastLog4Args Test using DFLog::Test with the argument %d, %s, %i and %u', 1, 'SomeString', 10, true);
FASTLOG4(SFLog['Test'], '[SFLog::Test] FastLog4Args Test using SFLog::Test with the argument %d, %s, %i and %u', 1, 'SomeString', 10, true);

// FASTLOG5 -- The maximum arg count, Message and 5 arguments of any type.
FASTLOG5(
	FLog['Test'],
	'[FLog::Test] FastLog5Args Test using FLog::Test with the argument %d, %s, %i, %u and %x',
	1,
	'SomeString',
	10,
	true,
	1000,
);
FASTLOG5(
	DFLog('Test'),
	'[DFLog::Test] FastLog5Args Test using DFLog::Test with the argument %d, %s, %i, %u and %x',
	1,
	'SomeString',
	10,
	true,
	1000,
);
FASTLOG5(
	SFLog['Test'],
	'[SFLog::Test] FastLog5Args Test using SFLog::Test with the argument %d, %s, %i, %u and %x',
	1,
	'SomeString',
	10,
	true,
	1000,
);

// FASTLOG1F -- Message and one number argument.
FASTLOG1F(FLog['Test'], '[FLog::Test] FastLog1NumArg Test using FLog::Test with the argument %d', 1);
FASTLOG1F(DFLog('Test'), '[DFLog::Test] FastLog1NumArg Test using DFLog::Test with the argument %d', 1);
FASTLOG1F(SFLog['Test'], '[SFLog::Test] FastLog1NumArg Test using SFLog::Test with the argument %d', 1);

// FASTLOG2F -- Message and 2 number arguments.
FASTLOG2F(FLog['Test'], '[FLog::Test] FastLog2NumArgs Test using FLog::Test with the argument %d and %i', 1, 2);
FASTLOG2F(DFLog('Test'), '[DFLog::Test] FastLog2NumArgs Test using DFLog::Test with the argument %d and %i', 1, 2);
FASTLOG2F(SFLog['Test'], '[SFLog::Test] FastLog2NumArgs Test using SFLog::Test with the argument %d and %i', 1, 2);

// FASTLOG3F -- Message and 3 number arguments.
FASTLOG3F(FLog['Test'], '[FLog::Test] FastLog3NumArgs Test using FLog::Test with the argument %d, %i and %f', 1, 2, 10);
FASTLOG3F(DFLog('Test'), '[DFLog::Test] FastLog3NumArgs Test using DFLog::Test with the argument %d, %i and %f', 1, 2, 10);
FASTLOG3F(SFLog['Test'], '[SFLog::Test] FastLog3NumArgs Test using SFLog::Test with the argument %d, %i and %f', 1, 2, 10);

// FASTLOG4F -- Message and 4 number arguments.
FASTLOG4F(FLog['Test'], '[FLog::Test] FastLog2NumArgs Test using FLog::Test with the argument %d, %i, %f and %u', 1, 2, 10, 50);
FASTLOG4F(DFLog('Test'), '[DFLog::Test] FastLog2NumArgs Test using DFLog::Test with the argument %d, %i, %f and %u', 1, 2, 10, 50);
FASTLOG4F(SFLog['Test'], '[SFLog::Test] FastLog2NumArgs Test using SFLog::Test with the argument %d, %i, %f and %u', 1, 2, 10, 50);
