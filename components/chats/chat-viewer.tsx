import { ChatMessage } from "@/components/home/chat-message";
import type { ChatEntry } from "@/lib/data/chats";
import { Lock } from "lucide-react";

interface ChatViewerProps {
  messages: ChatEntry[];
}

/**
 * Read-only chat viewer — renders a hardcoded conversation
 * using the same ChatMessage component as the live AI chat.
 * Server Component: no client-side JS shipped.
 */
export function ChatViewer({ messages }: ChatViewerProps) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Scrollable messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={`${message.role}-${index}`}
              role={message.role}
              content={message.content}
            />
          ))}
        </div>
      </div>

      {/* Read-only indicator — replaces the input bar */}
      <div className="bg-background px-4 pb-6 pt-2">
        <div className="mx-auto flex w-full max-w-3xl">
          <div className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
            <Lock className="size-3.5" />
            <span>This conversation is read-only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
