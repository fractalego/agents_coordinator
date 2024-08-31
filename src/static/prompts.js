entailment_prompt = `Please say if the first text entails the second:
<first_text>
{lhs}
</first_text>
<second_text>
{rhs}
</second_text>
Answer only with one character: Y/N\n
`

entailment_messages = [
    {
        "role": "system",
        "content": "You are an assistant that can determine if one text entails another. The assistant will provide you with two texts, and you will have to determine if the first text entails the second. You can only answer with one character: Y/N."
    },
    {
        "role": "user",
        "content": entailment_prompt
    }
]

function create_entailment_messages(lhs, rhs) {
    let messages = structuredClone(entailment_messages);
    messages[1].content = entailment_prompt.replace("{lhs}", lhs).replace("{rhs}", rhs);
    return messages;
}

function get_executor_prompt(instruction) {
    return `
Create a javascript code that follows the instruction and returns a result into the variable 'result'. The variable result already exists and is empty. The instruction is:
${instruction}

The code should be able to run as it is typed. It should not be a function or a class. It should be a single block of code.
The code needs to be self-contained and not rely on external variables or functions.
It must be able to run in a browser environment, not a Node.js environment.
You must create just the code. Do not use Markdown.
The code must start with "result = '';". Do not re-declare the variable result.
The output of the code must be a string into the variable result.
Be careful with scoping: the variable result is already declared and the output must be accessible from the global scope.
The code cannot be asynchronous. Do not use async/await or Promises.
Wrap the code in <execute> tags.
`
}