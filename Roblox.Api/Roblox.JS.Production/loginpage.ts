/*
	FileName: loginpage.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Used for https://www.sitetest4.robloxlabs.com/Login

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

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
	document.location.replace('https://' + document.location.href.toString().split('https://').join(''));
const c = (username: string, password: string): void => {
	$.ajax({
		url: 'https://www.sitetest4.robloxlabs.com/Authentication/Login.ashx',
		data: 'cvalue=' + username + '&password=' + password,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		xhrFields: {
			withCredentials: true,
		},
		success: () => {
			$('.body').css('color', 'green').text('Success!');
			setTimeout(() => {
				document.location.replace('https://www.sitetest4.robloxlabs.com');
			}, 500);
		},
	}).fail((response: JQuery.jqXHR) => {
		$('.body')
			.css('color', 'red')
			.text(response.responseJSON ? response.responseJSON['userfacingmessage'] : 'Something went wrong.');
	});
};
