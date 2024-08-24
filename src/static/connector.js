const url = "https://api.openai.com/v1/chat/completions";


var initial_data = {
    "model": "gpt-4o-mini",
    "messages": []
}

var options = {
    headers: {
        'dataType': 'json',
        'content-type': 'application/json',
    },
    method: 'POST',
    redirect: 'follow',
};


async function connect_to_api(messages) {
    key = $('#key').val();
    var payload = initial_data;
    payload.messages = messages;
    options['body'] = JSON.stringify(payload);
    options['headers']['Authorization'] = `Bearer ${key}`;
    const response = await fetch(url, options);
    const data = await response.json();
    if (data["choices"]) {
        return data["choices"][0]["message"]["content"];
    }
    alert(data["error"]["message"]);
    return "";
}

async function iterate_over_connections(start_at_id, messages) {
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
