import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/shared/page-layout";
import { ChatViewer } from "@/components/chats/chat-viewer";
import { chats, getChatBySlug } from "@/lib/data/chats";

interface ChatPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-generate all chat slugs at build time. */
export function generateStaticParams() {
  return chats.map((chat) => ({ slug: chat.slug }));
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chat = getChatBySlug(slug);

  if (!chat) {
    return { title: "Chat Not Found | Yanicells" };
  }

  return {
    title: `${chat.title} | Yanicells`,
    description: `Read the conversation: ${chat.title}`,
  };
}

export default async function ChatDetailPage({ params }: ChatPageProps) {
  const { slug } = await params;
  const chat = getChatBySlug(slug);

  if (!chat) {
    notFound();
  }

  return (
    <PageLayout fullWidth>
      <ChatViewer messages={chat.messages} />
    </PageLayout>
  );
}
