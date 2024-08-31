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
                let new_messages = structuredClone(messages);
                new_messages.push({
                    "role": "user",
                    "content": $(`${connection_to} #prompt`).val()
                });
                iterate_over_edges(connection_to, new_messages);
            }
            if (connection_name.indexOf("chat") == 0) {
                let new_messages = structuredClone(messages);
                new_messages.push({
                    "role": "user",
                    "content": $(`${connection_to} #output`).val()
                });
                iterate_over_edges(connection_to, new_messages);
            }
            if (connection_name.indexOf("conditional") == 0) {
                let new_messages = structuredClone(messages);
                let condition = $(`${connection_to} #condition`).val()
                let prompt = $(`${connection_to} #prompt`).val()
                prediction = await connect_to_api(new_messages);
                let entailment_messages = create_entailment_messages(prediction, condition)
                prediction = await connect_to_api(entailment_messages);
                if (prediction[0] == "Y") {
                    new_messages.push({
                        "role": "user",
                        "content": prompt,
                    });
                    iterate_over_edges(connection_to, new_messages);
                }
            }
            if (connection_name.indexOf("executor") == 0) {
                let new_messages = structuredClone(messages);
                let instruction = $(`${connection_to} #instruction`).val();
                let prompt = get_executor_prompt(instruction);
                new_messages.push({
                    "role": "user",
                    "content": prompt,
                });
                prediction = await connect_to_api(new_messages);
                let result = "";
                let code = prediction.match(/<execute>([\s\S]*?)<\/execute>/)[1];

                // execute the code and catch any errors
                try {
                    eval(code);
                } catch (error) {
                    result = error.toString();
                }
                $(`${connection_to} #result`).text(result);
                // substitute the result into new_messages last element
                new_messages[new_messages.length - 1].content = `The assistant knows:\n ${result}`;
                iterate_over_edges(connection_to, new_messages);
            }
        }
    }
}
