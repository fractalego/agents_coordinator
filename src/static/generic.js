var current_selection = null;
var cntrlIsPressed = false;
var connection_list_name_from_and_to = [];
var mousex = 0, mousey = 0;
var prior_pages;


$(function() {
    // Make the entire body selectable
    $("body").selectable({
        filter: ".container",
    });
});

$(document).keydown(function (event) {
    if (event.which == "17")
        cntrlIsPressed = true;
});


$(document).keyup(function () {
    cntrlIsPressed = false;
});

function loadPageHistory() {
    prior_pages = JSON.parse(storedHistory);
}

function savePageState() {
    // if prior_pages is undefined, initialize it
    if (typeof prior_pages === 'undefined') {
        prior_pages = [];
    }
    const currentPageContent = get_working_html_page();
    prior_pages.push(currentPageContent);
}


$(document).keydown(function (event) {
    if (event.which == "90" && cntrlIsPressed) {
        if (prior_pages.length > 0) {
            var last_page = prior_pages.pop();
            $("html").replaceWith(last_page);
            executeScripts(prior_pages);
        }
    }
});


function executeScripts(prior_pages) {
    $('script').each(function() {
        var oldScript = $(this);
        if (oldScript.attr('src')) {
            var newScript = document.createElement('script');
            newScript.src = oldScript.attr('src');
            newScript.async = false; // This is required for synchronous execution
            document.head.appendChild(newScript);
        } else {
            var scriptContent = oldScript.html();
            document.head.appendChild(document.createElement('script')).innerHTML = scriptContent; // Reload internal script
        }
    });
    document.head.appendChild(document.createElement('script')).innerHTML = `
        var prior_pages = ${JSON.stringify(prior_pages)};
    `;
}

$(document).ready(function () {
    var isMiddleButtonPressed = false;
    var startX, startY;

    $(document).mousedown(function (e) {
        if (e.which === 2) {
            isMiddleButtonPressed = true;
            startX = e.pageX;
            startY = e.pageY;
            e.preventDefault();
        }
    });

    $(document).mousemove(function (e) {
        mousex = e.pageX;
        mousey = e.pageY;

        if (isMiddleButtonPressed) {
            let deltaX = startX - e.pageX;
            let deltaY = startY - e.pageY;

            window.scrollBy(deltaX, deltaY);

            startX = e.pageX;
            startY = e.pageY;
        }
    });

    $(document).mouseup(function (e) {
        if (e.which === 2) {
            isMiddleButtonPressed = false;
        }
    });
});


