import { GetSignedData } from '../Assemblies/Data/HashMaps/Roblox.Data.HashMaps/SignData';

describe('GetSignedData', () => {
	it('Should return a SHA-1 Base64 encoded hash.', () => {
		const data = GetSignedData('test');

		expect(data).toEqual(
			'A4fTGAN8K4NBOZXLIxNpng3A3fnm1MXZbx81CSpEen7zCLWDcjTkZufJc183UJRCmTkd+I1WYL8aNLvaJo9bwE5ixEJVQEexH2FGJF409sosptdEcqRDK6HsewlRRio2ivI/3FVjuufbFcQlZFnNtxrzujQT6Vt/t4OBbwYPthE=',
		);
	});
});
