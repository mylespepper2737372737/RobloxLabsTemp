if (document.location.protocol !== 'https:')
    document.location.replace('https://' + document.location.href.toString().split('http://').join(''));
const c = (username, password) => {
    $.ajax({
        url: 'https://www.sitetest1.mfdlabs.com/Authorization/Login.fxhx',
        data: 'cvalue=' + username + '&password=' + password,
        contentType: 'application/x-www-form-urlencoded',
        method: 'POST',
        xhrFields: {
            withCredentials: true,
        },
        success: () => {
            $('.body').css('color', 'green').text('Success!');
            setTimeout(() => {
                document.location.replace('https://www.sitetest1.mfdlabs.com');
            }, 500);
        },
    }).fail((response) => {
        console.log(response);
        $('.body')
            .css('color', 'red')
            .text(response.responseJSON ? response.responseJSON['userfacingmessage'] : 'Something went wrong.');
    });
};
