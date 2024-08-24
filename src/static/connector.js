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
