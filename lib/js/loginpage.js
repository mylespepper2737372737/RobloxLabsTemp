if (document.location.protocol !== 'https:')
    document.location.replace(`https://${document.location.href.toString().split('http://').join('')}`);
if ((document.cookie || '').match(/authId/))
    document.location.replace('https://www.sitetest1.mfdlabs.com');
const c = (username, password) => {
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
            .text(response.responseJSON ? response.responseJSON['userfacingmessage'] : 'Something went wrong.');
    });
};
