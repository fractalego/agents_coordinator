var current_selection = null;
var cntrlIsPressed = false;
var connection_list_name_from_and_to = [];

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
    let isMiddleButtonPressed = false;
    let startX, startY;

    $(document).mousedown(function (e) {
        if (e.which === 2) {
            isMiddleButtonPressed = true;
            startX = e.pageX;
            startY = e.pageY;
            e.preventDefault();
        }
    });

    $(document).mousemove(function (e) {
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
