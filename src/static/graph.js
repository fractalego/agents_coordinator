function remove_connection_from_list(connection_name) {
    for (var i = 0; i < connection_list_name_from_and_to.length; i++) {
        if (connection_list_name_from_and_to[i][0] == connection_name) {
            connection_list_name_from_and_to.splice(i, 1);
            break;
        }
    }
}

async function iterate_over_edges(start_at_id, messages) {
    already_predicted = false;
    var prediction = "";
    for (const connection of connection_list_name_from_and_to) {
        const [connection_name, connection_from, connection_to] = connection;
        if (connection_from == connection_to) {
            continue;
        }
        if (connection_from == start_at_id) {
            if (connection_name.indexOf("chat") == 0) {
                if (!already_predicted) {
                    prediction = await connect_to_api(messages);
                    already_predicted = true;
                }
                $(`${connection_to} #output`).val(prediction)
            }
        }
    }
    for (const connection of connection_list_name_from_and_to) {
        const [connection_name, connection_from, connection_to] = connection;
        if (connection_from == connection_to) {
            continue;
        }
        if (connection_from == start_at_id) {
            if (connection_name.indexOf("prompt") == 0) {
                var new_messages = messages;
                new_messages.push({
                    "role": "user",
                    "content": $(`${connection_to} #prompt`).val()
                });
                iterate_over_connections(connection_to, new_messages);
            }
        }
    }
}
