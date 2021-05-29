import { Response } from 'express';
import filestream from 'fs';
import crypto from 'crypto';
import { __baseDirName } from '../../../Common/Constants/Roblox.Common.Constants/Directories';

export function SignFileAndRespond(fileName: string, response: Response, useBaseDirectory: boolean = true) {
	try {
		const file = filestream.readFileSync(
			`${useBaseDirectory ? __baseDirName : ''}${useBaseDirectory && !fileName.startsWith('/') ? '/' : ''}${fileName}`,
			'utf-8',
		);
		return SendSignedResponse(file, response);
	} catch (e) {
		throw new Error("There was an error signing the given file, the file most likely didn't exist or the path entered was wrong.");
	}
}

export function SendSignedResponse(data: string, response: Response) {
	const signature = crypto.createSign('sha1');
	const splitter = '\r\n' + data;
	signature.write(splitter);
	signature.end();

	const key = filestream.readFileSync(__baseDirName + '/InternalCDN/PrivateKey.pem'); // Change the directory if needed.
	const sig = signature.sign(key, 'base64');

	const out = `--rbxsig%${sig}%${splitter}`;
	response.contentType('text/plain');
	response.send(out);
}

export function GetSignedData(data: string) {
	const signature = crypto.createSign('sha1');
	signature.write(data);
	signature.end();

	const key = filestream.readFileSync(__baseDirName + '/InternalCDN/PrivateKey.pem'); // Change the directory if needed.
	const sig = signature.sign(key, 'base64');
	return sig;
}
