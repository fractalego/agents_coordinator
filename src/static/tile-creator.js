function create_new_project_tile(event, position, html_tile_creator) {
    var new_container_name = 'container' + Math.floor(Math.random() * 1000000);
    console.log(new_container_name);
    var screenCenterX = window.innerWidth / 2 + Math.random() * 10;
    var screenCenterY = window.innerHeight / 2 + Math.random() * 10;
    if(position == 'mouse') {
        // Get the mouse position and set the new container to be there
        screenCenterX = mousex;
        screenCenterY = mousey;
        console.log(screenCenterX, screenCenterY);
    }

    jQuery('body').append(
        html_tile_creator(new_container_name, screenCenterX, screenCenterY)
    )
    var connection_name = `connection-${new_container_name}`;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = `
    $(function () {
        $('#${new_container_name}').draggable({
            start: function(event, ui) {
                // Only start dragging if the item is selected
                if (!$(this).hasClass('ui-selected')) {
                    $(".draggable").removeClass('ui-selected');
                    $(this).addClass('ui-selected');
                }

                // Save the initial position of each selected item
                var startPosition = ui.position;
                $(".ui-selected").each(function() {
                    var $this = $(this);
                    var itemPosition = $this.position();
                    $this.data("startPos", itemPosition);
                    $this.data("offset", {
                        top: itemPosition.top - startPosition.top,
                        left: itemPosition.left - startPosition.left
                    });
                });
            },                            
            drag: function (event, ui) {
                // Move each selected item according to the initial offset
                $(".ui-selected").not(this).each(function() {
                    var $this = $(this);
                    var offset = $this.data("offset");
                    $this.css({
                        top: ui.position.top + offset.top,
                        left: ui.position.left + offset.left
                    });
                });   
                jQuery('#${new_container_name}').connections('update');
            },
            stop: function (event, ui) {                   
                $(".container").removeClass("ui-selected");
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
}
