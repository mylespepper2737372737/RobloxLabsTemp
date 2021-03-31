import { PartialDataBase } from '../../PartialDatabase/PartialDataBase';
import { PartialDatabaseConditionType } from '../../PartialDatabase/PartialDatabaseConditionType';
import { ITestEntity } from './TestEntity';
(async () => {
	const db = new PartialDataBase('robloxmarketing', 'root', '');
	const [didConnect, message] = await db.Connect();
	if (!didConnect) throw message;
	const [, , tbl0] = db.GetTable<ITestEntity>('ITestEntity', 'Id', true);
	const [didInsert, errMessage] = await tbl0.InsertValues([
		// { Key: 'Id', Value: 8 }, // When AutoIncrement on PK is true, there is no need to set the PK
		{ Key: 'Test', Value: 'hello' },
	]);
	if (!didInsert) throw errMessage;
	const [didGetRows, reason, result] = await tbl0.SelectKey('Id', 100);
	if (!didGetRows) throw reason;
	console.log(result);
	const [didGetRows2, reason2, result2] = await tbl0.SelectAll(100);
	if (!didGetRows2) throw reason2;
	console.log(result2);
	const [didGetRows3, reason3, result3] = await tbl0.SelectKeys(['Test'], 100);
	if (!didGetRows3) throw reason3;
	console.log(result3);
	const [didGetRows4, reason4, result4] = await tbl0.SelectKeyWhere('Test', {
		Key: 'Id',
		Condition: PartialDatabaseConditionType.Equal,
		Value: 7,
	});

	if (!didGetRows4) throw reason4;
	console.log(result4);

	const [didUpdate, msg] = await tbl0.UpdateKey('Test', 'HELLO', { Key: 'Id', Condition: PartialDatabaseConditionType.Equal, Value: 1 });
	if (!didUpdate) throw msg;

	await db.Disconnect();
})();
