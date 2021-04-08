import { Some } from './Some';

export const whitespaceCharacters = [
	' ',
	'  ',
	'\b',
	'\t',
	'\n',
	'\v',
	'\f',
	'\r',
	`\"`,
	`\'`,
	`\\`,
	'\u0008',
	'\u0009',
	'\u000A',
	'\u000B',
	'\u000C',
	'\u000D',
	'\u0020',
	'\u0022',
	'\u0027',
	'\u005C',
	'\u00A0',
	'\u2028',
	'\u2029',
	'\uFEFF',
];

export function CheckDoesStringIncludeWhitespace(str: string) {
	return Some((char) => str.indexOf(char) > -1, whitespaceCharacters);
}
