$(document).ready(function() {
    $('#save-button').click(function() {
    var pageContent = $('html').clone(); // Clone the HTML content

    // Ensure all dynamic values are included
    pageContent.find('textarea').each(function() {
        $(this).text($(this).val()); // Update textareas with their current values
    });



    // You may need to include dynamically created jQuery functions
    // This is often handled by ensuring the JavaScript code is included in the saved page

    // Create a Blob with the serialized content
    var blob = new Blob([pageContent.html()], { type: 'text/html' });

    // Create a download link and trigger the download
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'savedPage.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    });
});