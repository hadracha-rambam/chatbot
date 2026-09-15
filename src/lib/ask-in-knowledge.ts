import {
  categoryLabel,
  getRight,
  rights,
  type RightItem,
} from "@/data/rights";
import { salaryKnowledge } from "@/lib/salary";

/**
 * Retrieval layer for "שאלו את iN".
 * The chat has NO knowledge of its own - it only retrieves from src/data/rights.ts,
 * the single source of truth shared with the rights pages, search, categories
 * and quick actions.
 */

/** Natural Hebrew phrasing / synonyms -> canonical right ids. */
const synonyms: { terms: string[]; rightIds: string[] }[] = [
  { terms: ["מבחן", "בחינה", "מבחנים", "בחינות", "תקופת מבחנים", "מועד ב"], rightIds: ["exam-day"] },
  { terms: ["חולה", "מחלה", "אישור מחלה", "לא מרגיש טוב", "לא מרגישה טוב", "חום", "מרגיש רע"], rightIds: ["sick-leave"] },
  { terms: ["עוד עבודה", "עבודה נוספת", "עבודה שנייה", "עובד גם", "עובדת גם", "מקום אחר", "אישור לעבודה פרטית"], rightIds: ["extra-job"] },
  { terms: ["מילואים", "צו 8", "צו שמונה", "שירות מילואים"], rightIds: ["reserve-duty"] },
  { terms: ["כמה שעות", "120", "שעות בחודש", "מכסה", "מכסת שעות"], rightIds: ["monthly-hours", "hours-quota"] },
  { terms: ["8 שעות", "שמונה שעות", "שעות נוספות", "יום עבודה"], rightIds: ["daily-hours"] },
  { terms: ["תואר", "סיימתי ללמוד", "סיום לימודים", "סיימתי תואר", "מסיים לימודים"], rightIds: ["finished-degree", "who-is-student"] },
  { terms: ["אישור לימודים", "אישור סטודנט", "שנת לימודים"], rightIds: ["study-confirmation"] },
  { terms: ["חופש", "חופשה", "ימי חופשה", "לצאת לחופשה"], rightIds: ["vacation"] },
  {
    terms: [
      "שכר",
      "כמה מקבלים",
      "כמה אני מקבל",
      "כמה אני מקבלת",
      "תלוש",
      "שעתי",
      "שכר לשעה",
      "שכר מינימום",
      "משכורת",
      "ותק",
      "מחשבון",
      "מחשבון שכר",
      "תוספת",
      "תואר שני",
      "שירות חובה",
      "שירות לאומי",
      "כמה אני מרוויח",
      "כמה אני מרוויחה",
    ],
    rightIds: ["salary"],
  },
  { terms: ["נסיעות", "אוטובוס", "רכבת", "החזר נסיעות"], rightIds: ["travel"] },
  { terms: ["פנסיה", "הפרשות"], rightIds: ["pension"] },
  { terms: ["הריון", "בהריון"], rightIds: ["pregnancy"] },
  { terms: ["הורות", "שעת הורות", "לידה", "הורה"], rightIds: ["parental-rights", "parenting-hour"] },
  { terms: ["חג", "חגים", "שי לחג", "ימי בחירה"], rightIds: ["holidays", "holiday-gift", "choice-days"] },
];

const STOP = new Set([
  "מה","זה","לי","אני","האם","יש","של","על","עם","את","גם","כמה","איך","אפשר","צריך","מגיע","עושים","עוד","כי","אם","אבל","הזה","היום","לא","כן","ו","ל","ב","מ",
]);

function normalize(text: string) {
  return text.replace(/["'׳״.,!?()]/g, " ").replace(/\s+/g, " ").trim();
}

export function findRelevantRights(query: string, limit = 4): RightItem[] {
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(" ").filter((t) => t.length > 1 && !STOP.has(t));

  const scores = new Map<string, number>();
  const bump = (id: string, by: number) =>
    scores.set(id, (scores.get(id) ?? 0) + by);

  for (const group of synonyms) {
    for (const term of group.terms) {
      if (q.includes(term)) {
        for (const id of group.rightIds) bump(id, 12);
      }
    }
  }

  for (const right of rights) {
    const haystack = normalize(
      [
        right.question,
        right.shortAnswer,
        right.secondary ?? "",
        right.highlight ?? "",
        ...(right.keywords ?? []),
        ...(right.chips ?? []),
        categoryLabel[right.category],
      ].join(" "),
    );
    for (const token of tokens) {
      if ((right.keywords ?? []).some((k) => normalize(k).includes(token))) {
        bump(right.id, 6);
      } else if (haystack.includes(token)) {
        bump(right.id, 2);
      }
    }
  }

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => getRight(id))
    .filter((r): r is RightItem => Boolean(r));
}

/** Compact, UI-safe context for the model. No version/year metadata is included. */
export function buildRightContext(right: RightItem): string {
  const lines: string[] = [
    `id: ${right.id}`,
    `נושא: ${categoryLabel[right.category]}`,
    `שאלה: ${right.question}`,
    `תשובה קצרה: ${right.shortAnswer}`,
  ];
  if (right.keyNumber)
    lines.push(`נתון מרכזי: ${right.keyNumber} ${right.keyNumberLabel ?? ""}`);
  if (right.highlight) lines.push(`חשוב: ${right.highlight}`);
  if (right.secondary) lines.push(`תנאי נוסף: ${right.secondary}`);
  if (right.eligibility?.length)
    lines.push(`זכאות: ${right.eligibility.join(" | ")}`);
  if (right.steps?.length) lines.push(`מה עושים: ${right.steps.join(" | ")}`);
  if (right.importantNote) lines.push(`לתשומת לב: ${right.importantNote}`);
  if (right.more?.length) lines.push(`פרטים: ${right.more.join(" | ")}`);
  if (right.rambamProcess?.includes("יעודכנו"))
    lines.push("תהליך הדיווח ברמב\"ם: לא קיים במידע - אין להמציא תהליך.");
  else if (right.rambamProcess)
    lines.push(`תהליך ברמב"ם: ${right.rambamProcess}`);
  return lines.join("\n");
}

export function buildKnowledgeContext(items: RightItem[]): string {
  if (!items.length) return "לא נמצאו פריטי מידע רלוונטיים.";
  return items.map((r) => buildRightContext(r)).join("\n---\n");
}

export const globalRules = [
  "כיום ניתן לעבוד עד 120 שעות בחודש קלנדרי.",
  "ניתן לדווח עד 8 שעות עבודה מזכות בתשלום ביום.",
  "אין זכאות לתשלום שעות נוספות במשרת סטודנט - אין להציע או לחשב שעות נוספות.",
  salaryKnowledge,
].join("\n");
