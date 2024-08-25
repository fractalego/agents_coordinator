var initial_messages =  [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Please follow the instructions below."
        }
    ]

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
        if (cntrlIsPressed && current_selection != null) {
            current_selection = null;
        }
        current_selection = '#start';
    });
    $('#play-button').on('click', async function (event) {
        let start_messages = structuredClone(initial_messages);
        await iterate_over_edges("#start", start_messages);
    });
});