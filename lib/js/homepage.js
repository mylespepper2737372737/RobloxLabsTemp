if (document.location.protocol !== 'https:')
    document.location.replace('https://' + document.location.href.toString().split('http://').join(''));
const d = () => {
    $.ajax({
        dataType: 'json',
        url: 'https://www.sitetest1.mfdlabs.com/Authorization/Logout.fxhx',
        method: 'POST',
        xhrFields: { withCredentials: true },
        success: () => {
            $('.body').css('color', 'green').text('Success!');
            setTimeout(() => {
                document.location.replace('https://www.sitetest1.mfdlabs.com');
            }, 500);
        },
    }).fail((response) => $('.body')
        .css('color', 'red')
        .text(response.responseJSON ? response.responseJSON['userfacingmessage'] : 'Something went wrong.'));
};
const x = () => {
    $.ajax({
        url: 'https://www.sitetest1.mfdlabs.com/Authorization/ClearAllSessionsAndReauthenticate.fxhx',
        method: 'POST',
        xhrFields: { withCredentials: true },
        success: () => {
            $('.body').css('color', 'green').text('Success!');
            setTimeout(() => {
                $('.body').text('');
            }, 1000);
        },
    });
};
