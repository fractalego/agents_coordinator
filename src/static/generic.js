var current_selection = null;
var cntrlIsPressed = false;
var connection_list_name_from_and_to = [];
var mousex = 0, mousey = 0;

$(function() {
    // Make the entire body selectable
    $("body").selectable({
        filter: ".container",
    });
});

$(document).keydown(function (event) {
    if (event.which == "17")
        cntrlIsPressed = true;
});

$(document).keydown(function (event) {
    if (event.which == "47")
        $(selected_connection).connections('remove');
});



$(document).keyup(function () {
    cntrlIsPressed = false;
});

$(document).ready(function () {
    var isMiddleButtonPressed = false;
    var startX, startY;

    $(document).mousedown(function (e) {
        if (e.which === 2) {
            isMiddleButtonPressed = true;
            startX = e.pageX;
            startY = e.pageY;
            e.preventDefault();
        }
    });

    $(document).mousemove(function (e) {
        mousex = e.pageX;
        mousey = e.pageY;

        if (isMiddleButtonPressed) {
            let deltaX = startX - e.pageX;
            let deltaY = startY - e.pageY;

            window.scrollBy(deltaX, deltaY);

            startX = e.pageX;
            startY = e.pageY;
        }
    });

    $(document).mouseup(function (e) {
        if (e.which === 2) {
            isMiddleButtonPressed = false;
        }
    });
});
