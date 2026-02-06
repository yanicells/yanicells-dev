import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/lib/data/system-prompt";

export const runtime = "edge";

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("GEMINI_API_KEY is not configured", { status: 500 });
  }

  const { messages } = (await req.json()) as { messages: ChatMessage[] };

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const chat = model.startChat({
    history: messages.slice(0, -1),
  });

  const lastMessage = messages[messages.length - 1];

  let result;
  try {
    result = await chat.sendMessageStream(lastMessage.parts[0].text);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (
      message.includes("429") ||
      message.toLowerCase().includes("quota") ||
      message.toLowerCase().includes("rate")
    ) {
      return new Response(
        JSON.stringify({
          error: "rate_limit",
          message:
            "The AI has reached its usage limit. Please try again in a minute.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }
    return new Response(
      JSON.stringify({
        error: "api_error",
        message: message || "Something went wrong with the AI.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Stream error";
        controller.enqueue(encoder.encode(`\n\n[Error: ${errorMessage}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
