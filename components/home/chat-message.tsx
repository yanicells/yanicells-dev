"use client";

import { memo } from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessageProps {
  role: "user" | "model";
  content: string;
}

/** Shared markdown component config — hoisted to avoid re-creation. */
const remarkPlugins = [remarkGfm];

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-3 last:mb-0">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-3 ml-4 list-disc last:mb-0">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-3 ml-4 list-decimal last:mb-0">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="mb-1">{children}</li>
  ),
  code: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => {
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
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="mb-3 last:mb-0">{children}</pre>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:text-primary/80"
    >
      {children}
    </a>
  ),
};

/**
 * Memoized chat message.
 * User messages: right-aligned bubble, no avatar.
 * Model messages: left-aligned plain text with profile avatar.
 */
const ChatMessage = memo(function ChatMessage({
  role,
  content,
}: ChatMessageProps) {
  const isUser = role === "user";

  if (isUser) {
    return (
      <div className="flex w-full justify-end">
        <div className="max-w-[80%] rounded-2xl bg-secondary px-4 py-3 text-sm leading-relaxed text-foreground md:max-w-[70%]">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full gap-3">
      {/* AI avatar — yani.png */}
      <div className="relative size-7 shrink-0 overflow-hidden rounded-full border border-border">
        <Image
          src="/yani.png"
          alt="Yani AI"
          fill
          className="object-cover"
          sizes="28px"
        />
      </div>

      <div className="min-w-0 flex-1 text-sm leading-relaxed text-foreground">
        <Markdown remarkPlugins={remarkPlugins} components={markdownComponents}>
          {content}
        </Markdown>
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

/** Skeleton shown while the model is generating its first token. */
function ChatMessageSkeleton() {
  return (
    <div className="flex w-full gap-3">
      <div className="relative size-7 shrink-0 overflow-hidden rounded-full border border-border">
        <Image
          src="/yani.png"
          alt="Yani AI"
          fill
          className="object-cover"
          sizes="28px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export { ChatMessage, ChatMessageSkeleton };
export type { ChatMessageProps };
