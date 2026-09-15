import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { RightCard } from "@/components/RightCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  categoryLabel,
  notIncluded,
  rights,
  type CategoryId,
} from "@/data/rights";
import { cn } from "@/lib/utils";

type CatFilter = CategoryId | "all";

const filters: { id: CatFilter; label: string }[] = [
  { id: "all", label: "הכול" },
  { id: "work", label: categoryLabel.work },
  { id: "leave", label: categoryLabel.leave },
  { id: "studies", label: categoryLabel.studies },
  { id: "benefits", label: categoryLabel.benefits },
  { id: "family", label: categoryLabel.family },
  { id: "ending", label: categoryLabel.ending },
];

export const Route = createFileRoute("/rights/")({
  validateSearch: (search: Record<string, unknown>): { cat?: CatFilter | undefined } => ({
    cat: (search["cat"] as CatFilter | undefined) ?? undefined,
  }),
  head: () => ({
    meta: [
      { title: "הזכויות שלי | STUDENT iN" },
      {
        name: "description",
        content:
          "רשימת הזכויות של סטודנטים ברמב\"ם: שעות, שכר, חופשה, מחלה, לימודים, הטבות ומשפחה - עם חיפוש וסינון.",
      },
      { property: "og:title", content: "הזכויות שלי | STUDENT iN" },
      {
        property: "og:description",
        content: "כל מה שחשוב לדעת, בלי לחפש בתוך נהלים.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RightsList,
});

function RightsList() {
  const { cat } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const active: CatFilter = cat ?? "all";
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim();
    return rights.filter((r) => {
      const inCat = active === "all" || r.category === active;
      if (!inCat) return false;
      if (!q) return true;
      return [r.question, r.shortAnswer, ...(r.keywords ?? [])]
        .join(" ")
        .includes(q);
    });
  }, [active, query]);

  return (
    <div className="animate-rise space-y-5">
      <header className="space-y-1">
        <h1 className="text-[24px] font-bold">הזכויות שלי</h1>
        <p className="text-[14px] text-muted-foreground">
          כל מה שחשוב לדעת, בלי לחפש בתוך נהלים.
        </p>
      </header>

      <div className="relative">
        <Search
          className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor="rights-search" className="sr-only">
          חיפוש בזכויות
        </label>
        <input
          id="rights-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חיפוש: חופשה, מבחן, מחלה, שכר..."
          className="card-base h-13 w-full py-3.5 ps-12 pe-4 text-[15px] outline-none focus-visible:border-brand/40"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="ניקוי חיפוש"
            className="press absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div
        role="tablist"
        aria-label="סינון לפי נושא"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={active === f.id}
            onClick={() =>
              navigate({
                search: f.id === "all" ? {} : { cat: f.id },
                replace: true,
              })
            }
            className={cn(
              "press press-active min-h-11 whitespace-nowrap rounded-full border px-4 text-[14px] font-medium",
              active === f.id
                ? "border-brand bg-brand text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {list.map((r) => (
          <RightCard key={r.id} right={r} />
        ))}
        {list.length === 0 && (
          <p className="card-base p-6 text-center text-[14px] text-muted-foreground">
            לא מצאנו זכות שמתאימה לחיפוש. אפשר לנסות מילה אחרת, למשל מבחן, מחלה
            או נסיעות.
          </p>
        )}
      </div>

      <Accordion type="single" collapsible className="card-base px-5">
        <AccordionItem value="not-included" className="border-none">
          <AccordionTrigger className="text-right text-[15px] font-semibold hover:no-underline">
            מה לא כלול במשרת סטודנט?
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 pb-2">
              {notIncluded.map((item) => (
                <li
                  key={item.title}
                  className="text-[14px] leading-relaxed text-foreground/85"
                >
                  <span className="font-semibold">{item.title}</span> - {item.text}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
