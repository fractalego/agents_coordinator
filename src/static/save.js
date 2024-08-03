$(document).ready(function() {
    $('#save-button').click(function() {
    var pageContent = $('html').clone(); // Clone the HTML content

    pageContent.find('textarea').each(function() {
        $(this).text($(this).val()); // Update textareas with their current values
    });
    var blob = new Blob([pageContent.html()], { type: 'text/html' });

    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'savedPage.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    });
});