$(function () {
    $("#start").draggable({
        drag: function () {
            jQuery('#start').connections('update');
        }
    });

    $("#start").on('click', function (event) {
        current_selection = '#start';
    });
});