import { RIGHTS } from '../data/rights';
import { FAQS } from '../data/faqs';
import { CATEGORY_BY_ID } from '../data/categories';
import type { FaqItem, RightItem } from '../data/types';

/** ניקוי טקסט עברי: גרשיים, ניקוד, מקפים ורווחים כפולים. */
export function normalize(value: string): string {
  return value
    .replace(/[֑-ׇ]/g, '')
    .replace(/["'`׳״‘’“”]/g, '')
    .replace(/[-–—_/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** הסרת אותיות שימוש בתחילת מילה, כדי ש"למבחן" ימצא גם "מבחן". */
function stripPrefix(token: string): string {
  if (token.length < 4) return token;
  if (/^[והבלכמש]/.test(token)) return token.slice(1);
  return token;
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(' ')
    .filter((token) => token.length > 1);
}

interface SearchEntry {
  id: string;
  kind: 'right' | 'faq';
  haystackStrong: string;
  haystackWeak: string;
  right?: RightItem;
  faq?: FaqItem;
}

const INDEX: SearchEntry[] = [
  ...RIGHTS.map<SearchEntry>((right) => ({
    id: right.id,
    kind: 'right',
    right,
    haystackStrong: normalize(
      [right.question, ...right.keywords, right.section ?? ''].join(' | '),
    ),
    haystackWeak: normalize(
      [
        right.shortAnswer,
        right.secondary ?? '',
        right.importantNote ?? '',
        right.highlight ?? '',
        right.keyNumberLabel ?? '',
        ...(right.chips ?? []),
        ...(right.eligibility ?? []),
        CATEGORY_BY_ID[right.category].title,
      ].join(' | '),
    ),
  })),
  ...FAQS.map<SearchEntry>((faq) => ({
    id: faq.id,
    kind: 'faq',
    faq,
    haystackStrong: normalize([faq.question, ...faq.keywords].join(' | ')),
    haystackWeak: normalize(faq.answer),
  })),
];

export interface SearchResult {
  kind: 'right' | 'faq';
  score: number;
  right?: RightItem;
  faq?: FaqItem;
}

export function search(query: string, limit = 24): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const normalizedQuery = normalize(query);

  const scored = INDEX.map((entry) => {
    let score = 0;

    if (entry.haystackStrong.includes(normalizedQuery)) score += 40;
    if (entry.haystackWeak.includes(normalizedQuery)) score += 12;

    for (const rawToken of tokens) {
      const token = stripPrefix(rawToken);
      if (entry.haystackStrong.includes(rawToken)) score += 24;
      else if (entry.haystackStrong.includes(token)) score += 18;
      else if (entry.haystackWeak.includes(rawToken)) score += 8;
      else if (entry.haystackWeak.includes(token)) score += 6;
    }

    // זכויות מלאות מקבלות עדיפות קלה על פני שאלות נפוצות.
    if (score > 0 && entry.kind === 'right') score += 3;

    return { entry, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ entry, score }) => ({
    kind: entry.kind,
    score,
    right: entry.right,
    faq: entry.faq,
  }));
}

/** חיפוש בתוך מסך "הזכויות שלי" - מחזיר זכויות בלבד. */
export function searchRights(query: string): RightItem[] {
  if (!query.trim()) return RIGHTS;
  return search(query, 100)
    .filter((result): result is SearchResult & { right: RightItem } => Boolean(result.right))
    .map((result) => result.right);
}
