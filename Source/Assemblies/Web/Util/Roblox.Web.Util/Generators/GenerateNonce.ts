import crypto from 'crypto';
export function GenerateBase64EncodedNonce(): [bigint, string] {
	let nonce = crypto.randomBytes(16);
	return [nonce.readBigUInt64BE(), nonce.toString('base64')];
}
