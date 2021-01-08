/*
	FileName: www.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: root 404 middleware

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

export default (req: { url: string }, res: { redirect: (arg0: string) => any }) => {
	return res.redirect(
		`https://www.sitetest1.mfdlabs.com/Error.ashx?code=404&message=https://www.sitetest1.mfdlabs.com${escape(req.url)
			.split('?')
			.shift()} NotFound&redirect=https://www.sitetest1.mfdlabs.com${escape(req.url)
			.split('?')
			.shift()};http://www.sitetest1.mfdlabs.com/Error.ashx`,
	);
};
