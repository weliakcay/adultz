"use client";

import { FormEvent, useState } from "react";
import { clsx } from "clsx";
import { useAnalytics } from "@/components/providers/use-analytics";
import { personaChatKB } from "@/data/persona-chat";

const defaultPrompts = [
  "Bakım rutini nedir?",
  "Teslimat nasıl işliyor?",
  "Garanti süresi?",
  "Hangi aksesuarlar uyumlu?",
  "Kişiselleştirme seçenekleri?",
];

type Message = {
  id: string;
  author: "user" | "assistant";
  text: string;
};

function synthesizeAnswer(personaId: string, question: string) {
  const kb = personaChatKB.find((item) => item.personaId === personaId);
  if (!kb) {
    return "Adult Z asistanı şu an yanıt veremiyor. Lütfen destek@adultz.com adresine yazın.";
  }

  const facts = kb.kb.slice(0, 3).join(" • ");
  return `${kb.system.split(".")[0]}. ${question} konusunda öne çıkan notlar: ${facts}. Daha fazla detay için destek ekibimiz 7/24 gizli chat üzerinden yanıt verir.`;
}

export function PersonaChat({
  personaId,
  personaName,
}: {
  personaId: string;
  personaName: string;
}) {
  const { track } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const addMessage = (author: "user" | "assistant", text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        author,
        text,
      },
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    addMessage("user", input.trim());
    track("persona_chat_send", { personaId, origin: "input" });
    const answer = synthesizeAnswer(personaId, input.trim());
    addMessage("assistant", answer);
    setInput("");
  };

  const handlePrompt = (prompt: string) => {
    addMessage("user", prompt);
    track("persona_chat_send", { personaId, origin: "prompt", prompt });
    const answer = synthesizeAnswer(personaId, prompt);
    addMessage("assistant", answer);
  };

  const toggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        track("persona_chat_open", { personaId });
      }
      return next;
    });
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-40 w-full max-w-sm"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={toggle}
        className="neon-ring flex w-full items-center justify-between rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(12,12,20,0.8)] px-5 py-3 text-sm uppercase tracking-[0.28em] text-muted shadow-lg transition hover:text-foreground"
        aria-expanded={isOpen}
        aria-controls="persona-chat-panel"
      >
        Benimle Sohbet Et
        <span aria-hidden className="ml-2 text-xs">
          {isOpen ? "–" : "+"}
        </span>
      </button>
      {isOpen ? (
        <div
          id="persona-chat-panel"
          className="mt-3 rounded-[24px] border border-[rgba(157,78,221,0.25)] bg-[rgba(7,7,12,0.94)] p-5 shadow-[0_35px_70px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-muted">Adult Z Asistan</p>
              <h3 className="mt-2 font-display text-xl uppercase tracking-[0.3em] text-foreground">
                {personaName}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-[rgba(255,255,255,0.2)] px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted"
            >
              Kapat
            </button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Gizlilik politikamız gereği sohbet kayıtları 24 saat sonra anonimleştirilir. Açık içerik paylaşmayız.
          </p>
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {defaultPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handlePrompt(prompt)}
                className="rounded-full border border-[rgba(255,255,255,0.1)] px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-muted hover:text-foreground"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="mt-4 max-h-[220px] space-y-3 overflow-y-auto pr-2">
            {messages.length === 0 ? (
              <div className="rounded-[18px] border border-dashed border-[rgba(157,78,221,0.2)] p-4 text-xs text-muted">
                Sorularınızı buraya yazın veya hazır sorulardan seçin. Adult Z danışmanları bakım, teslimat ve KVKK süreçlerinde yanınızdadır.
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={clsx(
                    "rounded-[18px] p-3 text-sm",
                    message.author === "user"
                      ? "bg-[rgba(255,0,84,0.12)] text-foreground"
                      : "bg-[rgba(157,78,221,0.12)] text-muted",
                  )}
                >
                  {message.text}
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <label htmlFor="persona-chat-input" className="text-xs uppercase tracking-[0.3em] text-muted">
              Sorunuzu Yazın
            </label>
            <textarea
              id="persona-chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={3}
              className="w-full resize-none rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(12,12,20,0.8)] p-3 text-sm text-foreground"
            />
            <button
              type="submit"
              className="w-full rounded-full border border-[rgba(0,180,216,0.6)] bg-[rgba(0,180,216,0.18)] px-4 py-3 text-xs uppercase tracking-[0.3em] text-foreground"
            >
              Gönder
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
