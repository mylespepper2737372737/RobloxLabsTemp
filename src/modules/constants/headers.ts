/*
	FileName: headers.ts
	Written By: Aleksej Brovim Pushnak
	File Type: Module
	Description: Add global headers that all responses should have to this file when you don't want to keep typing it in.

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

	***

	Copyright 2015-2020 MFD

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

// REMOVE Drop p3p for the time being.
export default {
	'cache-control': 'no-cache',
	apiVersion: '12',
	pragma: 'no-cache',
	expires: '-1',
	// p3p: 'CP="CAO DSP COR CURa ADMa DEVa OUR IND PHY ONL UNI COM NAV INT DEM PRE"',
};
