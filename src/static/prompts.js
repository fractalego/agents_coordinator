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