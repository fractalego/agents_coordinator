$(function () {
    $("#navigation").draggable({
        drag: function () {
            jQuery('#navigation').connections('update');
        }
    });

});