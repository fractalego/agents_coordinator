function create_executor_tile(container_name, x, y) {
    const width = 500;
    const height = 250;
    return `<div class="container executor" id="${container_name}" tabindex="-1" style="width: ${width}px; height: ${height}px;\n` +
            `                           top: ${y}px; left: ${x}px; position: absolute; padding-bottom: 10px; border-top-width: 10px;">\n` +
            `<textarea id="instruction" rows="1" placeholder="Instruction" name="title-${container_name}" style="border: 1px solid darkgray;">\n` +
            `</textarea>\n` +
            `<div class="container-separator" style="width: 100%; height: 10px;"></div>\n` +
            `<textarea id="result" placeholder="Result" style="height: 80%; margin-bottom: 10px; resize: none; border: 1px solid darkgray;" name="description-${container_name}" readonly>\n` +
            `</textarea>\n` +
            `</div>`
}


$(function () {
    $("#navigation #new-executor-button").on('click', function (event) {
        create_new_tile(event, position="center", html_tile_creator=create_executor_tile, type="executor");
    });
    $(document).on('keypress',function(event) {
        var tag = event.target.tagName.toLowerCase();
        if(event.which == "e".charCodeAt(0) && tag != 'input' && tag != 'textarea') {
            create_new_tile(event, position="mouse", html_tile_creator=create_executor_tile, type="executor");
        }
    });
});
