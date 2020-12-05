/* eslint-disable @typescript-eslint/no-unused-vars */
if (document.location.protocol !== 'https:')
	document.location.replace(`https://${document.location.href.toString().split('http://').join('')}`);
if ((document.cookie || '').match(/authId/)) document.location.replace('https://www.sitetest1.mfdlabs.com');
interface resmodel1 {
	errors: { code: number; message: string }[];
	userfacingmessage: string;
}
const c = (username: string, password: string): void => {
	$.ajax({
		url: 'https://api.sitetest1.mfdlabs.com/auth/v2/login',
		data: JSON.stringify({
			username: username,
			password: password,
		}),
		contentType: 'application/json',
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
