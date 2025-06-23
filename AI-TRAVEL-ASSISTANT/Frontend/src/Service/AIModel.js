import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.OPENROUTER_API_KEY
});

export async function runOpenRouterPrompt(FINAL_PROMPT) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: FINAL_PROMPT },
    ],
    model: "deepseek/deepseek-r1:free",
  });
  return completion.choices[0].message.content;
}