$(function () {
    $("#start").draggable({
        drag: function () {
            jQuery('#start').connections('update');
        }
    });

    $("#start").on('click', function (event) {
        current_selection = '#start';
    });

    $('#start').on('click', function (event) {
        console.log('#${new_container_name}');
        if (cntrlIsPressed && current_selection != null) {
            // $(current_selection).connections({
            //     to: '#start',
            //     'class': 'my-connection ${connection_name}'
            // });
            // connection_list_name_from_and_to.push(['${connection_name}', current_selection, '#start']);
            // $('.${connection_name}').attr('tabindex', '-1');
            // $('.${connection_name}').on('keydown', function (event) {
            //     console.log('#${connection_name}');
            //     $('#${new_container_name}').connections('remove');
            // });
            current_selection = null;
        }
        current_selection = '#start';
    });
});