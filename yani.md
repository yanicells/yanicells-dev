backlog
- projects, in the carousel add like a title and short desc, maybe title top left, then desc is bot left. then there is a bit of tint for the picture
- update project description for like project/slug


study:
1. The API route — route.ts
This is an Edge Runtime (export const runtime = "edge") POST endpoint. When a message is sent:
    - It reads GEMINI_API_KEY from process.env (server-side only, never exposed to the browser)
    - It receives { messages } from the request body — an array of { role: "user" | "model", parts: [{ text }] } objects, which is the exact format Gemini expects
    - It creates a GoogleGenerativeAI client, gets the gemini-2.5-flash model, and passes your SYSTEM_PROMPT as the systemInstruction (this tells the AI its persona/rules)
    - It calls model.startChat({ history }) with all previous messages except the last one — this gives Gemini the full conversation context
    - The last message is sent via chat.sendMessageStream() which returns an async iterable of text chunks
    - Those chunks are piped into a ReadableStream and returned as a streaming text/plain response — so tokens arrive in real-time rather than waiting for the full response

2. The frontend call — chat-interface.tsx
In sendMessage():
    - It builds the history array from all current messages (including the new user message), mapping each to { role, parts: [{ text }] }
    - It fetch("/api/chat", { method: "POST", body: JSON.stringify({ messages: history }) }) — sending the full conversation to the API
    - It creates an AbortController so the user can cancel mid-stream via the stop button
    - Once the response arrives, it gets a ReadableStream reader and reads chunks in a while(true) loop, decoding each Uint8Array chunk to text and appending it to the assistant message via setMessages with a functional updater (so each chunk just adds to the existing content)
    - This is what creates the "typing" effect — each streamed token updates the React state, which re-renders only the active ChatMessage (the others are memo'd)

3. System prompt — system-prompt.ts
    - A plain TypeScript file exporting a SYSTEM_PROMPT string. This is imported by the API route and sent to Gemini as systemInstruction. You can edit this anytime to change the bot's personality, what it knows, how it responds, etc. It never reaches the client bundle since it's only imported in a server-side route.