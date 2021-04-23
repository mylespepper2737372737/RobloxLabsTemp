import { dbInfo } from '../Assemblies/Common/Persistence/Roblox.Common.Persistence/dbInfo';
import { SqlParameter } from '../System/Data/SqlClient/SqlParameter';

(async () => {
	const connStringAndProcedure: dbInfo = new dbInfo('TEST', 'A');
	const connStringProcedureAndSqlParameters: dbInfo = new dbInfo('TEST', 'A', [new SqlParameter('@A', 1)]);
	const connStringProcedureSqlParametersAndPrimaryKey: dbInfo = new dbInfo('TEST', 'A', new SqlParameter('@ID', 2), [
		new SqlParameter('@A', 1),
	]);

	console.log(connStringAndProcedure, connStringProcedureAndSqlParameters, connStringProcedureSqlParametersAndPrimaryKey);
})();
