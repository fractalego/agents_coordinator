$(function () {
    $('#chat').draggable({
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
                jQuery('#chat').connections('update');
            },
            stop: function (event, ui) {
                $(".container").removeClass("ui-selected");
            }
        });
        $('#chat').resizable({
            resize: function () {
                jQuery('#chat').connections('update');
            }
        });


    $('#chat').on('click', function (event) {
        var random_index = Math.floor(Math.random() * 1000000);
        var connection_name = `chat-connection-${random_index}`;
        if (cntrlIsPressed && current_selection != null) {
            $(current_selection).connections({
                to: '#chat',
                'class': `my-connection ${connection_name}`
            });
            connection_list_name_from_and_to.push([`${connection_name}`, current_selection, '#chat']);
            $(`.${connection_name}`).attr('tabindex', '-1');
            $(`.${connection_name}`).on('keydown', function (event) {
                $(`.${connection_name}`).connections('remove');
                remove_connection_from_list(`${connection_name}`);
            });
        }
        current_selection = null;

    });
});