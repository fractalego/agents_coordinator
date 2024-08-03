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
        var new_container_name = 'container' + Math.floor(Math.random() * 1000000);
        console.log(new_container_name);
        const screenCenterX = window.innerWidth / 2 + Math.random() * 10;
        const screenCenterY = window.innerHeight / 2 + Math.random() * 10;
        jQuery('body').append(
            create_project_tile(new_container_name, screenCenterX, screenCenterY)
        )
        var connection_name = `connection-${new_container_name}`;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = `
        $(function () {
            $('#${new_container_name}').draggable({
                drag: function () {
                    jQuery('#${new_container_name}').connections('update');
                }
            });
            $('#${new_container_name}').resizable({
                resize: function () {
                    jQuery('#${new_container_name}').connections('update');
                }
            });
            $('#${new_container_name}').on('keydown', function (event) {
                console.log('#${new_container_name}')
                if (event.keyCode == 46) {
                    if (document.activeElement.tagName.toLowerCase() != "textarea") {
                        $('#${new_container_name}').connections('remove');
                        this.remove();
                    }
                }
            });
    
            $('#${new_container_name}').on('click', function (event) {
                console.log('#${new_container_name}');
                if (cntrlIsPressed && current_selection != null) {                
                    $(current_selection).connections({
                        to: '#${new_container_name}',
                        'class': 'my-connection ${connection_name}'
                    });
                    connection_list_name_from_and_to.push(['${connection_name}', current_selection, '#${new_container_name}']);
                    $('.${connection_name}').attr('tabindex', '-1');
                    $('.${connection_name}').on('keydown', function (event) {
                        console.log('#${connection_name}');
                        $('#${new_container_name}').connections('remove');
                    });
                    current_selection = null;
                }
                current_selection = '#${new_container_name}';
    
            });
        });
        `;
        document.head.appendChild(script);
    });
});
