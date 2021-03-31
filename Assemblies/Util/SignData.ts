import { Response } from 'express';
import filestream from 'fs';
import crypto from 'crypto';
import { RobloxLegacy } from '../Api';

export function SignFile(fileName: string, response: Response, useBaseDirectory: boolean = true) {
	try {
		const file = filestream.readFileSync(
			`${useBaseDirectory ? RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory : ''}${
				useBaseDirectory && !fileName.startsWith('\\') ? '\\' : ''
			}${fileName}`,
			'utf-8',
		);
		return SignData(file, response);
	} catch (e) {
		throw new Error("There was an error signing the given file, the file most likely didn't exist or the path entered was wrong.");
	}
}

export function SignData(data: string, response: Response) {
	const signature = crypto.createSign('sha1');
	const splitter = '\r\n' + data;
	signature.write(splitter);
	signature.end();

	const key = filestream.readFileSync(RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\InternalCDN\\PrivateKey.pem'); // Change the directory if needed.
	const sig = signature.sign(key, 'base64');

	const out = `--rbxsig%${sig}%${splitter}`;
	response.contentType('text/plain');
	response.send(out);
}
