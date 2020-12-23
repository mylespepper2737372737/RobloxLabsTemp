/*
	FileName: loginpage.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Used for https://www.sitetest1.mfdlabs.com/Login

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

if (document.location.protocol !== 'https:')
	document.location.replace(`https://${document.location.href.toString().split('http://').join('')}`);
if ((document.cookie || '').match(/authId/)) document.location.replace('https://www.sitetest1.mfdlabs.com');
interface resmodel1 {
	errors: { code: number; message: string }[];
	userfacingmessage: string;
}
const c = (username: string, password: string): void => {
	$.ajax({
		url: 'https://www.sitetest1.mfdlabs.com/Authorization/Login.fxhx',
		data: `cvalue=${username}&password=${password}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		xhrFields: {
			withCredentials: true,
		},
	})
		.then(() => {
			$('#underscare').css('color', 'green').text('Success!');
			setTimeout(() => {
				document.location.replace('https://www.sitetest1.mfdlabs.com');
			}, 500);
		})
		.catch((response) => {
			console.log(response);
			$('#underscare')
				.css('color', 'red')
				.text(
					(response as JQuery.jqXHR).responseJSON
						? (response as JQuery.jqXHR).responseJSON['userfacingmessage']
						: 'Something went wrong.',
				);
		});
};
