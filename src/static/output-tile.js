function create_output_tile(container_name, x, y) {
    return `
<div class="container output" tabindex="-1"
     id="${container_name}"
     style="width: 350px; height: 300px; border-top-width: 10px; top: ${y}px; left: ${x}px; position: absolute; padding-bottom: 10px"
>
<textarea id="output" placeholder="Output" style="height: 90%; margin-bottom: 10px; resize: none; border: 1px solid darkgray;" readonly></textarea>
</div>
`
}


$(function () {
    $("#navigation #new-output-button").on('click', function (event) {
        create_new_tile(event, position="center", html_tile_creator=create_output_tile, type="chat");
    });
    $(document).on('keypress',function(event) {
        var tag = event.target.tagName.toLowerCase();
        if(event.which == "o".charCodeAt(0) && tag != 'input' && tag != 'textarea') {
            create_new_tile(event, position="mouse", html_tile_creator=create_output_tile, type="chat");
        }
    });
});
