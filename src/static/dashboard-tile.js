function create_dashboard_tile(container_name, x, y) {
    const width = 500;
    const height = 300;
    let script_tag = "script";
    return `
<div class="container executor flex-col" id="${container_name}" tabindex="-1" style="width: ${width}px; height: ${height}px; 
            top: ${y}px; left: ${x}px; position: absolute; border-top-width: 10px; padding-bottom: 20px;">
    <textarea id="instruction" rows="1" placeholder="Instruction" name="title-${container_name}" style="border: 1px solid darkgray;"></textarea>
    <div class="flex display">
        <div id="pin" class="container-separator mb-2 mr-2 unselected top-0" style="height: 16px; width: 16px;">${pin}</div>
        <div class="container-separator mb-2" style="width: 100%; height: 16px;" id="spinner"></div>
    </div>                  
    <div class="flex">                
        <button class="tab-btn w-full py-2 px-4 text-center bg-white font-semibold rounded-t-md focus:outline-none hover:bg-blue-50 border-l border-r first:border-l-0 active border-b-0" data-tab="tab1-${container_name}" data-other="tab2-${container_name}">
            Results
        </button>
        <button class="tab-btn w-full py-2 px-4 text-center bg-white font-semibold rounded-t-md focus:outline-none hover:bg-blue-50 border-l border-r first:border-l-0 active border-b-0" data-tab="tab2-${container_name}" data-other="tab1-${container_name}">
            Code
        </button>
    </div>
    <div style="height: calc(100% - 100px);">
        <div id="tab1-${container_name}" class="tab-content">
            <div id="result" class="h-full overflow-auto" placeholder="Result" style="margin-bottom: 10px; resize: none; border: 1px solid darkgray;" name="description-${container_name}" readonly></div>       
        </div>
        <div id="tab2-${container_name}" class="tab-content hidden">
            <textarea id="code" class="h-full" placeholder="Code" style="margin-bottom: 10px; resize: none; border: 1px solid darkgray;" name="description-${container_name}"></textarea>
        </div>
    </div>
  
</div>
<${script_tag}>
    $(document).ready(function () {
        // On tab button click
        $('.tab-btn').click(function () {
            // Remove 'bg-white', 'text-blue-500', 'border-b-0' from all tab buttons and add 'bg-gray-200', 'text-gray-700'
            $('.tab-btn').removeClass('bg-white text-blue-500 border-b-0').addClass('text-gray-700');

            // Add 'bg-white', 'text-blue-500', 'border-b-0' to the clicked tab button and remove 'bg-gray-200', 'text-gray-700'
            $(this).addClass('bg-white text-blue-500 border-b-0').removeClass('text-gray-700');

            // Hide all tab content
            $('#' + $(this).data('other')).addClass('hidden');

            // Show content of the clicked tab
            $('#' + $(this).data('tab')).removeClass('hidden');
        });
    });
</${script_tag}>
      `
}


$(function () {
    $("#navigation #new-dashboard-button").on('click', function (event) {
        create_new_tile(event, position = "center", html_tile_creator = create_dashboard_tile, type = "dashboard");
    });
    $(document).on('keypress', function (event) {
        var tag = event.target.tagName.toLowerCase();
        if (event.which == "d".charCodeAt(0) && tag != 'input' && tag != 'textarea') {
            create_new_tile(event, position = "mouse", html_tile_creator = create_dashboard_tile, type = "executor");
        }
    });
});
