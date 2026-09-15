import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  buildKnowledgeContext,
  findRelevantRights,
  globalRules,
} from "@/lib/ask-in-knowledge";

/**
 * "שאלו את iN" server function.
 *
 * Architecture: question -> retrieve relevant rights from src/data/rights.ts
 * -> send ONLY that context to the model -> return answer + canonical right id.
 *
 * The real AI service is connected here (Lovable AI Gateway). If it is not
 * available, `demoAnswerFromKnowledge` returns the retrieved right's own text -
 * never invented content.
 */

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

export interface AskInReply {
  answer: string;
  rightId: string | null;
  followUp: { question: string; options: string[] } | null;
  needsContact: boolean;
}

const SYSTEM_PROMPT = `You are iN, the STUDENT iN assistant for students employed at Rambam Health Care Campus.
Answer ONLY using the STUDENT iN knowledge provided in the user turn ("מידע זמין").
Respond in natural, simple Hebrew. Be concise, friendly, calm and practical: 2-5 short sentences.
Structure: direct answer first, then one important condition, then what to do next.
Use at most one relevant emoji. No legal citations, no section numbers, no legal advice, no bureaucratic tone.
Never invent rights, amounts, percentages, conditions, forms, systems, websites, phone numbers, emails or Rambam procedures.
If the knowledge does not contain a definite answer, reply exactly: "לא מצאתי במידע שיש לי תשובה ודאית לשאלה הזו. במקרה כזה כדאי לבדוק מול משאבי אנוש." and set needsContact=true.
If the entitlement exists but the Rambam process is missing, say you can help with the entitlement but the reporting process at Rambam is not updated yet, and set needsContact=true.
Never mention policy versions, years or internal sources.
Set rightId to the id of the single most relevant knowledge item when one exists, otherwise null.
Default to answering immediately. Ask a follow-up question ONLY if the knowledge item states different outcomes for different situations AND the student has not already given that detail in the conversation (e.g. seniority when the entitlement depends on months worked). Never ask about things that do not change the entitlement (timing, preferences, what they want to know). When you do ask, put one short question in followUp.question with 2-4 short options and keep answer empty. If in doubt, answer instead of asking.
Keep answers free of general world knowledge - you are a navigation layer over the app content.`;

const jsonSchema = {
  name: "ask_in_reply",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      answer: { type: "string" },
      rightId: { type: ["string", "null"] },
      needsContact: { type: "boolean" },
      followUp: {
        type: ["object", "null"],
        additionalProperties: false,
        properties: {
          question: { type: "string" },
          options: { type: "array", items: { type: "string" } },
        },
        required: ["question", "options"],
      },
    },
    required: ["answer", "rightId", "needsContact", "followUp"],
  },
} as const;

const NO_ANSWER =
  "לא מצאתי במידע שיש לי תשובה ודאית לשאלה הזו. במקרה כזה כדאי לבדוק מול משאבי אנוש.";

/** Fallback used only when the AI service is unavailable. Uses stored text only. */
function demoAnswerFromKnowledge(question: string): AskInReply {
  const matches = findRelevantRights(question, 1);
  const right = matches[0];
  if (!right) {
    return { answer: NO_ANSWER, rightId: null, followUp: null, needsContact: true };
  }
  const parts = [right.shortAnswer];
  if (right.highlight) parts.push(right.highlight);
  else if (right.secondary) parts.push(right.secondary);
  if (right.steps?.[0]) parts.push(right.steps[0]);
  return {
    answer: parts.join("\n\n"),
    rightId: right.id,
    followUp: null,
    needsContact: false,
  };
}

export const askIn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<AskInReply> => {
    const lastUser = [...data.messages].reverse().find((m) => m.role === "user");
    const question = lastUser?.content ?? "";

    // Retrieval across the recent conversation so follow-ups keep context.
    const recent = data.messages
      .slice(-6)
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join(" ");
    const retrieved = findRelevantRights(`${question} ${recent}`, 4);

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return demoAnswerFromKnowledge(question);

    const knowledge = `כללים כלליים:\n${globalRules}\n\nמידע זמין:\n${buildKnowledgeContext(retrieved)}`;

    try {
      const res = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": apiKey,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...data.messages.slice(0, -1),
              { role: "user", content: `${knowledge}\n\nהשאלה: ${question}` },
            ],
            response_format: { type: "json_schema", json_schema: jsonSchema },
          }),
        },
      );

      if (!res.ok) {
        if (res.status === 401 || res.status === 402 || res.status === 403) {
          return demoAnswerFromKnowledge(question);
        }
        throw new Error(`gateway_${res.status}`);
      }

      const payload = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const raw = payload.choices?.[0]?.message?.content;
      if (!raw) throw new Error("empty_response");

      const parsed = JSON.parse(raw) as Partial<AskInReply>;
      const rightId =
        parsed.rightId && retrieved.some((r) => r.id === parsed.rightId)
          ? parsed.rightId
          : null;
      const followUp =
        parsed.followUp && parsed.followUp.question
          ? {
              question: parsed.followUp.question,
              options: (parsed.followUp.options ?? []).slice(0, 4),
            }
          : null;

      return {
        answer: (parsed.answer ?? "").trim() || (followUp ? "" : NO_ANSWER),
        rightId,
        followUp,
        needsContact: Boolean(parsed.needsContact) || (!rightId && !followUp),
      };
    } catch {
      throw new Error("ask_in_failed");
    }
  });
