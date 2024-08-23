$(function () {
    $("#chat").draggable({
        drag: function () {
            jQuery('#start').connections('update');
        }
    });
});