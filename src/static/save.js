function refactor_connections(pageContent) {
    for (var i = 0; i < connection_list_name_from_and_to.length; i++) {
        var connection_name = connection_list_name_from_and_to[i][0];
        var connection_from = connection_list_name_from_and_to[i][1];
        var connection_to = connection_list_name_from_and_to[i][2];

        var newScript = $('<script>')
        .attr('type', 'text/javascript')
        .text(`
            $(function () {
                $('${connection_from}').connections({
                    to: '${connection_to}',
                    'class': 'my-connection ${connection_name}'
                });
                $('.${connection_name}').attr('tabindex', '-1');
                $('.${connection_name}').on('keydown', function (event) {
                    $('${connection_to}').connections('remove');
                });
            });
        `);
        pageContent.find('head').append(newScript);
    }
}

$(document).ready(function() {
    $('#save-button').click(function() {
        var pageContent = $('html').clone(); // Clone the HTML content
        refactor_connections(pageContent);
        pageContent.find('textarea').each(function() {
            $(this).text($(this).val()); // Update textareas with their current values
        });
        pageContent.find('.my-connection').remove();
        var blob = new Blob([pageContent.html()], { type: 'text/html' });

        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'savedPage.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});