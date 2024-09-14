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
        var latestConnections = $('<script>')
        .attr('type', 'text/javascript')
        .text(`
            connection_list_name_from_and_to = ${JSON.stringify(connection_list_name_from_and_to)};
        `);
        pageContent.find('head').append(latestConnections);
    }
}


function get_working_html_page() {
    var pageContent = $('html').clone();
    refactor_connections(pageContent);
    pageContent.find('textarea').each(function() {
        $(this).text($(this).val());
    });
    pageContent.find('.my-connection').remove();
    return pageContent;
}

function get_body_clone_string() {
    var pageContent = $('body').clone();
    refactor_connections(pageContent);
    pageContent.find('textarea').each(function() {
        $(this).text($(this).val());
    });
    pageContent.find('.my-connection').remove();
    return pageContent.html();
}


$(document).ready(function() {
    $('#save-button').click(function() {
        var pageContent = get_working_html_page();
        var blob = new Blob([pageContent.html()], { type: 'text/html' });

        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'savedPage.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});