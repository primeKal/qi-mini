import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true  });

export async function getSummary(data: any) {
  const prompt = `You are a data analyst assistant. Given the following ${data.type} data, generate a summary conclusion:\n\n${JSON.stringify(data)}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 250,
    });

    return response.choices[0]?.message?.content || "No summary available.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error generating summary.";
  }
}

