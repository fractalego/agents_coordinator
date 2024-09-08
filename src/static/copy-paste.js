$(function() {
    var mouseX, mouseY;
    $(document).mousemove(function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    $(document).keydown(function(event) {
        if (event.target.closest("input") != null || event.target.closest("textarea") != null) {
            return;
        }
        if (event.ctrlKey && event.key === 'c') {
            copiedElements = [];
            $(".ui-selected").each(function() {
                // Clone and store a tuple of selected elements with their original position relative to the cursor
                copiedElements.push([$(this).clone(), $(this).offset().left - mouseX, $(this).offset().top - mouseY]);
            });
            event.preventDefault(); // Prevent default copy behavior
        }

        // Handle Ctrl+V for pasting copied elements
        if (event.ctrlKey && event.key === 'v') {
            if (copiedElements.length > 0) {
                copiedElements.forEach(function(el_x_y) {
                    var [el, xpos, ypos] = el_x_y;
                    var newElement = el.clone().removeClass("ui-selected"); // Clone and remove ui-selected class
                    newElement.attr('id', newElement.attr('id') + '-copy');
                    let new_id = newElement.attr('id');
                    var connection_name = new_id.replace('container', 'connection');
                    newElement.css({
                        position: 'absolute',
                        // the top and left corner of the element will be at the cursor position
                        top: mouseY + ypos + newElement.outerHeight(),
                        left: mouseX + xpos + newElement.outerHeight()
                    });
                    newElement.draggable({
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
                            jQuery(`#${new_id}`).connections('update');
                            $(".ui-selected").each(function() {
                                var $this = $(this);
                                $this.connections('update');
                            });

                        },
                        stop: function (event, ui) {
                            $(`#${new_id}`).removeClass("ui-selected");
                        },
                    });
                    newElement.resizable({
                        resize: function () {
                            jQuery(`#${new_id}`).connections('update');
                        }
                    });
                    newElement.on('keydown', function (event) {
                        console.log(`#${new_id}`)
                        if (event.keyCode == 46) {
                            if (document.activeElement.tagName.toLowerCase() != "textarea") {
                                $(`#${new_id}`).connections('remove');
                                this.remove();
                            }
                        }
                    });

                    newElement.on('click', function (event) {
                        console.log(event.target.closest("#pin"));
                        if (event.target.closest("#pin") != null) {
                            let target = $(`#${new_id} #pin`);
                            if (target.hasClass("unselected")) {
                                target.removeClass("unselected");
                                target.addClass("selected");
                                $(`#${new_id} #pin svg`).toggleClass("bold-svg");
                            }
                            else {
                                $(`#${new_id} #pin svg`).toggleClass("bold-svg");
                                target.removeClass("selected");
                                target.addClass("unselected");
                            };
                        }
                        console.log(`#${new_id}`);
                        if (cntrlIsPressed && current_selection != null) {
                            $(current_selection).connections({
                                to: `#${new_id}`,
                                'class': `my-connection ${connection_name}`
                            });
                            connection_list_name_from_and_to.push([`${connection_name}`, current_selection, `#${new_id}`]);
                            $(`.${connection_name}`).attr('tabindex', '-1');
                            $(`.${connection_name}`).on('keydown', function (event) {
                                console.log(`#${connection_name}`);
                                $(`.${connection_name}`).connections('remove');
                                remove_connection_from_list(`${connection_name}`);
                            });
                            current_selection = null;
                        }
                        current_selection = `#${new_id}`;

                    });
                    newElement.appendTo("body");
                });
            }
            event.preventDefault(); // Prevent default paste behavior
            // unselect all elements
            $(".draggable").removeClass('ui-selected');
        }
    });
});
