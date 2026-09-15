import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import logoAsset from "@/assets/student-in-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { getRight } from "@/data/rights";
import { askIn, type AskInReply } from "@/lib/ask-in.functions";
import { cn } from "@/lib/utils";

const TOOLTIP_KEY = "askin-tooltip-dismissed";

const suggestions = [
  "יש לי מבחן - מה מגיע לי?",
  "כמה שעות מותר לי לעבוד?",
  "אני חולה - מה עושים?",
  "יש לי מילואים",
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  rightId?: string | null;
  needsContact?: boolean;
  followUp?: { question: string; options: string[] } | null;
}

const uid = () => Math.random().toString(36).slice(2);

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-2" aria-label="iN מקליד">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="size-2 animate-bounce rounded-full bg-brand/50"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

function InMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full bg-pink-soft ring-1 ring-pink/20",
        className,
      )}
      aria-hidden="true"
    >
      <span className="font-display text-[13px] font-black lowercase text-pink">
        in
      </span>
    </span>
  );
}

export function AskIn() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const ask = useServerFn(askIn);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(TOOLTIP_KEY)) return;
    const timer = window.setTimeout(() => setShowTooltip(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TOOLTIP_KEY, "1");
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, pending]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("askin:open", onOpen);
    return () => window.removeEventListener("askin:open", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);


  const send = useCallback(
    async (text: string, history?: ChatMessage[]) => {
      const question = text.trim();
      if (!question || pending) return;
      const base = history ?? messages;
      const next = [...base, { id: uid(), role: "user" as const, content: question }];
      setMessages(next);
      setInput("");
      setFailed(null);
      setPending(true);
      try {
        const reply = (await ask({
          data: {
            messages: next.map((m) => ({ role: m.role, content: m.content })),
          },
        })) as AskInReply;
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: reply.followUp ? reply.followUp.question : reply.answer,
            rightId: reply.rightId,
            needsContact: reply.needsContact,
            followUp: reply.followUp,
          },
        ]);
      } catch {
        setFailed(question);
      } finally {
        setPending(false);
      }
    },
    [ask, messages, pending],
  );

  const reset = () => {
    setMessages([]);
    setInput("");
    setFailed(null);
  };

  const openChat = () => {
    setOpen(true);
    dismissTooltip();
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <div className="fixed bottom-[84px] right-4 z-50 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
          {showTooltip && (
            <button
              type="button"
              onClick={openChat}
              className="press animate-rise rounded-2xl border border-border bg-card px-3 py-2 text-[12px] font-medium text-foreground shadow-lg"
            >
              יש שאלה? אני כאן 💬
            </button>
          )}
          <button
            type="button"
            onClick={openChat}
            aria-label="שאלו את iN"
            className="press press-active flex items-center gap-2 rounded-full bg-pink px-4 py-3 text-primary-foreground shadow-xl shadow-pink/25 transition hover:brightness-105"
          >
            <MessageCircle className="size-5" strokeWidth={2} aria-hidden="true" />
            <span className="hidden text-[14px] font-semibold md:inline">
              שאלו את iN
            </span>
          </button>
        </div>
      )}

      {/* Panel */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] md:bg-foreground/10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-label="שאלו את iN"
            className="animate-rise fixed inset-0 z-50 flex flex-col bg-card md:inset-y-4 md:right-4 md:left-auto md:w-[400px] md:rounded-3xl md:border md:border-border md:shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-start gap-3 border-b border-border px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] md:pt-4">
              <InMark className="size-9" />
              <div className="min-w-0 flex-1">
                <img
                  src={logoAsset.url}
                  alt="STUDENT iN"
                  width={1920}
                  height={632}
                  className="mb-1 h-4 w-auto"
                />
                <p className="text-[15px] font-bold text-foreground">שאלו את iN</p>
                <p className="text-[12px] leading-snug text-muted-foreground">
                  עושה לכם סדר בזכויות ובכל מה שחשוב לדעת כסטודנטים ברמב&quot;ם.
                </p>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="שיחה חדשה"
                    className="press grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
                  >
                    <RotateCcw className="size-4" aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="סגירה"
                  className="press grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            </header>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="rounded-3xl bg-brand-soft/60 p-4">
                    <p className="text-[16px] font-bold text-foreground">
                      היי 👋
                    </p>
                    <p className="text-[15px] font-semibold text-foreground">
                      אני iN, כאן כדי לעזור לכם לעשות סדר.
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                      אפשר לשאול אותי על שעות עבודה, מבחנים, מחלה, חופשה,
                      מילואים, הטבות ועוד.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => void send(s)}
                        className="press rounded-full border border-border bg-secondary/60 px-3 py-2 text-[13px] font-medium text-foreground hover:bg-secondary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-3xl bg-brand-soft px-4 py-2.5 text-[14px] leading-relaxed text-foreground">
                      {m.content}
                    </p>
                  </div>
                ) : (
                  <div key={m.id} className="flex items-start gap-2">
                    <InMark />
                    <div className="max-w-[85%] space-y-2">
                      <div className="whitespace-pre-line rounded-3xl border border-border bg-background px-4 py-3 text-[14px] leading-relaxed text-foreground">
                        {m.content}
                      </div>
                      {m.followUp?.options?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {m.followUp.options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => void send(opt)}
                              className="press rounded-full bg-purple-soft px-3 py-1.5 text-[12px] font-semibold text-purple"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      ) : null}
                      <div className="flex flex-wrap gap-2">
                        {m.rightId && getRight(m.rightId) && (
                          <Link
                            to="/rights/$rightId"
                            params={{ rightId: m.rightId }}
                            onClick={() => setOpen(false)}
                            className="press inline-flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1.5 text-[12px] font-semibold text-brand"
                          >
                            {m.rightId === "salary"
                              ? "לחשב את השכר שלי"
                              : "לכל הפרטים"}
                            <ArrowLeft className="size-3.5" aria-hidden="true" />
                          </Link>
                        )}
                        {m.needsContact && (
                          <Link
                            to="/contact"
                            onClick={() => setOpen(false)}
                            className="press inline-flex items-center gap-1 rounded-full bg-pink-soft px-3 py-1.5 text-[12px] font-semibold text-pink"
                          >
                            למי פונים?
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              )}

              {pending && (
                <div className="flex items-start gap-2">
                  <InMark />
                  <TypingDots />
                </div>
              )}

              {failed && (
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-[14px] text-foreground">
                    משהו לא הסתדר כרגע. אפשר לנסות שוב בעוד רגע.
                  </p>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2 rounded-full"
                    onClick={() => {
                      const retry = failed;
                      setFailed(null);
                      void send(retry, messages.slice(0, -1));
                    }}
                  >
                    נסו שוב
                  </Button>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send(input);
                    }
                  }}
                  placeholder="מה רציתם לדעת?"
                  className="max-h-28 flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-brand/40"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || pending}
                  aria-label="שליחה"
                  className="press grid size-11 shrink-0 place-items-center rounded-full bg-pink text-primary-foreground disabled:opacity-40"
                >
                  <Send className="size-4 -scale-x-100" aria-hidden="true" />
                </button>
              </form>
              <p className="mt-2 text-center text-[11px] text-muted-foreground/80">
                לא מומלץ לשתף בצ&apos;אט מידע אישי או רפואי.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
