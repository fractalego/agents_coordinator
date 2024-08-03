$(document).ready(function() {
    $('#save-button').click(function() {
        // Select the content to be serialized
        var content = $('html').prop('outerHTML');

        // Create a Blob from the content
        var blob = new Blob([content], { type: 'text/html' });

        // Create an anchor element and trigger the download
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'webpage.html';
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(link.href);
    });
});