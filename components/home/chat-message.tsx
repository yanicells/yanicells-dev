"use client";

import { memo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessageProps {
  role: "user" | "model";
  content: string;
}

/**
 * Memoized chat message bubble.
 * User messages are right-aligned; model messages are left-aligned with an icon.
 */
const ChatMessage = memo(function ChatMessage({
  role,
  content,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Model avatar */}
      {!isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Sparkles className="size-4" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[70%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-2 last:mb-0">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-2 ml-4 list-disc last:mb-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-2 ml-4 list-decimal last:mb-0">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                return isInline ? (
                  <code
                    className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code
                    className={cn(
                      "block overflow-x-auto rounded-lg bg-secondary p-3 font-mono text-xs",
                      className
                    )}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="mb-2 last:mb-0">{children}</pre>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </Markdown>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          <User className="size-4" />
        </div>
      )}
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

/** Skeleton shown while the model is generating its first token. */
function ChatMessageSkeleton() {
  return (
    <div className="flex w-full gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
        <Sparkles className="size-4" />
      </div>
      <div className="flex max-w-[70%] flex-col gap-2 rounded-2xl bg-muted px-4 py-3">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export { ChatMessage, ChatMessageSkeleton };
export type { ChatMessageProps };
