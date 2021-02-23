import { Roblox } from '../../Api';
import FileStream from 'fs';

export namespace Pages {
	export function GetPageCursorByKey(Key: String): String {
		const Directory = `${Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory}\\Manifest\\pages\\${Key}.json`;
		if (!FileStream.existsSync(Directory)) return '';
		let Data = FileStream.readFileSync(Directory, { encoding: 'utf-8' });
		Data = JSON.parse(Data);
		if (!Data || !Data['Cursor']) return '';
		return Data['Cursor'];
	}
	export function GetCursorLimitByKey(Key: String): Number {
		const Directory = `${Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory}\\Manifest\\pages\\${Key}.json`;
		if (!FileStream.existsSync(Directory)) return 0;
		let Data = FileStream.readFileSync(Directory, { encoding: 'utf-8' });
		Data = JSON.parse(Data);
		if (!Data || !Data['Limit']) return 0;
		return Data['Limit'];
	}
	export function SetPageByKey(Key: String, Cursor: String, Limit: Number = 0, OverwriteCursor: Boolean = true): String {
		const localCursor = GetPageCursorByKey(Key);
		if (localCursor.length !== 0 && GetCursorLimitByKey(Key) !== Limit) return localCursor;
		const Directory = `${Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory}\\Manifest\\pages\\${Key}.json`;
		const Data = {
			Cursor: localCursor.length !== 0 && !OverwriteCursor ? localCursor : Cursor,
			Limit,
		};
		FileStream.writeFileSync(Directory, JSON.stringify(Data, undefined, 4));
		return Cursor;
	}
}
