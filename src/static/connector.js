


const url = "https://api.openai.com/v1/chat/completions";

initial_data = {
    "model": "gpt-4o-mini",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
    ]
}

const options = {
    headers: {
        'dataType': 'json',
        'content-type': 'application/json',
    },
    method: 'POST',
    redirect: 'follow',
};



//
//
// fetch(url, options)
//   .then( res => res.json() )
//   .then( data => console.log(data) );
