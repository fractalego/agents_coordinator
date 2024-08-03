$(function () {
    $("#navigation").draggable({
        drag: function () {
            jQuery('#navigation').connections('update');
        }
    });

    $("#navigation #delete-button").on('click', function (event) {
        delete_mode = True;

    });
});