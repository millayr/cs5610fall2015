(function(){
    $(function () {
        $('[data-toggle="popover"]').popover({
            title: 'Account Options',
            content: '<div><a class="popover-link" href="#/profile">Profile</a></div>' +
            '<div><a class="popover-link" href="#/dashboard">Your Beer Dashbaord</a></div>' +
            '<div><a class="popover-link" href="#/logout">Logout</a></div>',
            placement: "bottom",
            html: true
        });
    });
}) ();
