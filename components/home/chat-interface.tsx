"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { SendHorizontal, Plus, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage, ChatMessageSkeleton } from "@/components/home/chat-message";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
}

/**
 * Full chatbot interface — empty state centered prompt,
 * scrollable message list, and sticky bottom input.
 */
export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const hasMessages = messages.length > 0;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    },
    []
  );

  const resetTextarea = useCallback(() => {
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, []);

  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: content.trim(),
      };

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "model",
        content: "",
      };

      setMessages((prev) => [...prev, userMessage]);
      resetTextarea();
      setIsLoading(true);

      // Build Gemini-format history from all messages including the new user one
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to send message");
        }

        // Add empty assistant message, then stream into it
        setMessages((prev) => [...prev, assistantMessage]);

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessage.id
                  ? { ...m, content: m.content + chunk }
                  : m
              )
            );
          }
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          // User cancelled — keep partial response
          return;
        }
        const errorContent =
          error instanceof Error ? error.message : "Something went wrong";
        setMessages((prev) => {
          // If assistant message was already added, update it
          const hasAssistant = prev.some((m) => m.id === assistantMessage.id);
          if (hasAssistant) {
            return prev.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: `⚠️ ${errorContent}` }
                : m
            );
          }
          // Otherwise add the error as a new assistant message
          return [
            ...prev,
            { ...assistantMessage, content: `⚠️ ${errorContent}` },
          ];
        });
      } finally {
        abortControllerRef.current = null;
        setIsLoading(false);
      }
    },
    [isLoading, messages, resetTextarea]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [input, sendMessage]
  );

  const handleNewChat = useCallback(() => {
    stopGeneration();
    setMessages([]);
    resetTextarea();
  }, [stopGeneration, resetTextarea]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Messages area or empty state */}
      {hasMessages ? (
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
            {messages.map((message) =>
              message.role === "model" && message.content === "" ? (
                <ChatMessageSkeleton key={message.id} />
              ) : (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <h1 className="mb-8 text-2xl font-medium text-foreground/80 md:text-3xl">
            What&apos;s on your mind today?
          </h1>
        </div>
      )}

      {/* Input bar — sticky bottom */}
      <div className="border-t border-border/50 bg-background px-4 pb-4 pt-3">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-3xl items-end gap-2"
        >
          {hasMessages && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleNewChat}
              aria-label="New chat"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <Plus className="size-5" />
            </Button>
          )}

          <div className="relative flex min-h-[44px] flex-1 items-end rounded-2xl border border-border bg-muted/50 px-4 py-2.5 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/50">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
              rows={1}
              disabled={isLoading}
              className="max-h-[200px] w-full resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-50"
            />
          </div>

          {isLoading ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={stopGeneration}
              aria-label="Stop generating"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <Square className="size-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="default"
              size="icon"
              disabled={!input.trim()}
              aria-label="Send message"
              className="shrink-0"
            >
              <SendHorizontal className="size-4" />
            </Button>
          )}
        </form>
        <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
          Powered by Gemini 2.5 Flash · Responses may not always be accurate
        </p>
      </div>
    </div>
  );
}
