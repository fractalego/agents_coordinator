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
                has_pin = $(`${connection_to} #pin`).hasClass("selected");
                if (has_pin) {
                    continue;
                }
                if (!already_predicted) {
                    $(`${connection_to} #spinner`).html(spinner);
                    prediction = await connect_to_api(messages);
                    already_predicted = true;
                }
                $(`${connection_to} #output`).val(prediction);
                $(`${connection_to} #spinner`).html("");
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
                current_prompt = $(`${connection_to} #prompt`).val();
                prior_prompts = collect_prior_prompts(connection_to);
                if (prior_prompts.length > 0)
                    current_prompt = current_prompt + "\n\n<additional_information>" + prior_prompts.join("\n") + "</additional_information>";
                new_messages.push({
                    "role": "user",
                    "content": current_prompt,
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
                $(`${connection_to} #spinner`).html(spinner);
                prediction = await connect_to_api(new_messages);
                let entailment_messages = create_entailment_messages(prediction, condition)
                prediction = await connect_to_api(entailment_messages);
                $(`${connection_to} #spinner`).html("");
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
                has_pin = $(`${connection_to} #pin`).hasClass("selected");
                let code = $(`${connection_to} #code`).text();
                if (!has_pin) {
                    $(`${connection_to} #spinner`).html(spinner);
                    prediction = await connect_to_api(new_messages);
                    let result = "";
                    let code = prediction.match(/<execute>([\s\S]*?)<\/execute>/)[1];
                }
                $(`${connection_to} #code`).text(code);
                try {
                    eval(code);
                } catch (error) {
                    result = error.toString();
                }
                $(`${connection_to} #result`).text(result);
                new_messages[new_messages.length - 1].content = `The assistant knows:\n ${result}`;
                $(`${connection_to} #spinner`).html("");
                iterate_over_edges(connection_to, new_messages);
            }
        }
    }
}

function collect_prior_prompts(start_at_id) {
    let prompts = [];
    for (const connection of connection_list_name_from_and_to) {
        const [connection_name, connection_from, connection_to] = connection;
        if (connection_from == connection_to) {
            continue;
        }
        if (connection_to == start_at_id) {
            if (connection_name.indexOf("prompt") == 0) {
                prompts.push($(`${connection_from} #prompt`).val());
            }
        }
    }
    return prompts;
}