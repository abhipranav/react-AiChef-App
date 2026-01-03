import Anthropic from "@anthropic-ai/sdk"
import { InferenceClient } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`


// const anthropic = new Anthropic({
//     // Make sure you set an environment variable in Scrimba 
//     // for ANTHROPIC_API_KEY
//     apiKey: process.env.ANTHROPIC_API_KEY,
//     dangerouslyAllowBrowser: true,
// })

// export async function getRecipeFromChefClaude(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")

//     const msg = await anthropic.messages.create({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1024,
//         system: SYSTEM_PROMPT,
//         messages: [
//             { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//         ],
//     });
//     return msg.content[0].text
// }

// Dev-only: use Vite proxy at /hf to avoid CORS and keep token in process.env
export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const res = await fetch(`/hf/v1/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "openai/gpt-oss-20b",
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
                ],
                max_tokens: 1024
            })
        })
        if (!res.ok) {
            const text = await res.text().catch(() => '')
            throw new Error(`HF proxy error ${res.status}: ${text}`)
        }
        const data = await res.json()
        return data.choices?.[0]?.message?.content ?? ''
    } catch (err) {
        console.error(err.message)
    }
}

// const chatCompletion = await client.chatCompletion({
//     model: "openai/gpt-oss-20b",
//     messages: [
//         {
//             role: "user",
//             content: "What is the capital of France?",
//         },
//     ],
// });

// console.log(chatCompletion.choices[0].message);