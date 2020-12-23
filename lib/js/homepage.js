if (document.location.protocol !== 'https:')
    document.location.replace(`https://${document.location.href.toString().split('http://').join('')}`);
if (!(document.cookie || '').match(/authId/))
    document.location.replace('https://www.sitetest1.mfdlabs.com/Login');
const d = () => {
    $.ajax({
        dataType: 'json',
        url: 'https://www.sitetest1.mfdlabs.com/Authorization/Logout.fxhx',
        method: 'POST',
        xhrFields: { withCredentials: true },
    })
        .then((_body, _status, response) => {
        if (response.status === 200) {
            $('.body').css('color', 'green').text('Success!');
            setTimeout(() => {
                document.location.replace('https://www.sitetest1.mfdlabs.com');
            }, 500);
        }
    })
        .catch((response) => $('.body')
        .css('color', 'red')
        .text(response.responseJSON
        ? response.responseJSON['userfacingmessage']
        : 'Something went wrong.'));
};
