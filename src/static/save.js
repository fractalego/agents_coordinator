function refactor_connections(pageContent) {
    for (var i = 0; i < connection_list_name_from_and_to.length; i++) {
            var newScript = $('<script>')
            .attr('type', 'text/javascript')
            .text(`
            $(function () {
                $('${connection_list_name_from_and_to[i][1]}').connections({
                    to: '${connection_list_name_from_and_to[i][2]}',
                    'class': 'my-connection ${connection_list_name_from_and_to[i][0]}'
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