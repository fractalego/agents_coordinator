$(function () {
    $("#start").draggable({
        drag: function () {
            jQuery('#start').connections('update');
        }
    });

    $("#start").on('click', function (event) {
        current_selection = '#start';
    });

    $('#start').on('click', function (event) {
        if (cntrlIsPressed && current_selection != null) {
            current_selection = null;
        }
        current_selection = '#start';
    });
    $('#play-button').on('click', function (event) {
        options['body'] = JSON.stringify(initial_data);
        key = $('#key').val();
        options['headers']['Authorization'] = `Bearer ${key}`;
        fetch(url, options)
            .then( res => res.json() )
            .then( data => console.log(data) );
    });
});