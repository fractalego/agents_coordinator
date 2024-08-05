function create_task_tile(container_name, x, y) {
    const width = 300;
    const height = 250;
    return `<div class="container" id="${container_name}" tabindex="-1" style="width: ${width}px; height: ${height}px;\n` +
            `                           top: ${y}px; left: ${x}px; position: absolute; padding-bottom: 10px">\n` +
            `<div class="container-separator" style="width: 100%; height: 10px;"></div>\n` +
            `<textarea placeholder="Description" style="height: 90%; margin-bottom: 10px; resize: none;">\n` +
            `</textarea>\n` +
            `</div>`
}


$(function () {
    $("#navigation #new-task-tile-button").on('click', function (event) {
        create_new_tile(event, position="center", html_tile_creator=create_task_tile);
    });
    $(document).on('keypress',function(event) {
        if(event.which == "116") {
            create_new_tile(event, position="mouse", html_tile_creator=create_task_tile);
        }
    });
});
