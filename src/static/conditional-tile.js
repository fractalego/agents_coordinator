function create_project_tile(container_name, x, y) {
    const width = 500;
    const height = 250;
    return `
<div class="container conditional" id="${container_name}" tabindex="-1" style="width: ${width}px; height: ${height}px;
            top: ${y}px; left: ${x}px; position: absolute; padding-bottom: 10px; border-top-width: 10px;">
    <textarea id="condition" rows="1" placeholder="Condition" name="title-${container_name}" style="border: 1px solid darkgray;"></textarea>
    <div class="container-separator" style="width: 100%; height: 10px;"></div>
    <textarea id="prompt" placeholder="Prompt" style="height: 70%; margin-bottom: 10px; resize: none; border: 1px solid darkgray;" name="description-${container_name}"></textarea>
    </div>
`
}


$(function () {
    $("#navigation #new-project-tile-button").on('click', function (event) {
        create_new_tile(event, position="center", html_tile_creator=create_project_tile, type="conditional");
    });
    $(document).on('keypress',function(event) {
        var tag = event.target.tagName.toLowerCase();
        if(event.which == "c".charCodeAt(0) && tag != 'input' && tag != 'textarea') {
            create_new_tile(event, position="mouse", html_tile_creator=create_project_tile, type="conditional");
        }
    });
});
