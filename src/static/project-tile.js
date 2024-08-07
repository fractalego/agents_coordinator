function create_project_tile(container_name, x, y) {
    const width = 500;
    const height = 250;
    return `<div class="container" id="${container_name}" tabindex="-1" style="width: ${width}px; height: ${height}px;\n` +
            `                           top: ${y}px; left: ${x}px; position: absolute; padding-bottom: 10px">\n` +
            `<textarea rows="1" placeholder="Title" name="title-${container_name}">\n` +
            `</textarea>\n` +
            `<div class="container-separator" style="width: 100%; height: 10px;"></div>\n` +
            `<textarea placeholder="Description" style="height: 70%; margin-bottom: 10px; resize: none;" name="description-${container_name}">\n` +
            `</textarea>\n` +
            `</div>`
}


$(function () {
    $("#navigation #new-project-tile-button").on('click', function (event) {
        create_new_tile(event, position="center", html_tile_creator=create_project_tile);
    });
    $(document).on('keypress',function(event) {
        var tag = event.target.tagName.toLowerCase();
        if(event.which == "112" && tag != 'input' && tag != 'textarea') {
            create_new_tile(event, position="mouse", html_tile_creator=create_project_tile);
        }
    });
});
