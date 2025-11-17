import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ChatBotSelector } from "@/components/modules/chat-bot-selector";

export const metadata: Metadata = buildMetadata({
  title: "Sohbet Botu - AI Persona Deneyimi",
  description:
    "Adult X AI sohbet botları ile kişiselleştirilmiş deneyim. Her manken için özel tasarlanmış persona ve sohbet özellikleri.",
  path: "/bebekler/ozellestir",
});

export default function ChatBotPage() {
  return <ChatBotSelector />;
}
