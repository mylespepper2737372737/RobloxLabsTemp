(() => {
	for (let i = 7; i < 500; i++) {
		fetch('https://github.com/mfd-engine-team/robloxlabs.com/issue_comments', {
			headers: {
				accept: 'application/json',
				'accept-language': 'ru,en;q=0.9,en-US;q=0.8',
				'cache-control': 'no-cache',
				'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryoag6TuHmQROHC3WV',
				pragma: 'no-cache',
				'roblox-proxied-ip': '128.116.123.3',
				'roblox-proxied-locale': 'en-us',
				'roblox-security-token': 'ljWby+/HVsZXJLfRkoljWby+/HVsZXJLfRko9mPQ9mPQ==',
				'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				'sec-ch-ua-mobile': '?0',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'x-requested-with': 'XMLHttpRequest',
				'x-timeline-last-modified': 'Mon, 15 Mar 2021 00:23:04 GMT',
			},
			referrer: `https://github.com/mfd-engine-team/robloxlabs.com/issues/${i}`,
			referrerPolicy: 'no-referrer-when-downgrade',
			body:
				'------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="comment_and_close"\r\n\r\n1\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="authenticity_token"\r\n\r\ncG3Jmu9n9yApuEFgyaEjbvuibSwqeKJEiIHSbtgFTL1Lu9HoKuf7NmHYGqr0O9L+YuoISa55Bt/8Hmj1uBWF2Q==\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="required_field_c6b7"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="timestamp"\r\n\r\n1615768081048\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="timestamp_secret"\r\n\r\n4555f3dc895248fb3d7fd5cb87e41a7af6abc73efb6e00133f94b92600acfda3\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="issue"\r\n\r\n67\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="saved_reply_id"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="comment[body]"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="path"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="line"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="start_line"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="preview_side"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="preview_start_side"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="start_commit_oid"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="end_commit_oid"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="base_commit_oid"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV\r\nContent-Disposition: form-data; name="comment_id"\r\n\r\n\r\n------WebKitFormBoundaryoag6TuHmQROHC3WV--\r\n',
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
		});
	}
})();
